export interface MacroWeights {
  gdp: number;
  unemployment: number;
  inflation: number;
  moneySupply: number;
  industrialProduction: number;
  yieldSpread: number;
  volatilityBias: number; // from VIX (optional upgrade)
}

/**
 * Default macro influence weights used by the Chronos Simulation Engine.
 * These can be dynamically adjusted later based on scenario type.
 */
export const DEFAULT_MACRO_WEIGHTS: MacroWeights = {
  gdp: 0.18,
  unemployment: 0.15,
  inflation: 0.20,
  moneySupply: 0.10,
  industrialProduction: 0.12,
  yieldSpread: 0.20,
  volatilityBias: 0.05
};

/**
 * Takes the macro snapshot and produces a single macro influence score.
 * Higher score = stronger macroeconomic influence on simulations.
 */
export function computeMacroInfluenceScore(snapshot: any, weights: MacroWeights = DEFAULT_MACRO_WEIGHTS): number {
  const safe = (x: any) => (typeof x === "number" ? x : 0);

  const gdpScore = safe(snapshot.gdp.latest) * weights.gdp;
  const unemploymentScore = safe(snapshot.unemployment.latest) * weights.unemployment;
  const inflationScore = safe(snapshot.inflation.latest) * weights.inflation;
  const moneySupplyScore = safe(snapshot.moneySupply.latest) * weights.moneySupply;
  const industrialProductionScore = safe(snapshot.industrialProduction.latest) * weights.industrialProduction;
  const yieldSpreadScore = Math.abs(Number(snapshot.yieldSpread.spread)) * weights.yieldSpread;

  const total = gdpScore + unemploymentScore + inflationScore + moneySupplyScore + industrialProductionScore + yieldSpreadScore;

  return Number(total.toFixed(3));
}
