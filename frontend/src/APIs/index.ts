import axios from 'axios';

export type ProductType = 'savings' | 'life_insurance';

export type CalculateSimulationParams = {
  initialAmount: number;
  duration: number;
  productType: ProductType;
  riskLevel: 1 | 2 | 3 | 4;
};

export type CalculateSimulationResponse = {
  central: number;
  pessimistic: number;
  optimistic: number;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

export async function calculateSimulation({
  initialAmount,
  duration,
  productType,
  riskLevel,
}: CalculateSimulationParams): Promise<CalculateSimulationResponse> {
  const response = await axiosInstance.get<CalculateSimulationResponse>(
    '/v1/simulation/calculate',
    {
      params: {
        initialAmount,
        duration,
        productType,
        riskLevel,
      },
    },
  );

  return response.data;
}
