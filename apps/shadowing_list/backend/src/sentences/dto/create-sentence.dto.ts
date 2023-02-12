import {ApiProperty} from '@nestjs/swagger'

export class CreateSentenceDto{
    @ApiProperty({required:true})
    content: string;

    @ApiProperty({required:true})
    mean: string;

    @ApiProperty({required:true})
    movieName: string;
}