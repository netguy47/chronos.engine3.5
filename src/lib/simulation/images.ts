import type { SimulationBranch } from "./branches";

/**
 * Extracts a lightweight keyword set for Unsplash queries.
 * You can make this smarter later or plug in an LLM.
 */
export function extractImageKeywords(
  narrative: string,
  branches: SimulationBranch[]
): string[] {
  const text = `${narrative} ${branches.map((b) => b.description).join(" ")}`.toLowerCase();

  const candidates = [
    "geopolitics",
    "city",
    "finance",
    "trading",
    "technology",
    "data",
    "crisis",
    "stability",
    "energy",
    "infrastructure",
    "future",
    "macro",
    "markets"
  ];

  const picked = candidates.filter((word) => text.includes(word)).slice(0, 5);

  if (!picked.length) {
    picked.push("future", "data", "city", "analytics");
  }

  return Array.from(new Set(picked));
}
