import { ApiProperty } from "@nestjs/swagger";


export class CreateCaseDto{
    @ApiProperty({required: true})
    content: string

    @ApiProperty({required: true})
    meaning: string
}