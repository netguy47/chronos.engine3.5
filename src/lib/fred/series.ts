import { getFredSeries } from "./index";

export const SERIES = {
  GDP: "GDP",
  UNEMPLOYMENT: "UNRATE",
  CPI: "CPIAUCSL",
  M2: "M2SL",
  FEDFUNDS: "FEDFUNDS",
  INDUSTRIAL_PRODUCTION: "INDPRO",
  VIX: "VIXCLS",
  YIELD_10YR: "DGS10",
  YIELD_2YR: "DGS2"
};

export async function getGdp() {
  return getFredSeries(SERIES.GDP);
}

export async function getUnemployment() {
  return getFredSeries(SERIES.UNEMPLOYMENT);
}

export async function getInflationCpi() {
  return getFredSeries(SERIES.CPI);
}

export async function getMoneySupply() {
  return getFredSeries(SERIES.M2);
}

export async function getIndustrialProduction() {
  return getFredSeries(SERIES.INDUSTRIAL_PRODUCTION);
}

export async function getYieldSpread10yr2yr() {
  const ten = await getFredSeries(SERIES.YIELD_10YR);
  const two = await getFredSeries(SERIES.YIELD_2YR);

  return {
    spread: (Number(ten.observations.at(-1)?.value) - Number(two.observations.at(-1)?.value)).toFixed(2),
    ten,
    two
  };
}
