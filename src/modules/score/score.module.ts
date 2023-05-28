import { Module } from "@nestjs/common";
import { ScoreService } from "./score.service";
import { ScoreController } from "./score.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from '../../models/user.schema';
import { Score, scoreSchema } from "src/models/score.schema";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from '../user/user.service';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Score.name, schema: scoreSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema:  UserSchema}])
    ],
    providers: [ScoreService, JwtService, ConfigService, UserService],
    controllers: [ ScoreController],
})

export class  scoreModule{}
