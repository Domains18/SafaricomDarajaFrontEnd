import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response} from "express";
import { RegisterUserRequestDto } from "src/types/dto/user/authUserDto";



@Injectable()
export class AuthValidationMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction): unknown{
        const user: RegisterUserRequestDto = req.body;
        if (!user.username) {
            return res.status(HttpStatus.BAD_REQUEST).send({
                statusCode: '400',
                message: 'The username field must be provided',
                error: 'Bad Request'
            });
        }
        if (!user.password) {
            return res.status(HttpStatus.BAD_REQUEST).send({
                statusCode: '400',
                message: "The password field must be provided"
            });
        }
        next();
    }
}
