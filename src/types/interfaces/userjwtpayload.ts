import { IUser } from "./user";
import { JwtPayload } from "jsonwebtoken"


export interface UserJwtPayload extends JwtPayload{
    readonly id: IUser['_id'];
    readonly username: IUser['username'];
    readonly authProvider: IUser['authProvider']
}
