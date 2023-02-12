import { Injectable } from '@nestjs/common';
import { Expression, Prisma, Sentence, SentenceExpression } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SentenceExpressionsService {
    constructor(private readonly prisma: PrismaService){}

    async createAtOnce(sentenceCreateInput: Prisma.SentenceCreateInput, expressionCreateInput: Prisma.ExpressionCreateInput){
        const newSentence = await this.prisma.sentence.create({
            data: sentenceCreateInput
        });

        const newExpression = await this.prisma.expression.create({
            data: expressionCreateInput
        });

        await this.prisma.sentenceExpression.create({
            data:{
                sentenceId: newSentence.id,
                expressionId: newExpression.id
            }
        });

        return ({
            sentence: newSentence,
            expression: newExpression,
        });
    }

    async createSentenceAt(expressionId: number, sentenceCreateInput: Prisma.SentenceCreateInput):Promise<Sentence | null>{
        const newSentence = await this.prisma.sentence.create({
            data: sentenceCreateInput
        });

        await this.prisma.sentenceExpression.create({
            data:{
                sentenceId: newSentence.id,
                expressionId: expressionId
            }
        });

        return newSentence
    }

    async createExpressionAt(sentenceId: number, expressionCreateInput: Prisma.ExpressionCreateInput):Promise<Expression | null>{
        const newExpression = await this.prisma.expression.create({
            data: expressionCreateInput
        });

        await this.prisma.sentenceExpression.create({
            data:{
                sentenceId: sentenceId,
                expressionId: newExpression.id,
            }
        });

        return newExpression;
    }

    async getSentencesAt(expressionId: number): Promise<(SentenceExpression & {sentence: Sentence})[] | null>{
        return this.prisma.sentenceExpression.findMany({
            include:{
                sentence:true
            },
            where:{
                expressionId: expressionId
            }
        });
    }

    async getExpressionsAt(sentenceId: number): Promise<(SentenceExpression & {expression: Expression})[] | null>{
        return this.prisma.sentenceExpression.findMany({
            include:{
                expression:true
            },
            where:{
                sentenceId: sentenceId
            }
        });
    }

    async deleteSentenceById(sentenceWhereUniqueInput: Prisma.SentenceWhereUniqueInput): Promise<Sentence | null>{
        await this.prisma.sentenceExpression.deleteMany({
            where: sentenceWhereUniqueInput
        })

        return await this.prisma.sentence.delete({
            where: sentenceWhereUniqueInput
        })
    }

    async deleteExpressionById(expressionWhereUniqueInput: Prisma.ExpressionWhereUniqueInput): Promise<Expression | null>{
        await this.prisma.sentenceExpression.deleteMany({
            where: expressionWhereUniqueInput
        })

        return await this.prisma.expression.delete({
            where: expressionWhereUniqueInput
        })
    }
}
