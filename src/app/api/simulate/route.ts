import { buildSimulationContext } from "@/lib/simulation/context";
import { runChronosSimulation } from "@/lib/simulation/engine";

export async function POST(req: Request) {
  const body = await req.json();

  const context = await buildSimulationContext();
  const result = await runChronosSimulation(body, context);

  return Response.json(result);
}
