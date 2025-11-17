export async function safeFetch<T>(
  url: string,
  timeoutMs: number = Number(process.env.FRED_REQUEST_TIMEOUT_MS || 6000),
  retries: number = 2
): Promise<{ ok: boolean; data?: T }> {

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        signal: controller.signal
      });

      clearTimeout(timer);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = (await res.json()) as T;

      return { ok: true, data: json };

    } catch (err) {
      clearTimeout(timer);
      console.warn(`[safeFetch] Attempt ${attempt + 1} failed:`, err);

      if (attempt === retries) {
        return { ok: false };
      }
    }
  }

  return { ok: false };
}
