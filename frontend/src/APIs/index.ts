import axios from 'axios';

export type ProductType = 'savings' | 'life_insurance';

export type ChartDataPoint = {
  year: string;
  cashback: number;
  saved: number;
  contributed: number;
  earnings: number;
};

export type CalculateSimulationParams = {
  initialAmount: number;
  duration: number;
  productType: ProductType;
  riskLevel: 1 | 2 | 3 | 4;
  annualCashback: number;
  annualSaved: number;
  annualContributed: number;
};

export type CalculateSimulationResponse = {
  central: number;
  pessimistic: number;
  optimistic: number;
  earnings: number;
  chartData: ChartDataPoint[];
};

const axiosInstance = axios.create({
  baseURL: 'https://krisna-simulator-engine-production.up.railway.app',
  timeout: 10000,
});

export async function calculateSimulation(
  params: CalculateSimulationParams,
): Promise<CalculateSimulationResponse> {
  const response = await axiosInstance.post<CalculateSimulationResponse>(
    '/v1/simulation/calculate',
    params,
  );

  return response.data;
}
