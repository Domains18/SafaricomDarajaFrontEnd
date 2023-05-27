import { PassportStrategy } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IUser } from "src/types/interfaces/user";
import { ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtStrategy } from "src/modules/auth/strategies/jwtStrategy";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { UserJwtPayload } from "src/types/interfaces/userjwtpayload";
import * as process from 'process'

interface AuthenticatedRequest extends Request{
    user: IUser
}


@Injectable()
export class JwtAuthGuard extends PassportStrategy(JwtStrategy) {
    UseGuards: string[] = ['jwt']
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean | Promise<boolean> | Observable<boolean>>{
        try {
            await this.authenticate(context.switchToHttp().getRequest());
            return true;
        } catch (e: unknown) {
            throw new UnauthorizedException();
        }
    }
    async authenticate(req: AuthenticatedRequest): Promise<void>{
        const token = req.cookies?.auth_token;
        if (!token) {
            throw new Error('invalid token')
        }

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET || 'super-secret-key',
        ) as UserJwtPayload
        
        req.user = await this.validate(payload)
    }
}
