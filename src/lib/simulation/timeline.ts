import type { SimulationContext } from "./context";
import type { SimulationBranch } from "./branches";

export interface TimelineEvent {
  id: string;
  label: string;
  branchId: string | "all";
  order: number;
  approximateYearOffset: number; // 0 = now, positive = years into future
}

/**
 * Builds a simple branching timeline from the branches and context.
 */
export function buildTimeline(
  branches: SimulationBranch[],
  _context: SimulationContext): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Shared starting event
  events.push({
    id: "t0",
    label: "Initial conditions: scenario parameters lock in.",
    branchId: "all",
    order: 0,
    approximateYearOffset: 0
  });

  // First divergence point
  events.push({
    id: "t1",
    label: "Early signal: policy, markets, or public sentiment react.",
    branchId: "all",
    order: 1,
    approximateYearOffset: 1
  });

  let order = 2;
  for (const branch of branches) {
    events.push({
      id: `t_${branch.id}_mid`,
      label: `Mid-course evolution along ${branch.label.toLowerCase()}.`,
      branchId: branch.id,
      order: order++,
      approximateYearOffset: 3
    });

    events.push({
      id: `t_${branch.id}_late`,
      label: `Late-stage outcome in the ${branch.label.toLowerCase()} path.`,
      branchId: branch.id,
      order: order++,
      approximateYearOffset: 7
    });
  }

  return events;
}
