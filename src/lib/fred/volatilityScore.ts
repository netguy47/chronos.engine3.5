/**
 * Produces a single stability/volatility score from the macro snapshot.
 * Higher score = more instability in the simulated world.
 */
export function computeVolatilityScore(snapshot: any) {
  const safe = (x: any) => (typeof x === "number" ? x : 0);

  const v1 = safe(snapshot.gdp.volatility);
  const v2 = safe(snapshot.unemployment.volatility);
  const v3 = safe(snapshot.inflation.volatility);
  const v4 = safe(snapshot.moneySupply.volatility);
  const v5 = safe(snapshot.industrialProduction.volatility);

  // Spread is a powerful leading recession indicator.
  const yieldSpread = Number(snapshot.yieldSpread.spread);
  const v6 = isNaN(yieldSpread) ? 0 : Math.abs(yieldSpread) * 0.5;

  const total = v1 + v2 + v3 + v4 + v5 + v6;

  return Number(total.toFixed(3));
}
