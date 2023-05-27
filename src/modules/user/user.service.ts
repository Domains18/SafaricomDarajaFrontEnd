import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from '../../models/user.schema'
import { Model } from 'mongoose'
import { IUser } from "src/types/interfaces/user";
import { UserNotFoundError } from "src/errors/userNotFound";
import { userAlreadyExists } from "src/errors/userAlreadyExists";
import { AuthProvider } from "src/types/enums/authProvider";
import { createUserRequestsDto } from "src/types/dto/user/createUserDto";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }
    async find(filter: object): Promise<IUser> {
        const result = await this.userModel.findOne(filter).exec();

        if (!result) {
            throw new UserNotFoundError(filter);
        }
        return result;
    }
    async findOmitPassword(filter: object): Promise<Omit<IUser, 'password'>> {
        const result = await this.userModel.findOne(filter).select('-password').exec()
        if (!result) {
            throw new UserNotFoundError(filter)
        }
        return result;
    }
    async findByUserNameAndAuthProvider(
        username: IUser['username'],
        authProvider: IUser['authProvider'],
    ): Promise<IUser> {
        const result = await this.userModel
            .findOne({ username, authProvider })
            .exec();
        
        if (!result) {
            throw new UserNotFoundError({
                username,
                authProvider
            });
        }
        return result
    }
    async create(user: createUserRequestsDto): Promise<IUser>{
        await this.validateUser(user);
        const createdUser = new this.userModel(user);
        return createdUser.save()
    }
    private async validateUser(
        user: createUserRequestsDto,
        skipDuplicateCheck = false,
    ): Promise<void>{
        let duplicate = false;
        if (user.username.trim().length < 3) {
            throw new BadRequestException(
                "The username must be more than 3 characters"
            );
        }
        if (!(user.authProvider === AuthProvider.LOCAL)) {
            throw new BadRequestException("Invalid auth provider")
        }
        if (!(skipDuplicateCheck)) {
            const existUser = await this.userModel
                .findOne({
                    username: user.username,
                    authProvider: user.authProvider
                }).exec();
            duplicate = !!existUser;
        }
        if (duplicate) {
            throw new userAlreadyExists(user.username, user.authProvider);
        }
    }
}

