declare namespace NodeJS {
  interface ProcessEnv {
    FRED_BASE_URL?: string;
    FRED_API_KEY?: string;
    FRED_REQUEST_TIMEOUT_MS?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
