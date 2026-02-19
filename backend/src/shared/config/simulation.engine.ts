export class SimulationEngine {
  static calculate(initial: number, rate: number, vol: number, years: number) {
    const calc = (r: number) => initial * Math.pow(1 + r, years); //
    return {
      central: calc(rate),
      pessimistic: calc(rate - vol),
      optimistic: calc(rate + vol),
    };
  }
}
