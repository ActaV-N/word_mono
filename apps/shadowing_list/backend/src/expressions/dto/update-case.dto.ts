import { ApiProperty } from "@nestjs/swagger";


export class UpdateCaseDto{
    @ApiProperty()
    content: string

    @ApiProperty()
    meaning: string
}