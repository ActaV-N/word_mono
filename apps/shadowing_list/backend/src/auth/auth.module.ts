import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy } from "./strategy/accessToken.strategy";
import { GoogleStrategy } from "./strategy/google.strategy";
import { NaverStrategy } from "./strategy/naver.strategy";
import { RefreshTokenStrategy } from "./strategy/refreshToken.strategy";

@Module({
    imports:[JwtModule.register({}), UserModule],
    controllers:[AuthController],
    providers:[GoogleStrategy, NaverStrategy, AuthService, PrismaService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule{}