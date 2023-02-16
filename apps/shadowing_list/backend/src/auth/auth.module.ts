import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./strategy/google.strategy";
import { NaverStrategy } from "./strategy/naver.strategy";

@Module({
    imports:[JwtModule.register({})],
    controllers:[AuthController],
    providers:[GoogleStrategy, NaverStrategy, AuthService, PrismaService]
})
export class AuthModule{}