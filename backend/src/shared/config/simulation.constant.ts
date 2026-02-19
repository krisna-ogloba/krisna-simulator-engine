export const SimulationConfig = {
  savings: {
    1: { annualRate: 0.02, volatility: 0.01 },
    2: { annualRate: 0.03, volatility: 0.03 },
    3: { annualRate: 0.04, volatility: 0.06 },
    4: { annualRate: 0.05, volatility: 0.1 },
  },
  life_insurance: {
    1: { annualRate: 0.025, volatility: 0.01 },
    2: { annualRate: 0.04, volatility: 0.03 },
    3: { annualRate: 0.055, volatility: 0.06 },
    4: { annualRate: 0.075, volatility: 0.1 },
  },
} as const; // read only
