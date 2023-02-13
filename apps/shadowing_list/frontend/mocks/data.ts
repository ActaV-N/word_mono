export type TodayDataT = {
    id:number,
    expression: string,
    meaning:string,
    created_at: Date
}

export const TODAY_DATA: TodayDataT[] = [];

type UseCaseT = {
    case: string,
    meaning: string,
    date: Date,
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
    useCases: UseCaseT[],
    langType: keyof typeof LangEnum,
    media?: string
}

export const TODAY_NYAM: TodayNyamT[] = [
    {
        id:0,
        expression:"BOGO(Buy One Get One free)",
        meaning:"1+1",
        created_at:new Date("2023-02-01"),
        useCases:[{ // n:m relation
            case:"It's BOGO, nice!",
            meaning:"이거 원쁠원이다 아싸~",
            date: new Date("2023-02-03")
        }],
        gonnaNyam: true,
        success: false,
        langType: "en",
        media: "Edi Lee 유튜브"
    },
    {
        id:1,
        expression:"By any chance",
        meaning:"혹시",
        created_at:new Date("2023-01-31"),
        useCases:[{
            case:"Do you by any chance know where is the toilet?",
            meaning:"혹시 화장실이 어딨는줄 아시나요?",
            date:new Date("2023-02-04")
        },{
            case:"Excuse me sir, do you by any chance work at the libary?",
            meaning:"저기, 혹시 도서관에서 일하시나요?",
            date:new Date("2023-02-05")
        },],
        gonnaNyam: false,
        success: false,
        langType: "en",
        media: "유튜브"
    },
    {
        id:2,
        expression:"알잘딱깔센",
        meaning:"알아서 잘 딱 깔끔하고 센스있게",
        created_at:new Date("2022-01-04"),
        useCases:[{
            case:"제발 알잘딱좀;",
            meaning:"낄떄 껴",
            date:new Date("2022-01-12")
        }],
        gonnaNyam: false,
        success: false,
        langType: "tr",
        media: "우왁굳의 게임방송"
    },
    {
        id:3,
        expression:"Even better",
        meaning:"오히려 좋아",
        created_at:new Date("2022-03-01"),
        useCases:[],
        gonnaNyam: true,
        success: false,
        langType: "en",
        media: "영화 Catch me if you can"
    },
    {
        id:4,
        expression:"Custudy",
        meaning:"",
        created_at:new Date("2022-01-04"),
        useCases:[],
        gonnaNyam: false,
        success: false,
        langType: "en",
        media: "영화 Catch me if you can"
    },
    // {
    //     id:4,
    //     expression:"",
    //     meaning:"",
    //     created_at:new Date(Date.now()),
    //     useCases:[],
    //     gonnaNyam: true,
    //     success: false,
    //     langType: "en"
    // },
    // {
    //     id:5,
    //     expression:"",
    //     meaning:"",
    //     created_at:new Date(Date.now()),
    //     useCases:[],
    //     gonnaNyam: true,
    //     success: false,
    //     langType: "en"
    // },
    // {
    //     id:6,
    //     expression:"",
    //     meaning:"",
    //     created_at:new Date(Date.now()),
    //     useCases:[],
    //     gonnaNyam: true,
    //     success: false,
    //     langType: "en"
    // },
]