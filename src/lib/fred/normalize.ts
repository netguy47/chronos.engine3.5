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
 * Computes basic volatility of a numeric time se*
