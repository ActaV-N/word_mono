import { ApiProperty } from "@nestjs/swagger";
import { CreateExpressionDto } from "src/expressions/dto/create-expression.dto";
import { CreateSentenceDto } from "src/sentences/dto/create-sentence.dto";

export class CreateSentenceExpressionsAtOnceDto{
    @ApiProperty({required: true})
    sentence: CreateSentenceDto;

    @ApiProperty({required: true})
    expression: CreateExpressionDto;
}