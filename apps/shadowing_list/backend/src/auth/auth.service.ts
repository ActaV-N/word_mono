import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { OauthUser } from './dto/oauth_user.dto';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

  // Find user by email. If not exist, create and return
  private async findByEmailOrSave(oauthUser: OauthUser): Promise<User> {
    const { email } = oauthUser;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (user) {
      return user;
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: email
      }
    });

    return newUser;
  }

  async oauthProcess(oauthUser: OauthUser) {
    const user = await this.findByEmailOrSave(oauthUser);

    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.getToken(payload);
  }

  private getToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: process.env.JWT_SECRET
    })

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET
    })

    return {accessToken, refreshToken};
  }
}
