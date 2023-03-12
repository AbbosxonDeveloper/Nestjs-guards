import {Module} from '@nestjs/common'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: '1a2b3c4d'
        })
    ],
    controllers: [AuthController],
    providers: [PrismaService,LocalStrategy , JwtStrategy,  AuthService, JwtService]
})
export class AuthModule{} 