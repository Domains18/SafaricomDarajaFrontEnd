import { AuthProvider } from '../enums/authProvider';


export interface IUser {
    readonly _id: string;
    readonly username;
    readonly password?: string;
    readonly authProvider: AuthProvider;
    readonly createdAt?: Date;
}
