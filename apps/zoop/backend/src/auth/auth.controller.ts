import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
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
        const [tokens, isUserExist] = await this.authService.oauthProcess(user);

        const {accessToken, refreshToken} = tokens as {accessToken: string, refreshToken: string};

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);

        if(isUserExist){
            res.redirect(process.env.DOMAIN); 
        } else{
            res.redirect(process.env.LOGIN_DOMAIN);
        }
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
        const [tokens, isUserExist] = await this.authService.oauthProcess(user);

        const {accessToken, refreshToken} = tokens as {accessToken: string, refreshToken: string};

        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);

        if(isUserExist){
            res.redirect(process.env.DOMAIN); 
        } else{
            res.redirect(process.env.LOGIN_DOMAIN);
        }
    }

    @Get('/refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refreshTokens(@Req() req: Request){
        const id = req.user['sub'];
        const refreshToken = req.user['refreshToken'];

        return this.authService.refreshTokens(id, refreshToken);
    }

    @Post('/signup')
    @UseGuards(AuthGuard('jwt'))
    async signUp(@Req() req: Request, @Res() res:Response, @Body('username') username: string){
        const email = req.user['email'];

        try{
            const {accessToken, refreshToken} = await this.authService.newUserProcess(email, username);
 
            return res.status(200).json({
                success:true,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } catch(error){
            return res.status(500).json({
                success:false,
                error: error
            })
        }
    }
}