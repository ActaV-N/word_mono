import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {Sentence, Prisma} from '@prisma/client';

@Injectable()
export class SentenceService {
    constructor(private prisma:PrismaService){}
    
    async sentences(setnenceWhereInput?: Prisma.SentenceWhereInput): Promise<Sentence[] | null>{
        const args = setnenceWhereInput && {
            where: setnenceWhereInput
        }

        return this.prisma.sentence.findMany(args);
    }

    async sentence(sentenceWhereUniqueInput: Prisma.SentenceWhereUniqueInput): Promise<Sentence | null>{
        return this.prisma.sentence.findUnique({
            where: sentenceWhereUniqueInput
        })
    }
    
    async createSentence(data: Prisma.SentenceCreateInput): Promise<Sentence | null>{
        return this.prisma.sentence.create({data});
    }

    async updateSentence(sentenceWhereUniqueInput: Prisma.SentenceWhereUniqueInput, data: Prisma.SentenceUpdateInput): Promise<Sentence | null> {
        return this.prisma.sentence.update({
            where: sentenceWhereUniqueInput,
            data
        });
    }
}
