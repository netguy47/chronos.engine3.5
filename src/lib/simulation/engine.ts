import { SimulationContext } from "./context";
import { generateNarrative } from "./narrative";
import { generateBranches } from "./branches";
import { generateProbabilities } from "./probabilities";
import { buildTimeline } from "./timeline";
import { extractImageKeywords } from "./images";
import { buildTtsScript } from "./tts";

export interface ChronosSimulationInput {
  prompt: string;
  variables?: Record<string, any>;
  depth?: number;
}

export interface ChronosSimulationResult {
  narrative: string;
  branches: any[];
  probabilities: Record<string, number>;
  timeline: any[];
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
 * Core simulation orchestrator for Chronos v3.5
 */
export async function runChronosSimulation(
  input: ChronosSimulationInput,
  context: SimulationContext
): Promise<ChronosSimulationResult> {

  const { prompt, variables = {}, depth = 1 } = input;

  // === 1. Generate primary narrative (macro-aware)
  const narrative = await generateNarrative(prompt, variables, cont
