import type { SimulationContext } from "./context";
import type { SimulationBranch } from "./branches";

/**
 * Assigns probabilities to the generated branches.
 * Returns a map of branchId -> probability (0–1).
 */
export function generateProbabilities(
  branches: SimulationBranch[],
  context: SimulationContext
): Record<string, number> {
  const { macroInfluence, volatility } = context;

  // Simple heuristic:
  // - Higher volatility => higher chance of adverse outcome.
  // - MacroInfluence > threshold => tilt toward base/optimistic.
  const baseWeight = 1;
  let optWeight = 1;
  let advWeight = 1;

  if (volatility > 5) {
    advWeight += 1.2;
  } else if (volatility < 1.5) {
    optWeight += 0.8;
  }

  if (macroInfluence < 0) {
    advWeight += 0.5;
  } else if (macroInfluence > 0) {
    optWeight += 0.5;
  }

  const weights: Record<string, number> = {};
  for (const branch of branches) {
    switch (branch.tone) {
      case "base":
        weights[branch.id] = baseWeight;
        break;
      case "optimistic":
        weights[branch.id] = optWeight;
        break;
      case "adverse":
        weights[branch.id] = advWeight;
        break;
    }
  }

  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  const normalized: Record<string, number> = {};
  for (const [id, w] of Object.entries(weights)) {
    normalized[id] = Number((w / total).toFixed(4)); // 4 decimal places
  }

  return normalized;
}
