import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateSentenceDto } from 'src/sentences/dto/create-sentence.dto';
import { CreateSentenceExpressionsAtOnceDto } from './dto/creaet-sentence-expressions.dto';
import { SentenceExpressionsService } from './sentence-expressions.service';

@Controller('sentence-expressions')
export class SentenceExpressionsController {
    constructor(private readonly sentenceExpressionsService: SentenceExpressionsService){}

    @Post('/')
    @ApiBody({type: CreateSentenceExpressionsAtOnceDto})
    async createAtOnce(@Body('sentence') sentenceData: Prisma.SentenceCreateInput, @Body('expression') expressionData: Prisma.ExpressionCreateInput){
        return this.sentenceExpressionsService.createAtOnce(sentenceData, expressionData);
    }

    @Post('/:expressionId')
    @ApiBody({type:CreateSentenceDto})
    async createSentenceAt(@Param('expressionId') expressionId:number, @Body('sentence') sentence: Prisma.SentenceCreateInput){
        return this.sentenceExpressionsService.createSentenceAt(expressionId, sentence);
    }

    @Post('/:sentenceId')
    @ApiBody({type:CreateSentenceDto})
    async createExpressionAt(@Param('sentenceId') sentenceId:number, @Body('expression') expressionData: Prisma.ExpressionCreateInput){
        return this.sentenceExpressionsService.createExpressionAt(sentenceId, expressionData);
    }

    @Get('/:expressionId')
    async getSentencesAt(@Param('expressionId') expressionId: number){
        return this.sentenceExpressionsService.getSentencesAt(expressionId);
    }

    @Get('/:sentenceId')
    async getExpressionsAt(@Param('sentenceId') sentenceId: number){
        return this.sentenceExpressionsService.getExpressionsAt(sentenceId);
    }

    @Delete('/:sentenceId')
    async deleteSentenceById(@Param('sentenceId') sentenceId: number){
        return this.sentenceExpressionsService.deleteSentenceById({id:sentenceId});
    }

    @Delete('/:expressionId')
    async deleteExpressionById(@Param('expressionId') expressionId: number){
        return this.sentenceExpressionsService.deleteExpressionById({id:expressionId});
    }
}
