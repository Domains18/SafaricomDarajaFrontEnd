import { ConflictException, Injectable } from "@nestjs/common";
import { Model } from 'mongoose'
import { Score } from "src/models/score.schema";
import { createScoreRequestsDto, createScoreResponseDto } from "src/types/dto/scores/createScoreDto";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "src/types/interfaces/user";
import { IScore } from "src/types/interfaces/score";
import { SortFilter } from "src/types/enums/sortFilters";
import { User } from "src/models/user.schema";
import { CollectionResponse } from "src/types/interfaces/collectionResponse";



@Injectable()
export class ScoreService {
    constructor(
        @InjectModel(Score.name) private readonly scoreModel: Model<Score>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }
    async findAllByUser(
        user: IUser,
        sorter: SortFilter = SortFilter.DESCENDING,
        page = 1,
        limit = 100,
    ): Promise<CollectionResponse<IScore>> {
        const result = await this.scoreModel
            .find({ user: user._id })
            .sort({ score: sorter })
            .skip(limit * (page - 1))
            .limit(limit)
            .exec();

        return {
            totalCount: await this.scoreModel.find({ user: user._id }).count(),
            collection: result
        }
    }
    async create(score: createScoreRequestsDto): Promise<createScoreResponseDto> {
        try {
            const newScore = await this.userModel.create(score);
            await newScore.save();
            return await newScore.populate({
                path: 'user',
                select: '-password -createdAt'
            });
        } catch (error) {
            throw new ConflictException(
                `Score '${score}'  already exists`
            );
        }
    }


}
