import { Controller, Get, Req, Res, UseGuards, Request, Response } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { OauthUser } from "./dto/oauth_user.dto";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<void>{
        // Redirect google login page
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(
        @Req() req: Request,
        @Res() res: Response
    ):Promise<void>{
        const { user } = req as Request & {user:OauthUser};
        const {accessToken, refreshToken} = await this.authService.oauthProcess(user);
    }

    @Get('naver')
    @UseGuards(AuthGuard('naver'))
    async naverAuth(): Promise<void>{
        // Redirect to naver login page
    }

    @Get('naver/redirect')
    @UseGuards(AuthGuard('naver'))
    async naverAuthCallback(
        @Req() req: Request,
        @Res() res: Response
    ):Promise<void>{
        const { user } = req as Request & {user:OauthUser};
        this.authService.oauthProcess(user);
    }
}