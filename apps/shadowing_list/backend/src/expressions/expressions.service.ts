import { Injectable } from '@nestjs/common';
import { Expression, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpressionsService {
    constructor(private readonly prisma: PrismaService){}

    async expressions(): Promise<Expression[] | null>{
        return this.prisma.expression.findMany();
    }

    async expression(expressionWhereUniqueInput: Prisma.ExpressionWhereUniqueInput): Promise<Expression | null>{
        return this.prisma.expression.findUnique({
            where: expressionWhereUniqueInput
        })
    }

    async createExpression(expressionCreateInput: Prisma.ExpressionCreateInput): Promise<Expression> {
        return this.prisma.expression.create({
            data: expressionCreateInput
        });
    }

    async updateExpression(where: Prisma.ExpressionWhereUniqueInput, data: Prisma.ExpressionUpdateInput){
        return this.prisma.expression.update({
            where: where,
            data: data
        });
    }
}
