import { IUser } from "src/types/interfaces/user";


export type LoginUserRequestsDto = Pick<IUser, 'username' | 'password'>;
export type RegisterUserRequestDto = LoginUserRequestsDto;

export type LoginUserResponseDto = {
    accessToken: string;
} & Pick<IUser, '_id' | 'username' | 'password' | 'authProvider'>;

export type RegisterUserResponseDto = LoginUserResponseDto;
