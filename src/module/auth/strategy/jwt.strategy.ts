import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { CustomRequest } from '../types'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '1a2b3c4d',
            passReqToCallback: true,
            pass: true
        })
    }

    validate(req: CustomRequest, payload: any) {
        console.log(payload);
        
        req.userId = payload

        return payload
    }
}