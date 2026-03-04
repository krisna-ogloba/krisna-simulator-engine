import { Body, Controller, Post } from '@nestjs/common';
import { SimulationService } from './service';
import { CalculateSimulationDto } from './dto/calculate-simulation.dto';

@Controller('v1/simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Post('calculate')
  calculate(@Body() dto: CalculateSimulationDto) {
    return this.simulationService.calculate(dto);
  }
}
