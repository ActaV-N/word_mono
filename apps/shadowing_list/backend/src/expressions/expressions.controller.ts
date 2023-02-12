import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { ExpressionsService } from './expressions.service';

@Controller('expressions')
export class ExpressionsController {
    constructor(private readonly expressionsService: ExpressionsService){}

    @Get('/')
    async findAll(){
        return this.expressionsService.expressions();
    }

    @Get('/:id')
    async findById(@Param('id') expressionId:number){
        return this.expressionsService.expression({id: expressionId});
    }

    @Post('/')
    @ApiBody({type: CreateExpressionDto})
    async createExpression(@Body('expression') expressionData:Prisma.ExpressionCreateInput){
        return this.expressionsService.createExpression(expressionData);
    }
    
    @Put('/:id')
    @ApiBody({type: UpdateExpressionDto})
    async updateExpression(@Param('id') expressionId: number, @Body('expression') expressionData: Prisma.ExpressionUpdateInput){
        return this.expressionsService.updateExpression({id:expressionId}, expressionData);
    }
}
