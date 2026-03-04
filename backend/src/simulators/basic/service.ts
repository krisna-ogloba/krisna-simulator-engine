import { Injectable } from '@nestjs/common';
import { SimulationConfig } from '@shared/config/simulation.constant';
import {
  SimulationEngine,
  type ChartDataPoint,
} from '@shared/config/simulation.engine';
import { CalculateSimulationDto } from './dto/calculate-simulation.dto';

export type CalculateSimulationResponse = {
  central: number;
  pessimistic: number;
  optimistic: number;
  earnings: number;
  chartData: ChartDataPoint[];
};

@Injectable()
export class SimulationService {
  calculate(dto: CalculateSimulationDto): CalculateSimulationResponse {
    const config = SimulationConfig[dto.productType][dto.riskLevel];

    const result = SimulationEngine.calculate(
      dto.initialAmount,
      config.annualRate,
      config.volatility,
      dto.duration,
    );

    // Calculate earnings using optimistic returns
    const earnings = Math.max(0, result.optimistic - dto.initialAmount);

    // Generate chart data with the optimistic earnings
    const chartData = SimulationEngine.generateChartData(
      dto.duration,
      dto.annualCashback,
      dto.annualSaved,
      dto.annualContributed,
      earnings,
    );

    return {
      ...result,
      earnings,
      chartData,
    };
  }
}
