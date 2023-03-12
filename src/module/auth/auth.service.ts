import {Injectable, NotFoundException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { Users } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'



@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ){};

    sign(id: number){
        return this.jwtService.sign("" + id, {secret: "1a2b3c4d"})
    }

    async create(payload: any): Promise<any>{
        const createUser = await this.prisma.users.create({data: payload})
        return createUser
    }

    async find(payload: any): Promise<any>{
        return await this.prisma.users.findFirst({where: payload})
    }

    async findUserAndSign(payload: any): Promise<any>{
        const check = await this.prisma.users.findFirst({where: payload})
        
        if(!check){
            throw new NotFoundException()
        }

        return this.sign(check.id)
    }
}

