import { Injectable } from '@nestjs/common';
import { SimulationEngine } from '@domain/simulation.engine';
import { SimulationConfig } from '@domain/simulation.constants';

@Injectable()
export class SimulationService {
  calculate(
    productType: 'savings' | 'life_insurance',
    riskLevel: 1 | 2 | 3 | 4,
    initialAmount: number,
    duration: number,
  ) {
    const config = SimulationConfig[productType][riskLevel];

    return SimulationEngine.calculate(
      initialAmount,
      config.annualRate,
      config.volatility,
      duration,
    );
  }
}
