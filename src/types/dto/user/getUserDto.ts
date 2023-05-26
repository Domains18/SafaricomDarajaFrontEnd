import { IUser } from "src/types/interfaces/user";


export type USerInfoDto = Pick<IUser, "_id" | 'username' | 'authProvider' | 'createdAt'>;
