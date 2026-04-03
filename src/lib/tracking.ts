/**
 * Utilitarios de leitura de tracking salvo no navegador.
 */

export type TrackingData = {
  channel: string;
  source: string;
  medium: string;
  campaign: string;
};

const TRACKING_STORAGE_KEY = "diagnosticoads:tracking";

// Valores padrao aplicados quando ainda nao existe tracking persistido.
const DEFAULT_TRACKING: TrackingData = {
  channel: "direto",
  source: "direto",
  medium: "none",
  campaign: "none",
};

/**
 * Recupera os dados de tracking armazenados pelo script de origem.
 * Em cenarios SSR ou falha de parse, retorna fallback padrao.
 *
 * @returns Objeto com canal e UTMs usados no envio de lead.
 */
export const getTrackingData = (): TrackingData => {
  if (typeof window === "undefined") return { ...DEFAULT_TRACKING };
  try {
    const raw = window.localStorage.getItem(TRACKING_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_TRACKING };
    const parsed = JSON.parse(raw) as Partial<TrackingData>;
    return {
      channel: parsed.channel || DEFAULT_TRACKING.channel,
      source: parsed.source || DEFAULT_TRACKING.source,
      medium: parsed.medium || DEFAULT_TRACKING.medium,
      campaign: parsed.campaign || DEFAULT_TRACKING.campaign,
    };
  } catch {
    return { ...DEFAULT_TRACKING };
  }
};
