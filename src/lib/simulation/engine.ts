import { SimulationContext } from "./context";
import { generateNarrative } from "./narrative";
import { generateBranches, SimulationBranch } from "./branches";
import { generateProbabilities } from "./probabilities";
import { buildTimeline } from "./timeline";
import { extractImageKeywords } from "./images";
import { buildTtsScript } from "./tts";

export interface ChronosSimulationInput {
  prompt: string;
  variables?: Record<string, unknown>;
  depth?: number;
}

export interface ChronosSimulationResult {
  narrative: string;
  branches: SimulationBranch[];
  probabilities: Record<string, number>;
  timeline: ReturnType<typeof buildTimeline>;
  imageKeywords: string[];
  ttsScript: string;
  context: SimulationContext;
  metadata: {
    seed: number;
    timestamp: string;
    version: string;
  };
}

/**
 * Core simulation orchestrator for Chronos v3.5.
 * Everything flows through this function (LLM hook point later).
 */
export async function runChronosSimulation(
  input: ChronosSimulationInput,
  context: SimulationContext
): Promise<ChronosSimulationResult> {
  const { prompt, variables = {}, depth = 1 } = input;

  // 1) Build macro-aware narrative baseline.
  const narrative = await generateNarrative(prompt, variables, context);

  // 2) Explore three canonical branches.
  const branches = await generateBranches(narrative, context);

  // 3) Weight each branch based on the macro context.
  const probabilities = generateProbabilities(branches, context);

  // 4) Lay out a branching timeline for quick visualization.
  const timeline = buildTimeline(branches, context);

  // 5) Generate supporting artifacts.
  const imageKeywords = extractImageKeywords(narrative, branches);
  const ttsScript = buildTtsScript(narrative, branches, probabilities);

  return {
    narrative,
    branches,
    probabilities,
    timeline,
    imageKeywords,
    ttsScript,
    context,
    metadata: {
      seed: Math.floor(Math.random() * 10_000),
      timestamp: new Date().toISOString(),
      version: `3.5.${depth}`
    }
  };
}
