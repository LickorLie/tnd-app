// Game events -> Google Analytics 4 (already loaded in index.html).
// Never send player names or other identifiable data.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const track = (event: string, data?: Record<string, string | number | boolean>) => {
  try {
    window.gtag?.('event', event, data ?? {});
  } catch {
    /* analytics must never break the game */
  }
};
