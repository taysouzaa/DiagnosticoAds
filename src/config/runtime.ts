/**
 * Configuracoes de runtime da landing page.
 * Permite override por variaveis de ambiente sem alterar codigo.
 */

const DEFAULT_CALENDAR_URL = "https://calendar.app.google/zaNXcV4By3HUQuc88";
const DEFAULT_LEAD_WEBHOOK_URL = "https://n8n.srv1095468.hstgr.cloud/webhook/DiagnosticoAds";

const readEnvString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};

export const APP_CONFIG = Object.freeze({
  calendarUrl: readEnvString(import.meta.env.VITE_CALENDAR_URL) || DEFAULT_CALENDAR_URL,
  leadWebhookUrl:
    readEnvString(import.meta.env.VITE_LEAD_WEBHOOK_URL) || DEFAULT_LEAD_WEBHOOK_URL,
});
