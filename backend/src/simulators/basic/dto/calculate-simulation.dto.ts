import { IsEnum, IsNumber, Min, Max, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CalculateSimulationDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  initialAmount!: number;

  @IsEnum(['savings', 'life_insurance'])
  productType!: 'savings' | 'life_insurance';

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(4)
  riskLevel!: 1 | 2 | 3 | 4;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  duration!: number;
}
