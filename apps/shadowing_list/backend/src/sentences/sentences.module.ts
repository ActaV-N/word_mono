import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SentenceController } from './sentences.controller';
import { SentenceService } from './sentences.service';

@Module({
  controllers: [SentenceController],
  providers: [SentenceService, PrismaService]
})
export class SentenceModule {}
