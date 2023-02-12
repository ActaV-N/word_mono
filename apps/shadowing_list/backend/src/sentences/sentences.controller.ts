import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { SentenceService } from './sentences.service';

@Controller('sentences')
export class SentenceController {
    constructor(private sentenceService: SentenceService){}

    /**
     * /sentences?movieName=?
     * @query movieName 
     * @returns Sentence[]
     */
    @Get('/')
    async findAll(@Query('movieName') movieName?: string){
        return this.sentenceService.sentences({movieName});
    }

    @Get('/:id')
    async findById(@Param("id") sentenceId: number){
        return this.sentenceService.sentence({id: sentenceId});
    }

    @Post('/create')
    @ApiBody({type: CreateSentenceDto})
    async createSentence(@Body('sentence') createSentenceData: Prisma.SentenceCreateInput){
        return this.sentenceService.createSentence(createSentenceData);
    }

    @Put('/update/:id')
    @ApiBody({type: UpdateSentenceDto})
    async updateSentence(@Param("id") sentenceId: number, @Body("sentence") updateSentenceData: Prisma.SentenceUpdateInput){
        return this.sentenceService.updateSentence({id:sentenceId}, updateSentenceData);
    }
}
