import { getMacroSnapshot } from "../fred/macro";
import { computeMacroInfluenceScore } from "../fred/macroWeights";
import { computeVolatilityScore } from "../fred/volatilityScore";

export interface SimulationContext {
  macro: any;
  macroInfluence: number;
  volatility: number;
  timestamp: string;
}

/**
 * Prepares the full simulation context using macroeconomic data.
 */
export async function buildSimulationContext(): Promise<SimulationContext> {
  const macro = await getMacroSnapshot();

  const macroInfluence = computeMacroInfluenceScore(macro);
  const volatility = computeVolatilityScore(macro);

  return {
    macro,
    macroInfluence,
    volatility,
    timestamp: new Date().toISOString()
  };
}
