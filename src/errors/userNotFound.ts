import { IUser } from "src/types/interfaces/user";
import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundError extends HttpException{
    constructor(user: Partial<IUser>) {
        super(
            {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Invalid Request, User Not Found",
                errorData: {
                    user: {
                        id: user._id,
                        username: user.username,
                        authProvider: user.authProvider
                    }
                }
            },
            HttpStatus.NOT_FOUND
        )
    }
}
