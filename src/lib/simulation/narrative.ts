import type { SimulationContext } from "./context";

export interface NarrativeVariables {
  [key: string]: any;
}

/**
 * Builds a macro-aware narrative for the scenario.
 * This is where you will eventually plug in an LLM call.
 */
export async function generateNarrative(
  prompt: string,
  variables: NarrativeVariables,
  context: SimulationContext
): Promise<string> {
  const { macroInfluence, volatility } = context;

  // Simple deterministic baseline narrative for now.
  // Replace this block with your LLM integration when ready.
  const varSummary = Object.keys(variables).length
    ? `Key variables: ${Object.entries(variables)
        .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
        .join(", ")}.`
    : "No additional structured variables were specified.";

  const macroLine = `Macro influence score: ${macroInfluence.toFixed(
    2
  )}, volatility index: ${volatility.toFixed(3)}.`;

  const baseNarrative = [
    `Scenario: ${prompt.trim()}`,
    varSummary,
    macroLine,
    "Chronos projects a set of plausible futures shaped by current economic conditions, structural pressures, and latent shocks."
  ].join(" ");

  return baseNarrative;
}
