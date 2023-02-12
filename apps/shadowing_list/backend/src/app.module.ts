import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SentenceModule } from './sentences/sentences.module';
import { ExpressionsModule } from './expressions/expressions.module';
import { SentenceExpressionsModule } from './sentence-expressions/sentence-expressions.module';

@Module({
  imports: [PrismaModule, SentenceModule, ExpressionsModule, SentenceExpressionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
