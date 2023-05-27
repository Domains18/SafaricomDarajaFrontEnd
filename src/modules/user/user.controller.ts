import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '../../guards/jwtAuth.guard'
import { AuthorizedRequest } from "src/types/authorizedRequests";
import { USerInfoDto } from "src/types/dto/user/getUserDto";
import { userService } from './user.service'


@Controller('user')
export class userController{
    constructor(private readonly USerService: userService) { }
    @Get()
    @UseGuards(JwtAuthGuard)
    async get(@Req() req: AuthorizedRequest): Promise<USerInfoDto>{
        return await this.USerService.findOmitPassword(req.user)
    }
}
