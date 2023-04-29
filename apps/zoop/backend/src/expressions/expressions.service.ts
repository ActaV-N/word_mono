import { Injectable } from "@nestjs/common";
import { Case, Expression, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { getToday } from "utils/date";
import { CreateCaseDto } from "./dto/create-case.dto";
import { CreateExpressionDto } from "./dto/create-expression.dto";
import { UpdateCaseDto } from "./dto/update-case.dto";

enum FetchEnum{
    nyam="some",
    zoop="none"
}

@Injectable()
export class ExpressionsService{
    constructor(private readonly prisma:PrismaService){}
    
    async deleteZoop(userId: number, expressionId: number){
        return this.prisma.user.update({
            where:{
                id:userId
            },
            data:{
                expressions:{
                    delete:{
                        id: expressionId
                    }
                }
            }
        })
    }

    /**
     * Update case information
     * @param caseId 
     * @param updateCaseData 
     * @returns Promise of case
     */
    async updateCase(caseId:number, updateCaseData: UpdateCaseDto): Promise<Case>{
        return this.prisma.case.update({
            where:{
                id: caseId,
            },
            data:{
                ...updateCaseData
            }
        })
    }

    /**
     * Create use case of expression
     * @param expressionId 
     * @param createCaseData 
     * @returns Promise of created case
     */
    async createCase(expressionId: number, createCaseData: CreateCaseDto): Promise<Case>{
        const userNyam = await this.prisma.userNyam.findFirst({
            where:{
                expressionId: expressionId,
                createdAt: getToday()
            }
        });

        return this.prisma.case.create({
            data:{
                content: createCaseData.content,
                meaning: createCaseData.meaning,
                expression:{
                    connect:{
                        id:expressionId
                    }
                },
                userNyam:{
                    connect: {
                        id: userNyam.id 
                    }
                }
            },
            include:{
                expression: true,
                userNyam: true,
            }
        })
    }

    /**
     * Fetch zoops: which are expressions that has no relation in userNyam.
     * @param userId 
     * @returns Promise of Expressions
     */
    async fetchExpressions(userId: number, fetchType: keyof typeof FetchEnum): Promise<Expression[]>{
        return this.prisma.expression.findMany({
            where:{
                AND:[
                    {
                        userId:{
                            equals: userId
                        }
                    },
                    {
                        userNyam: {
                            [FetchEnum[fetchType]]:{ 
                                createdAt: getToday()
                            }
                        }
                    }
                ]
            },
            orderBy:{
                [fetchType === 'zoop' ? "createdAt": "updatedAt"]:'desc', 
            },
            include:{
                cases: true,
            }
        })
    }

    /**
     * Update zoop
     * @param expressionId 
     * @param data 
     * @returns Promise of Expression
     */
    async updateZoop(expressionId: number, data:Prisma.ExpressionUpdateInput): Promise<Expression>{
        return this.prisma.expression.update({
            where:{
                id:expressionId
            },
            data:data
        });
    }

    /**
     * Create Expression query
     * @param userId 
     * @param {content, meaing} : Expression basic info
     * @returns Promise of Expression with author information
     */
    async createExpression(userId: number, {content, meaning}:CreateExpressionDto): Promise<Expression>{
        return this.prisma.expression.create({
            data: {
                content,
                meaning,
                user:{
                    connect:{
                        id: userId
                    }
                }
            },
            include:{
                user: true
            }
        });
    }

    /**
     * Fetch expressions by duration,
     * if no date_to params, get expressions for speicifc date.
     * @param userId 
     * @param date_from 
     * @param date_to 
     * @returns Promise Expressions
     */
    async fetchExpressionsByDuration(userId: number, date_from: Date, date_to?: Date): Promise<Expression[]>{
        let createdAtWhere: any = {};
        
        if(!date_to){
            date_to = new Date(date_from);
            date_to.setDate(date_to.getDate() + 1);
        }
        createdAtWhere.gte = date_from;
        createdAtWhere.lte = date_to;

        return this.prisma.expression.findMany({
            where:{
                createdAt: createdAtWhere,
                userId: userId
            }
        })
    }
}