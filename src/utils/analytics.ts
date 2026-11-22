// Umami Cloud analytics: cookieless, no personal data.
// Set VITE_UMAMI_WEBSITE_ID (from the Umami Cloud dashboard) in the hosting env.
// Never send player names or other identifiable data in events.

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number | boolean>) => void };
  }
}

const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const SCRIPT_SRC = (import.meta.env.VITE_UMAMI_SCRIPT_URL as string | undefined) || 'https://cloud.umami.is/script.js';

export const initAnalytics = () => {
  if (!WEBSITE_ID || typeof document === 'undefined') return;
  if (document.querySelector('script[data-website-id]')) return;
  const s = document.createElement('script');
  s.defer = true;
  s.src = SCRIPT_SRC;
  s.setAttribute('data-website-id', WEBSITE_ID);
  s.setAttribute('data-domains', 'lickorlie.com,www.lickorlie.com');
  document.head.appendChild(s);
};

export const track = (event: string, data?: Record<string, string | number | boolean>) => {
  try {
    window.umami?.track(event, data);
  } catch {
    /* analytics must never break the game */
  }
};
