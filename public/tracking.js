// tracking.js - utilitario simples para paginas HTML estaticas
(() => {
  const STORAGE_KEY = "diagnosticoads:utm";
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

  // Permite override via window.TRACKING_WEBHOOK_URL
  const WEBHOOK_URL =
    (typeof window !== "undefined" && window.TRACKING_WEBHOOK_URL) ||
    "https://n8n.srv1095468.hstgr.cloud/webhook/track";

  const isBrowser = () => typeof window !== "undefined";

  const parseUtmFromUrl = () => {
    if (!isBrowser()) return {};
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) utm[key] = value;
    });
    return utm;
  };

  const loadStoredUtm = () => {
    if (!isBrowser()) return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const saveUtm = (utm) => {
    if (!isBrowser()) return;
    const hasAny = UTM_KEYS.some((key) => Boolean(utm[key]));
    if (!hasAny) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    } catch {
      // Silencioso
    }
  };

  const initTracking = () => {
    const fromUrl = parseUtmFromUrl();
    const stored = loadStoredUtm();
    const merged = { ...stored, ...fromUrl };
    if (Object.keys(fromUrl).length > 0) saveUtm(merged);
    return merged;
  };

  const buildPayload = (eventName) => {
    const utm = loadStoredUtm();
    return {
      source: utm.utm_source || "direct",
      medium: utm.utm_medium || "none",
      campaign: utm.utm_campaign || "none",
      content: utm.utm_content || "none",
      event: eventName,
      url: isBrowser() ? window.location.href : "",
      timestamp: new Date().toISOString(),
    };
  };

  const sendToWebhook = (payload) => {
    if (!WEBHOOK_URL) return;
    const body = JSON.stringify(payload);

    try {
      if (navigator.sendBeacon) {
        const sent = navigator.sendBeacon(
          WEBHOOK_URL,
          new Blob([body], { type: "text/plain;charset=UTF-8" })
        );
        if (sent) return;
      }
    } catch {
      // fallback abaixo
    }

    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        mode: "no-cors",
        keepalive: true,
      });
    } catch {
      // Silencioso
    }
  };

  const trackEvent = (eventName) => {
    if (!isBrowser()) return;
    const payload = buildPayload(eventName);
    sendToWebhook(payload);
  };

  window.Tracking = {
    init: initTracking,
    track: trackEvent,
  };
})();
