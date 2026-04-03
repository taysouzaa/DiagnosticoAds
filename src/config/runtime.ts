/**
 * Configuracoes de runtime da landing page.
 * Permite override por variaveis de ambiente sem alterar codigo.
 */

// URL padrão de redirecionamento pós-conversão (Google Calendar).
const DEFAULT_CALENDAR_URL = "https://calendar.app.google/zaNXcV4By3HUQuc88";
// Webhook padrão do n8n para captura de leads.
const DEFAULT_LEAD_WEBHOOK_URL = "https://n8n.srv1095468.hstgr.cloud/webhook/DiagnosticoAds";

/**
 * Normaliza um valor vindo do ambiente e garante string utilizável.
 *
 * @param value - Valor bruto recebido de import.meta.env.
 * @returns A string normalizada ou null quando ausente/inválida.
 */
const readEnvString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};

/**
 * Configuração imutável consumida pela aplicação.
 * Prioriza variáveis de ambiente e aplica fallback seguro para produção.
 */
export const APP_CONFIG = Object.freeze({
  calendarUrl: readEnvString(import.meta.env.VITE_CALENDAR_URL) || DEFAULT_CALENDAR_URL,
  leadWebhookUrl:
    readEnvString(import.meta.env.VITE_LEAD_WEBHOOK_URL) || DEFAULT_LEAD_WEBHOOK_URL,
});
