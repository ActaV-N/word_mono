import * as request from "supertest";
import {Test} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import {SentenceModule} from 'src/sentences/sentences.module'
import {SentenceService} from 'src/sentences/sentences.service'

describe("Sentences", () => {
    let app: INestApplication;
    let sentenceService = {
        sentences:[{
            id:0,
            content:'testContent',
            movieName:'catch me if you can',
            mean:'testMean'
          },{
            id:1,
            content:'testContent1',
            movieName:'catch me if you can',
            mean:'testMean'
          },{
            id:2,
            content:'testContent2',
            movieName:'catch me if you can not',
            mean:'testMean'
          }],
        sentence:{
            id:1,
            content:'testContent1',
            movieName:'catch me if you can',
            mean:'testMean'
          },
        createSentence:{
            id:3,
            content:'testContent3',
            movieName:'Brooklin nine nine',
            mean:'testMean'
          },
        updateSentence:{
            id:0,
            content:'testContentUpdate',
            movieName:'catch me if you can',
            mean:'testMean'
          },
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports:[SentenceModule]
        })
        .overrideProvider(SentenceService)
        .useValue(sentenceService)
        .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    })

    it('/GET sentences', () => {
        return request(app.getHttpServer())
        .get('/sentences')
        .expect(200)
        .expect({
            data: sentenceService.sentences
        })
    })
})