import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SentenceExpressionsController } from './sentence-expressions.controller';
import { SentenceExpressionsService } from './sentence-expressions.service';

@Module({
  controllers: [SentenceExpressionsController],
  providers: [SentenceExpressionsService, PrismaService]
})
export class SentenceExpressionsModule {}
