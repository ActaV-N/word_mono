import { Test, TestingModule } from '@nestjs/testing';
import { SentenceController } from './sentences.controller';
import { SentenceService } from './sentences.service';
import {Prisma, Sentence} from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';

describe('SentenceController', () => {
  let sentenceController: SentenceController;
  let sentenceService: SentenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentenceController],
      providers: [SentenceService, PrismaService]
    }).compile();

    sentenceController = module.get<SentenceController>(SentenceController);
    sentenceService = module.get<SentenceService>(SentenceService);

  });

  it('should be defined', () => {
    expect(sentenceController).toBeDefined();
    expect(sentenceService).toBeDefined();
  });

  describe("CRUD Test", () => {
    let testSentences:Sentence[];
    let newSentence: Prisma.SentenceCreateInput;

    beforeEach(() => {
      testSentences = [{
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
      }];

      newSentence = {
        content:'testContent3',
        movieName:'Brooklin nine nine',
        mean:'testMean'
      }
    });

    describe("FindAll", () => {
      beforeEach(() => {
        jest.spyOn(sentenceService, "sentences").mockImplementation(async ({movieName}) => {
          if(!movieName) return testSentences;
          return testSentences.filter(testSentence => testSentence.movieName === movieName);
        });
      })

      it('Should return an array of sentences', async () => {
        expect(await sentenceController.findAll()).toStrictEqual(testSentences);
      })

      it('Should return an array of sentences which fits for movieName paramter', async () => {
        expect(await sentenceController.findAll("catch me if you can")).toStrictEqual(testSentences.slice(0, 2));
      })
    })

    describe("FindById", () => {
      it('Should have findById function in controller', () => {
        expect(sentenceController.findById).toBeDefined();
      });

      it('Should return a sentence', async () => {
        jest.spyOn(sentenceService, "sentence").mockImplementation(async ({
          id
        }) => testSentences.filter(testSentence => testSentence.id === id)[0]);

        expect(await sentenceController.findById(0)).toStrictEqual(testSentences[0]);
      })
    })

    describe("Create sentence", () => {
      it('Shoud have create', () => {
        expect(sentenceController.createSentence).toBeDefined();
      })

      it('Should create new sentence', async () => {
        jest.spyOn(sentenceService, "createSentence").mockImplementation(async (data:Prisma.SentenceCreateInput) => {
          const newData = {
            ...data,
            id: testSentences.length + 1
          }
          testSentences.push(newData);

          return testSentences.slice(-1)[0];
        });

        expect(await sentenceController.createSentence(newSentence)).toStrictEqual(testSentences.slice(-1)[0]);
      })
    })

    describe('Update sentence', () => {
      it('Shoud have updateSentence function in controller', () => {
        expect(sentenceController.updateSentence).toBeDefined();
      })

      it('Shoud update sentence', async () => {
        jest.spyOn(sentenceService, "updateSentence").mockImplementation(async (
          where: Prisma.SentenceWhereUniqueInput,
          data:Prisma.SentenceUpdateInput
        ) => {
          testSentences = testSentences.map(testSentence => {
            if(testSentence.id === where.id){
              return {
                ...testSentence,
                ...data
              } as Sentence
            }
            return testSentence
          })

          return testSentences.filter(testSentence => testSentence.id === where.id)[0];
        });

        const updateWhere: number = 0;
        const updateTo: Prisma.SentenceUpdateInput = {
          content: "Test update"
        }

        const shouldBe = {
          ...testSentences[0],
          ...updateTo
        }

        expect(await sentenceController.updateSentence(updateWhere, updateTo)).toStrictEqual(shouldBe);
      })
    })
  })
});
