import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../user/entities/user.entity";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private configService : ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false ,
            secretOrKey : configService.get("JWT_KEY")
        });
    }

    async validate(payload : any) {
        return {
            userId : payload.userId,
            first_name : payload.first_name,
            last_name  : payload.last_name,
            email : payload.email,
            // role : payload.role,
        }
    }
}