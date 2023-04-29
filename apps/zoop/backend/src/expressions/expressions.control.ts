import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody } from "@nestjs/swagger";
import { Request } from "express";
import { CreateExpressionDto } from "./dto/create-expression.dto";
import {JwtPayload} from '../auth/strategy/accessToken.strategy'
import { ExpressionsService } from "./expressions.service";
import { getToday } from "utils/date";
import { UpdateExpressionDto } from "./dto/update-expression.dto";
import { Category } from "@prisma/client";
import { CreateCaseDto } from "./dto/create-case.dto";
import { UpdateCaseDto } from "./dto/update-case.dto";

@Controller('expressions')
export class ExpressionsController{
    constructor(private readonly expressionsService: ExpressionsService){}

    /**
     * Nyam Nyam
     */
    
    @Get('/todays_nyam') 
    @UseGuards(AuthGuard('jwt'))
    async getTotalNyamsToday(@Req() req: Request){
        const {sub: userId} = (req.user as JwtPayload);
        
        return this.expressionsService.fetchExpressions(userId, "nyam");
    }

    @Post('/:expressionId/cases')
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({type: CreateCaseDto})
    async createCaseOf(@Param('expressionId') expressionId: number, @Body('data') createCaseData: CreateCaseDto){
        return this.expressionsService.createCase(expressionId * 1, createCaseData); 
    }

    @Put('/cases/:caseId')
    @ApiBody({type: UpdateCaseDto})
    @UseGuards(AuthGuard('jwt'))
    async updateCase(@Param('caseId') caseId: number, @Body('data') updateCaseData: UpdateCaseDto){
        return this.expressionsService.updateCase(caseId, updateCaseData)
    }

    /**
     * Zoop Zoop
     */
    
    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async getTotalZoops(@Req() req: Request){
        const {sub: userId} = (req.user as JwtPayload);
        
        return this.expressionsService.fetchExpressions(userId, "zoop");
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({type: UpdateExpressionDto})
    async updateZoop(@Param('id') expressionId: number, @Body('data') updateData: UpdateExpressionDto){
        return this.expressionsService.updateZoop(expressionId * 1, {
            meaning: updateData.meaning,
            media: updateData.media,
            category: Category[updateData.category]
        });
    }

    @Put('/nyam_today/:id')
    @UseGuards(AuthGuard('jwt'))
    async nyamExpressionToday(@Param('id') expressionId: number){
        return this.expressionsService.updateZoop(expressionId*1, {
            userNyam:{
                create:{
                    createdAt: getToday()
                }
            }
        })
    }    

    /**
     * Main Zoop
     */

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({type:CreateExpressionDto})
    async createExpression(@Body('content') content: string, @Body('meaning') meaning: string, @Req() req: Request){
        const {sub: userId} = (req.user as JwtPayload);

        return this.expressionsService.createExpression(userId, {
            content,
            meaning
        })
    }

    @Get('/today_zoop')
    @UseGuards(AuthGuard('jwt'))
    async todayZoop(@Req() req:Request){
        const {sub: userId} = (req.user as JwtPayload);
        const today = getToday(); 

        return this.expressionsService.fetchExpressionsByDuration(userId, today);
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteZoop(@Req() req: Request, @Param('id') expressionId: number){
        const {sub: userId} = (req.user as JwtPayload);
        return this.expressionsService.deleteZoop(userId, expressionId * 1);
    }
}