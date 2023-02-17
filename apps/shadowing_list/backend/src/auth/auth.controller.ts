import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
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
    ){
        const { user } = req as Request & {user:OauthUser};
        const {accessToken, refreshToken} = await this.authService.oauthProcess(user);

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);

        res.redirect(process.env.DOMAIN); 
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
    ){
        const { user } = req as Request & {user:OauthUser};
        return await this.authService.oauthProcess(user);
    }

    @Get('/refresh')
    @UseGuards(AuthGuard('refresh-jwt'))
    async refreshTokens(@Req() req: Request){
        const id = req.user['sub'];
        const refreshToken = req.user['refreshToken'];

        return this.authService.refreshTokens(id, refreshToken);
    }
}