import { UnauthorizedException, Injectable } from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {Strategy} from 'passport-local'
import { UserData } from 'src/data'
import { AuthService } from '../auth.service'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    ){
        super()
    }

    async validate(username: string , password: string): Promise<unknown>{
        const user = await this.authService.find({username, password})

        if(!user){
            throw new UnauthorizedException('Wrong name or password')
        }else {
            return user;
        }
    }
}