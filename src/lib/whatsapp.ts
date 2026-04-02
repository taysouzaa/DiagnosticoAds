/**
 * Helpers para normalizacao e exibicao do numero de WhatsApp.
 */

const MAX_WHATSAPP_DIGITS = 11;

export const toDigits = (value: string) => value.replace(/\D/g, "").slice(0, MAX_WHATSAPP_DIGITS);

export const formatWhatsapp = (digits: string) => {
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};
