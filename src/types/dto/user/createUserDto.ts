import { IUser } from "src/types/interfaces/user";


export type createUserRequestsDto = Pick<IUser, 'username' | 'password' | 'authProvider'>;
