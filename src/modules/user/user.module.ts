import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/models/user.schema";
import { userController } from "./user.controller";
import { ConfigService } from "@nestjs/config";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [UserService, ConfigService],
    controllers: [userController],
})


export class userModule {}
