import { IUser } from "src/types/interfaces/user";
import { HttpException, HttpStatus } from "@nestjs/common";


export class userAlreadyExists extends HttpException {
    constructor(
        username: IUser['username'],
        authProvider: IUser['authProvider']
    ) {
        super(
            {
                statusCode: HttpStatus.CONFLICT,
                message: "This user already exists in current authorizarion provider",
                error: 'Conflict',
                errorData: {
                    user: {
                        username,
                        authProvider
                    }
                }
            },
            HttpStatus.CONFLICT
        )
    }
}
