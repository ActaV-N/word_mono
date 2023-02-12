import { Test, TestingModule } from '@nestjs/testing';
import { Expression, Prisma, Sentence, SentenceExpression } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SentenceExpressionsController } from './sentence-expressions.controller';
import { SentenceExpressionsService } from './sentence-expressions.service';

describe('SentenceExpressionsController', () => {
  let sentenceExpressionsController: SentenceExpressionsController;
  let sentenceExpressionsService: SentenceExpressionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentenceExpressionsController],
      providers: [SentenceExpressionsService, PrismaService]
    }).compile();

    sentenceExpressionsController = module.get<SentenceExpressionsController>(SentenceExpressionsController);
    sentenceExpressionsService = module.get<SentenceExpressionsService>(SentenceExpressionsService);
  });

  it('should be defined', () => {
    expect(sentenceExpressionsController).toBeDefined();
    expect(sentenceExpressionsService).toBeDefined();
  });

  describe("CRUD", () => {
    describe('Create sentenceExpression', () => {
      let newSentence: Prisma.SentenceCreateInput = {
        content:'new Con',
        mean:'new Mean',
        movieName:'new Movie name'
      }

      let newExpression: Prisma.ExpressionCreateInput = {
        content:'new Con',
        mean:'new Mean',
      }

      it('should have createAtOnce function in controller', () => {
        expect(sentenceExpressionsController.createAtOnce).toBeDefined();
      })

      it('should create sentence and expression and sentenceExpression', async () => {
        jest.spyOn(sentenceExpressionsService, "createAtOnce").mockImplementationOnce(
          async (sentenceData: Prisma.SentenceCreateInput, expressionData: Prisma.ExpressionCreateInput) => {
            return ({
              sentence:{
                id:0,
                ...sentenceData
              },
              expression:{
                id:0,
                ...expressionData
              }
            });
          })
          const result = {
            sentence:{
              id:0,
              ...newSentence
            },
            expression:{
              id:0,
              ...newExpression
            }
          }

        expect(await sentenceExpressionsController.createAtOnce(newSentence, newExpression)).toStrictEqual(result);
      })

      it('should have createSentenceAt function in controller', () => {
        expect(sentenceExpressionsController.createSentenceAt).toBeDefined();
      })

      it('should create sentence related with specific expression', async () => {
        jest.spyOn(sentenceExpressionsService, "createSentenceAt").mockImplementation(
          async (expressionId: number, sentenceCreateInput: Prisma.SentenceCreateInput) => {
            return {id:0, ...sentenceCreateInput};
        });

        expect(await sentenceExpressionsController.createSentenceAt(0, newSentence)).toStrictEqual({...newSentence, id:0})
      })

      it('should have createExpressionAt function in controller', () => {
        expect(sentenceExpressionsController.createExpressionAt).toBeDefined();
      })

      it('should create expression related with specific sentence', async () => {
        jest.spyOn(sentenceExpressionsService, "createExpressionAt").mockImplementation(
          async (sentenceId: number, expressionCreateInput: Prisma.ExpressionCreateInput) => {
            return {id:0, ...expressionCreateInput};
        });

        expect(await sentenceExpressionsController.createExpressionAt(0, newExpression)).toStrictEqual({...newExpression, id:0});
      })
    })

    let testSentenceExpression: SentenceExpression[] = [
      {
        id:0,
        sentenceId:0,
        expressionId:0
      },
      {
        id:1,
        sentenceId:1,
        expressionId:0
      },
      {
        id:2,
        sentenceId:1,
        expressionId:1
      },
    ]

    let testSentences: Sentence[] = [
      {
        id:0,
        content:'Test',
        movieName: 'Test',
        mean: 'Test'
      },
      {
        id:1,
        content:'Test',
        movieName: 'Test',
        mean: 'Test'
      },
    ]

    let testExpressions: Expression[] = [
      {
        id:0,
        content:'Test',
        mean: 'Test'
      },
      {
        id:1,
        content:'Test',
        mean: 'Test'
      },
    ]
    describe("Read sentenceExpression", () => {

      it('should have getSentencesAt function in controller', () => {
        expect(sentenceExpressionsController.getSentencesAt).toBeDefined();
      })

      it('should get all sentences at specific Expression id', async () => {
        jest.spyOn(sentenceExpressionsService, "getSentencesAt").mockImplementation(async (expressionId: number) => {
          return testSentenceExpression
          .filter(t => t.expressionId === expressionId)
          .map(t => {
            return {
              id: t.id,
              expressionId: expressionId,
              sentenceId: t.sentenceId,
              sentence: testSentences.filter(s => s.id === t.sentenceId)[0]
            }
          });
        })

        const result = testSentenceExpression
        .filter(t => t.expressionId === 0)
        .map(t => {
          return {
            id: t.id,
            expressionId: 0,
            sentenceId: t.sentenceId,
            sentence: testSentences.filter(s => s.id === t.sentenceId)[0]
          }
        });

        expect(await sentenceExpressionsController.getSentencesAt(0)).toStrictEqual(result);
      })
      
      it('should have getExpressionsAt function in controller', () => {
        expect(sentenceExpressionsController.getExpressionsAt).toBeDefined();
      })

      it('should get all expressions at specific Sentence id', async () => {
        jest.spyOn(sentenceExpressionsService, "getExpressionsAt").mockImplementation(async (sentenceId: number) => {
          return testSentenceExpression
          .filter(t => t.sentenceId === sentenceId)
          .map(t => {
            return {
              id: t.id,
              sentenceId: sentenceId,
              expressionId: t.expressionId,
              expression: testExpressions.filter(e => e.id === t.expressionId)[0]
            }
          });
        })

        const result = testSentenceExpression
        .filter(t => t.sentenceId === 0)
        .map(t => {
          return {
            id: t.id,
            sentenceId: 0,
            expressionId: t.expressionId,
            expression: testExpressions.filter(e => e.id === t.expressionId)[0]
          }
        });

        expect(await sentenceExpressionsController.getExpressionsAt(0)).toStrictEqual(result);
      })
    })

    describe('Delete', () => {
      // TODO: Delete Expression and SentenceExpression related with it
      it('should have deleteSentenceById function in controller', () => {
        expect(sentenceExpressionsController.deleteSentenceById).toBeDefined();
      })
  
      it('should delete and return deleted sentence', async () => {
        jest.spyOn(sentenceExpressionsService, "deleteSentenceById").mockImplementation(async ({id}) => {
          const res = testSentences.filter(s => s.id === id)[0];

          testSentenceExpression = testSentenceExpression.filter(se => se.sentenceId !== id);
          testSentences = testSentences.filter(s => s.id !== id);
          
          return res;
        })

        expect(await sentenceExpressionsController.deleteSentenceById(1)).toStrictEqual({
          id:1,
          content:'Test',
          movieName: 'Test',
          mean: 'Test'
        });

        expect(testSentenceExpression.length).toBe(1);
        expect(testSentences.length).toBe(1);
      });

      // TODO: Delete Sentence and SentenceExpression related with it
      it('should have deleteExpressionById function in controller', () => {
        expect(sentenceExpressionsController.deleteExpressionById).toBeDefined();
      })
      
      it('should delete and return deleted expression', async () => {
        testSentenceExpression = [
          {
            id:0,
            sentenceId:0,
            expressionId:0
          },
          {
            id:1,
            sentenceId:1,
            expressionId:0
          },
          {
            id:2,
            sentenceId:1,
            expressionId:1
          },
        ]
        
        jest.spyOn(sentenceExpressionsService, "deleteExpressionById").mockImplementation(async ({id}) => {
          const res = testExpressions.filter(e => e.id === id)[0];

          testSentenceExpression = testSentenceExpression.filter(se => se.expressionId !== id);
          testExpressions = testExpressions.filter(e => e.id !== id);
          
          return res;
        })

        expect(await sentenceExpressionsController.deleteExpressionById(1)).toStrictEqual({
          id:1,
          content:'Test',
          mean: 'Test'
        });

        expect(testSentenceExpression.length).toBe(2);
        expect(testExpressions.length).toBe(1);
      });
    })
    
  })

});
