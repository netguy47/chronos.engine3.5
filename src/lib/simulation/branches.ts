import type { SimulationContext } from "./context";

export interface SimulationBranch {
  id: string;
  label: string;
  description: string;
  tone: "base" | "optimistic" | "adverse";
}

export async function generateBranches(
  narrative: string,
  context: SimulationContext
): Promise<SimulationBranch[]> {
  const { volatility } = context;

  const highVol = volatility > 5;
  const lowVol = volatility < 1.5;

  const base: SimulationBranch = {
    id: "base",
    label: "Central Trajectory",
    tone: "base",
    description: `${narrative} In the central trajectory, key actors react in mostly predictable ways, and shocks remain within historical norms.` 
  };

  const optimistic: SimulationBranch = {
    id: "optimistic",
    label: highVol ? "Contained Upside Breakout" : "Gradual Improvement",
    tone: "optimistic",
    description: `${narrative} In the optimistic path, coordination improves, policy errors are limited, and tail risks quietly decay over time.` 
  };

  const adverse: SimulationBranch = {
    id: "adverse",
    label: highVol ? "Cascading Instability" : "Slow-Burn Deterioration",
    tone: "adverse",
    description: `${narrative} In the adverse path, latent risks crystallize, stress amplifies across domains, and recovery is delayed or partial.` 
  };

  return [base, optimistic, adverse];
}
