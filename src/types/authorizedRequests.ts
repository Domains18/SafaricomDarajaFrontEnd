import { Request } from "express";
import { IUser } from './interfaces/user'


export type AuthorizedRequest = Request & {
    user: IUser
}
