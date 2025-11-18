import { FredSeriesResponse } from "./types";

/**
 * Extracts the latest valid numeric value from a FRED series.
 */
export function getLatestValue(series: FredSeriesResponse): number | null {
  if (!series?.observations?.length) return null;

  const reversed = [...series.observations].reverse();

  for (const obs of reversed) {
    const v = Number(obs.value);

    if (!isNaN(v)) return v;
  }

  return null;
}

/**
 * Converts a series to a clean numeric timeline (date -> number).
 */
export function normalizeSeries(series: FredSeriesResponse) {
  const out: { date: string; value: number }[] = [];

  for (const obs of series.observations) {
    const val = Number(obs.value);

    if (!isNaN(val)) {
      out.push({
        date: obs.date,
        value: val,
      });
    }
  }

  return out;
}

/**
 * Computes the sample standard deviation of a numeric time series.
 * Used as a lightweight volatility proxy for macro data.
 */
export function computeSeriesVolatility(series: FredSeriesResponse): number {
  const values = normalizeSeries(series).map((point) => point.value);

  if (values.length < 2) {
    return 0;
  }

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
    (values.length - 1);

  return Number(Math.sqrt(variance).toFixed(3));
}
