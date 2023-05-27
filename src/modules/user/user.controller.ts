import { Controller, Get, Req,  UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwtAuth.guard";
import { AuthorizedRequest } from "src/types/authorizedRequests";
import { USerInfoDto } from "src/types/dto/user/getUserDto";
import { UserService } from './user.service';


@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService) { }
    @Get()
    @UseGuards(JwtAuthGuard)
    async get(@Req() req: AuthorizedRequest): Promise<USerInfoDto>{
        return await this.userService.findOmitPassword(req.user);
    }
}
