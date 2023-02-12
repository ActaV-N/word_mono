import {ApiProperty} from '@nestjs/swagger';

export class CreateExpressionDto{
    @ApiProperty({required: true})
    content: string;

    @ApiProperty({required: true})
    mean: string;
}