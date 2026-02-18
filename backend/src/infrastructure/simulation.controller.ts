import { Controller, Get, Query } from '@nestjs/common';
import { SimulationService } from '../application/simulation.service';

@Controller('v1/simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Get('calculate')
  calculate(
    @Query('initialAmount') initialAmount: string,
    @Query('productType') productType: 'savings' | 'life_insurance',
    @Query('riskLevel') riskLevel: string,
    @Query('duration') duration: string,
  ) {
    return this.simulationService.calculate(
      productType,
      Number(riskLevel) as 1 | 2 | 3 | 4,
      Number(initialAmount),
      Number(duration),
    );
  }
}
