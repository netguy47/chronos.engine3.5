import { getGdp, getUnemployment, getInflationCpi, getMoneySupply, getIndustrialProduction, getYieldSpread10yr2yr } from "./series";
import { getLatestValue } from "./normalize";

export async function getMacroSnapshot() {
  try {
    const [gdp, unemployment, cpi, moneySupply, industrialProduction, yieldSpread] = await Promise.all([
      getGdp(),
      getUnemployment(),
      getInflationCpi(),
      getMoneySupply(),
      getIndustrialProduction(),
      getYieldSpread10yr2yr()
    ]);

    return {
      gdp: {
        latest: getLatestValue(gdp),
        series: gdp
      },
      unemployment: {
        latest: getLatestValue(unemployment),
        series: unemployment
      },
      inflation: {
        latest: getLatestValue(cpi),
        series: cpi
      },
      moneySupply: {
        latest: getLatestValue(moneySupply),
        series: moneySupply
      },
      industrialProduction: {
        latest: getLatestValue(industrialProduction),
        series: industrialProduction
      },
      yieldSpread: {
        spread: yieldSpread.spread,
        tenYear: getLatestValue(yieldSpread.ten),
        twoYear: getLatestValue(yieldSpread.two),
        series: yieldSpread
      }
    };
  } catch (error) {
    console.error("Failed to fetch macro snapshot:", error);
    throw error;
  }
}
