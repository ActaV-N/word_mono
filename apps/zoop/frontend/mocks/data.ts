export type TodayDataT = {
    id:number,
    content: string,
    meaning:string,
    createdAt: Date
}

export const TODAY_DATA: TodayDataT[] = [];

export type UseCaseT = {
    content: string,
    meaning: string,
    createdAt: Date,
}

type TodaysNyam = {
    gonnaNyam: boolean,
    success: boolean
}

export enum LangEnum{
    "en"="영어",
    "jp"="일본어",
    "tr"="유행어",
    "wo"="여자어",
    "sh"="급식어"
}

export type TodayNyamT = TodayDataT & TodaysNyam & {
    cases: UseCaseT[],
    category?: keyof typeof LangEnum,
    media?: string
}

export const TODAY_NYAM: TodayNyamT[] = [
   
]