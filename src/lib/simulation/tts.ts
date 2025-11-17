import type { SimulationBranch } from "./branches";

/**
 * Builds a TTS-friendly script from the narrative, branches, and probabilities.
 */
export function buildTtsScript(
  narrative: string,
  branches: SimulationBranch[],
  probabilities: Record<string, number>
): string {
  const lines: string[] = [];

  lines.push("Chronos simulation briefing.");
  lines.push("");
  lines.push("Primary scenario:");
  lines.push(narrative);
  lines.push("");

  lines.push("Outcome branches and likelihoods:");

  for (const branch of branches) {
    const p = probabilities[branch.id] ?? 0;
    const pct = Math.round(p * 100);
    lines.push(
      `${branch.label}: approximately ${pct} percent likelihood. ${branch.description}` 
    );
  }

  lines.push("");
  lines.push("End of briefing.");

  return lines.join(" ");
}
