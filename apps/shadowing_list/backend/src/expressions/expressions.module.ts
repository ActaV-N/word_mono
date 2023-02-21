import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ExpressionsController } from "./expressions.control";
import { ExpressionsService } from "./expressions.service";

@Module({
    controllers:[ExpressionsController],
    providers:[ExpressionsService, PrismaService]
})
export class ExpressionsModule{}
