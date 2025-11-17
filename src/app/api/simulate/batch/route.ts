import { NextResponse } from "next/server";
import { buildSimulationContext } from "@/lib/simulation/context";
import { runChronosSimulation } from "@/lib/simulation/engine";

export async function POST(req: Request) {
  const body = await req.json();
  const iterations = Math.min(body.iterations || 10, 50);

  const results = [];
  const branchCount: Record<string, number> = {};
  let totalInfluence = 0;
  let totalVolatility = 0;

  for (let i = 0; i < iterations; i++) {
    const context = await buildSimulationContext();
    const result = await runChronosSimulation(body, context);

    results.push(result);

    // Aggregate stats
    totalInfluence += context.macroInfluence;
    totalVolatility += context.volatility;

    for (const [branchId, p] of Object.entries(result.probabilities)) {
      branchCount[branchId] = (branchCount[branchId] || 0) + p;
    }
  }

  const aggregate = {
    iterations,
    meanMacroInfluence: totalInfluence / iterations,
    meanVolatility: totalVolatility / iterations,
    branchProbabilityAverages: branchCount,
    timestamp: new Date().toISOString()
  };

  return NextResponse.json({
    runs: results,
    aggregate
  });
}
