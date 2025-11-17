export interface FredObservation {
  date: string;
  value: string;
}

export interface FredSeriesResponse {
  realtime_start: string;
  realtime_end: string;
  observation_start: string;
  observation_end: string;
  units: string;
  series_id: string;
  observations: FredObservation[];
}
