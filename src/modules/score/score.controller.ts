import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res, UseGuards, Header } from "@nestjs/common";
import { ScoreService } from "./score.service";
import { createScoreRequestsDto, createScoreResponseDto } from "src/types/dto/scores/createScoreDto";
import { JwtAuthGuard } from "src/guards/jwtAuth.guard";
import { AuthorizedRequest } from "src/types/authorizedRequests";
import { Response as ExpressResponse } from 'express';
import { collectionRequestsDto } from "src/types/dto/collectionDto";


@Controller('score')
export class ScoreController{
    constructor(private readonly scoreservice: ScoreService) { }
    @Get()
    @Header('Access-Control-Expose-Headers', 'x-Total-Count')
    @UseGuards(JwtAuthGuard)
    async get(
        @Req() req: AuthorizedRequest,
        @Query() query: collectionRequestsDto,
        @Res() res: ExpressResponse
    ): Promise<void>{
        const result = await this.scoreservice.findAllByUser(
            req.user,
            query.sortBy,
            query.page,
            query.limit
        );
        
        res.header('X-Total-Count', result.totalCount.toString());
        res.status(HttpStatus.OK).send([...result.collection])
    }
    async create(
        @Req() req: AuthorizedRequest,
        @Body() score: Omit<createScoreRequestsDto, 'user'>,
    ): Promise<createScoreResponseDto>{
        return await this.scoreservice.create({
            ...score,
            user: req.user,
        })
    }
}
