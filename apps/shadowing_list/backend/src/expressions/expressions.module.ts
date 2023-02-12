import { Module } from '@nestjs/common';
import { ExpressionsService } from './expressions.service';
import { ExpressionsController } from './expressions.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ExpressionsService, PrismaService],
  controllers: [ExpressionsController]
})
export class ExpressionsModule {}
