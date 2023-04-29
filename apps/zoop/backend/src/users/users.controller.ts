import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { OauthUser } from "src/auth/dto/oauth_user.dto";
import { JwtPayload } from "src/auth/strategy/accessToken.strategy";
import { UserService } from "./users.service";

@Controller('/users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    async findMe(@Req() req: Request){
        const {email} = req.user as JwtPayload;
        const user = await this.userService.findByEmail({email} as OauthUser);
        
        if(!user) return {email: email};

        return {
            id: user.id,
            email: user.email,
            username: user.username
        };
    } 
}