/**
 * Servico centralizado de rastreamento de eventos e UTMs.
 * Registra eventos no console em formato JSON e envia (opcionalmente)
 * para um webhook externo configurado via VITE_TRACKING_WEBHOOK_URL.
 */

type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  captured_at?: string;
};

type TrackingPayload = {
  event: string;
  ts: string;
  url: string;
  path: string;
  referrer: string | null;
  utm: UtmParams;
  data: Record<string, unknown>;
};

const STORAGE_KEY = "diagnosticoads:utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
// URL do webhook de tracking (ex.: n8n). Mantida em variavel de ambiente.
const TRACKING_WEBHOOK_URL =
  (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_TRACKING_WEBHOOK_URL || "";

const isBrowser = () => typeof window !== "undefined";

const parseUtmFromUrl = (): UtmParams => {
  if (!isBrowser()) return {};
  const params = new URLSearchParams(window.location.search);
  const utm: UtmParams = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
    }
  });

  return utm;
};

const persistUtm = (utm: UtmParams) => {
  if (!isBrowser()) return;
  const hasAny = UTM_KEYS.some((key) => Boolean(utm[key]));
  if (!hasAny) return;

  try {
    const payload: UtmParams = {
      ...utm,
      captured_at: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Silencioso para nao interromper o fluxo do usuario.
  }
};

const getStoredUtm = (): UtmParams => {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
};

/**
 * Retorna as UTMs persistidas (se existirem).
 *
 * @returns UtmParams
 */
export const getUtmParams = (): UtmParams => getStoredUtm();

/**
 * Inicializa o tracking capturando UTMs da URL (se existirem).
 *
 * @returns UtmParams
 */
export const initTracking = (): UtmParams => {
  const utm = parseUtmFromUrl();
  persistUtm(utm);
  return getStoredUtm();
};

const logEvent = (payload: TrackingPayload) => {
  // Log em JSON para facilitar ingestao futura.
  console.log(JSON.stringify(payload));
};

// Integracoes futuras (stubs):
const sendToGoogleAnalytics = (_payload: TrackingPayload) => {};
const sendToMetaPixel = (_payload: TrackingPayload) => {};
const sendToWebhook = async (payload: TrackingPayload) => {
  if (!TRACKING_WEBHOOK_URL) return;
  const body = JSON.stringify(payload);

  // Tenta enviar mesmo durante navegacao.
  let sent = false;
  if (navigator.sendBeacon) {
    sent = navigator.sendBeacon(
      TRACKING_WEBHOOK_URL,
      new Blob([body], { type: "text/plain;charset=UTF-8" })
    );
  }

  if (!sent) {
    await Promise.race([
      fetch(TRACKING_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        mode: "no-cors",
        keepalive: true,
      }),
      new Promise((resolve) => setTimeout(resolve, 1200)),
    ]);
  }
};

/**
 * Dispara evento de tracking com dados adicionais.
 *
 * @param eventName - Nome do evento.
 * @param data - Dados adicionais (nao sensiveis).
 * @returns void
 */
export const trackEvent = (eventName: string, data: Record<string, unknown> = {}) => {
  if (!isBrowser()) return;

  try {
    const payload: TrackingPayload = {
      event: eventName,
      ts: new Date().toISOString(),
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer || null,
      utm: getStoredUtm(),
      data,
    };

    logEvent(payload);

    // Preparado para integracoes futuras.
    sendToGoogleAnalytics(payload);
    sendToMetaPixel(payload);
    sendToWebhook(payload);
  } catch {
    // Silencioso para nao quebrar o fluxo principal.
  }
};
