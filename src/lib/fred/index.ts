import { safeFetch } from "./safeFetch";
import { FredSeriesResponse } from "./types";
import { getMockFredSeries } from "./mock";

const BASE_URL = process.env.FRED_BASE_URL || "https://api.stlouisfed.org/fred";
const API_KEY = process.env.FRED_API_KEY;

if (!API_KEY) {
  console.warn("[FRED] No API key found; system will use mock mode.");
}

export async function getFredSeries(seriesId: string): Promise<FredSeriesResponse> {
  if (!API_KEY) {
    console.log(`[FRED] Mock mode for series: ${seriesId}`);
    return getMockFredSeries(seriesId);
  }

  if (!seriesId || typeof seriesId !== 'string') {
    console.error(`[FRED] Invalid series ID: ${seriesId}`);
    return getMockFredSeries(seriesId || 'unknown');
  }

  const encodedSeriesId = encodeURIComponent(seriesId);
  const url = `${BASE_URL}/series/observations?series_id=${encodedSeriesId}&api_key=${API_KEY}&file_type=json`;

  const result = await safeFetch<FredSeriesResponse>(url);

  if (!result.ok || !result.data) {
    console.warn(`[FRED] API failed for series ${seriesId}, using mock fallback. Result ok: ${result.ok}`);
    return getMockFredSeries(seriesId);
  }

  return result.data;
}
