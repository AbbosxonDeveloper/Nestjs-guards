import { Controller, Post, UseGuards, Body, Get, Req } from "@nestjs/common";
import { LocalGuard } from "./guards/local.guard";
import { AuthService } from "./auth.service";
import { Users } from "@prisma/client";
import { LoginRegister } from "./dto";
import { JwtGuard } from "./guards/jwt.guard";
import { CustomRequest } from "./types";


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}
    
    @UseGuards(LocalGuard)
    @Post('/login')
    login(@Body() body:LoginRegister): Promise<string>{
        return this.authService.findUserAndSign(body)
    }

    @Post('/register')
    async register(@Body() body: LoginRegister): Promise<any>{
        const createUser = await this.authService.create(body)
        
        return this.authService.sign(createUser.id)
    }

    @UseGuards(JwtGuard)
    @Get('/test')
    get(@Req() req: CustomRequest){   
        return "Ok"
    }
}
