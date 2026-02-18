import { Module } from '@nestjs/common';
import { SimulationController } from './simulation.controller';
import { SimulationService } from '../application/simulation.service';

@Module({
  imports: [],
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule {}
