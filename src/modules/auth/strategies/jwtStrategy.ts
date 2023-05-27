import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from '../../user/user.service'
import { UserJwtPayload } from "src/types/interfaces/userjwtpayload";
import { Strategy } from 'passport-jwt'
import { IUser } from "src/types/interfaces/user";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: (req: Request) => {
                return req.cookies?.auth_token;
            },
            secretOrKey: configService.get('JWT_SECRET') || 'super-secret-key'
        });
    }
    async validate(payload: UserJwtPayload): Promise<IUser> {
        const targetUser = await this.userService.find(payload);
        if (!targetUser) {
            throw new UnauthorizedException();
        }
        return targetUser
    }
}
