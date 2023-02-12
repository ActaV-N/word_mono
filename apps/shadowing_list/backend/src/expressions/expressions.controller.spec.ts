import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, Expression } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpressionsController } from './expressions.controller';
import { ExpressionsService } from './expressions.service';

describe('ExpressionsController', () => {
  let expressionsController: ExpressionsController;
  let expressionsService: ExpressionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpressionsController],
      providers: [PrismaService, ExpressionsService]
    }).compile();

    expressionsController = module.get<ExpressionsController>(ExpressionsController);
    expressionsService = module.get<ExpressionsService>(ExpressionsService);
  });

  it('should be defined', () => {
    expect(expressionsController).toBeDefined();
    expect(expressionsService).toBeDefined();
  });

  describe("CRUD", () => {
    let testExpressions: Expression[] = [
      {
        id:0,
        content:'Test phrase',
        mean:'Test mean'
      },
      {
        id:1,
        content:'Test phrase',
        mean:'Test mean'
      },
      {
        id:2,
        content:'Test phrase',
        mean:'Test mean'
      },
    ]

    describe("Read expressions", () => {
      it('should have findAll function in controller', () => {
        expect(expressionsController.findAll).toBeDefined();
      })

      it('should return an array of expressions', async () => {
        jest.spyOn(expressionsService, "expressions").mockImplementation(async () => {
          return testExpressions;
        });

        expect(await expressionsController.findAll()).toStrictEqual(testExpressions);
      })

      it('should have findById function in controller', () => {
        expect(expressionsController.findById).toBeDefined();
      })

      it('should return an expression', async () => {
        jest.spyOn(expressionsService, "expression").mockImplementation(
          async ({id}: Prisma.ExpressionWhereUniqueInput) => {
            return testExpressions.filter(testExpression => testExpression.id === id)[0];
        });

        expect(await expressionsController.findById(2)).toStrictEqual(testExpressions[2]);
      })
    })

    describe("Create expressions", () => {
      let newExpression: Prisma.ExpressionCreateInput = {
        content:'new Ex',
        mean:'new Mean',
      }
      it('should have createExpression function in controller', () => {
        expect(expressionsController.createExpression).toBeDefined();
      })

      it('should create new expression', async () => {
        jest.spyOn(expressionsService, "createExpression").mockImplementation(async (data: Prisma.ExpressionCreateInput) => {
          const newExpression = {id: testExpressions.length + 1, ...data};
          testExpressions.push(newExpression);

          return newExpression;
        })

        expect(await expressionsController.createExpression(newExpression)).toStrictEqual({
          id:testExpressions.length,
          ...newExpression
        });
      });
    })

    describe("Update expression", () => {
      let updateExpression: Prisma.ExpressionUpdateInput = {
        content: 'update',
        mean: 'update'
      }

      it('should have updateExpression function in controller', () => {
        expect(expressionsController.updateExpression).toBeDefined();
      })

      it('should update expression and return it', async () => {
        jest.spyOn(expressionsService, "updateExpression").mockImplementation(
          async ({id}: Prisma.ExpressionWhereUniqueInput, data: Prisma.ExpressionUpdateInput) => {
            testExpressions = 
              testExpressions.map(testExpression => testExpression.id === id ? {...testExpression, ...data} as Expression: testExpression);

            return testExpressions.filter(testExpression => testExpression.id === id)[0];
          })
        
        expect(await expressionsController.updateExpression(2, updateExpression)).toStrictEqual(testExpressions[2]);
      })
    })
  })
});
