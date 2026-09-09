const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function gaId() {
  return GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID) ? GA_ID : "";
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !gaId()) return;
  window.gtag?.("event", name, params ?? {});
}
