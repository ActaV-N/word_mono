import { ApiProperty } from "@nestjs/swagger";

enum CategoryEnum{
    "en"="영어",
    "jp"="일본어",
    "tr"="유행어",
    "wo"="여자어",
    "sh"="급식어"
}

export class UpdateExpressionDto{
    @ApiProperty()
    meaning: string

    @ApiProperty()
    media: string

    @ApiProperty()
    category: keyof typeof CategoryEnum
}