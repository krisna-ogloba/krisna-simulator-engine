import { Test, TestingModule } from '@nestjs/testing';
import { SimulationController } from '../src/infrastructure/simulation.controller';
import { SimulationService } from '../src/application/simulation.service';

describe('SimulationController', () => {
  let controller: SimulationController;
  let service: SimulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulationController],
      providers: [
        {
          provide: SimulationService,
          useValue: {
            calculate: jest.fn().mockReturnValue({
              central: 21900,
              pessimistic: 12200,
              optimistic: 38700,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<SimulationController>(SimulationController);
    service = module.get<SimulationService>(SimulationService);
  });

  it('should call simulationService.calculate with correct params', () => {
    const params = {
      initialAmount: '10000',
      productType: 'life_insurance' as const,
      riskLevel: '2',
      duration: '20',
    };

    controller.calculate(
      params.initialAmount,
      params.productType,
      params.riskLevel,
      params.duration,
    );

    expect(service.calculate).toHaveBeenCalledWith(
      'life_insurance',
      2,
      10000,
      20,
    );
  });
});
