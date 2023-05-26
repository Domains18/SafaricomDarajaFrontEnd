import { IScore } from "src/types/interfaces/score";
import { IUser } from "src/types/interfaces/user";


export type createScoreRequestsDton = Omit<IDBObjectStore, 'user'> & {
    user: IUser;
}
export type createScoreResponseDto = Omit<IScore, 'user'> & {
    user: Pick<IUser, '_id' | 'username' | 'authProvider'>;

};

