export type ChartDataPoint = {
  year: string;
  cashback: number;
  saved: number;
  contributed: number;
  earnings: number;
};

export class SimulationEngine {
  static calculate(initial: number, rate: number, vol: number, years: number) {
    const calc = (r: number) => initial * Math.pow(1 + r, years); //
    return {
      central: calc(rate),
      pessimistic: calc(rate - vol),
      optimistic: calc(rate + vol),
    };
  }

  static generateChartData(
    duration: number,
    annualCashback: number,
    annualSaved: number,
    annualContributed: number,
    totalEarnings: number,
  ): ChartDataPoint[] {
    const points: ChartDataPoint[] = [];
    const currentYear = new Date().getFullYear();

    const step = 1;

    for (let yearOffset = 0; yearOffset <= duration; yearOffset += step) {
      const displayYear = currentYear + yearOffset;
      const investedYears = yearOffset;
      const gainProgress = Math.min(investedYears / Math.max(1, duration), 1);

      points.push({
        year: `'${displayYear.toString().slice(-2)}`,
        cashback: annualCashback * investedYears,
        saved: annualSaved * investedYears,
        contributed: annualContributed * investedYears,
        earnings: totalEarnings * gainProgress,
      });
    }

    return points;
  }
}
