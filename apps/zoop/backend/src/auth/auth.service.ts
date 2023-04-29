import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { UserService } from 'src/users/users.service';
import { OauthUser } from './dto/oauth_user.dto';
import { JwtPayload } from './strategy/accessToken.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  async refreshTokens(id:number, refreshToken: string){
    const user = await this.userService.findById(id);
    if(!user || !user.refreshToken){
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken
    );

    if(!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = this.getToken({sub: user.id, email:user.email});
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async newUserProcess(email: string, username: string){
    const user = await this.userService.createUser({
      email: email,
      username: username
    });

    const payload = {sub: user.id, email: user.email};
    const tokens = this.getToken(payload);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens
  }
  
  async oauthProcess(oauthUser: OauthUser) {
    const user = await this.userService.findByEmail(oauthUser);
    let payload: JwtPayload 
    if(!user) payload = {email: oauthUser.email, sub:null};
    else payload = { sub: user.id, email: user.email };
    
    const tokens = this.getToken(payload);
    
    if(user) await this.updateRefreshToken(user.id, tokens.refreshToken);

    return [tokens, !!user];
  }

  hashData(data: string){
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string){
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.updateUser(userId, {
      refreshToken: hashedRefreshToken
    });
  }
  
  private getToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: process.env.JWT_ACCESS_SECRET
    })

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET
    })

    return {accessToken, refreshToken};
  }
}
