import { FredSeriesResponse } from "./types";

export function getMockFredSeries(seriesId: string): FredSeriesResponse {
  const today = new Date().toISOString().split("T")[0];

  return {
    realtime_start: today,
    realtime_end: today,
    observation_start: "2000-01-01",
    observation_end: today,
    units: "lin",
    series_id: seriesId,
    observations: [
      { date: "2023-01-01", value: "100" },
      { date: "2024-01-01", value: "105" },
      { date: today, value: "108" }
    ]
  };
}
