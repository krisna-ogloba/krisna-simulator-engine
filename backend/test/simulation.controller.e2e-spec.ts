import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SimulationService } from '@simulators/basic/service';
import { SimulationModule } from '@simulators/basic/module';

describe('SimulationController (e2e)', () => {
  let app: INestApplication;

  const mockResult = {
    central: 21900,
    pessimistic: 12200,
    optimistic: 38700,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SimulationModule],
    })
      .overrideProvider(SimulationService)
      .useValue({
        calculate: jest.fn().mockReturnValue(mockResult),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/simulation/calculate (GET)', () => {
    return request(app.getHttpServer() as never)
      .get('/v1/simulation/calculate')
      .query({
        initialAmount: '10000',
        productType: 'life_insurance',
        riskLevel: '2',
        duration: '20',
      })
      .expect(200)
      .expect(mockResult);
  });

  afterAll(async () => {
    await app.close();
  });
});
