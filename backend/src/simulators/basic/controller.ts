import { Controller, Get, Query } from '@nestjs/common';
import { SimulationService } from './service';
import { CalculateSimulationDto } from './dto/calculate-simulation.dto';

@Controller('v1/simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Get('calculate')
  calculate(@Query() dto: CalculateSimulationDto) {
    return this.simulationService.calculate(
      dto.productType,
      dto.riskLevel,
      dto.initialAmount,
      dto.duration,
    );
  }
}
