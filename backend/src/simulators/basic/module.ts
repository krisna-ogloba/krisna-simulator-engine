import { Module } from '@nestjs/common';
import { SimulationController } from './controller';
import { SimulationService } from './service';

@Module({
  imports: [],
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule {}
