type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;

  const analyticsWindow = window as AnalyticsWindow;
  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', name, params);
    return;
  }

  analyticsWindow.dataLayer?.push({ event: name, ...params });
}
