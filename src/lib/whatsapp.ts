/**
 * Helpers para normalizacao e exibicao do numero de WhatsApp.
 */

const MAX_WHATSAPP_DIGITS = 11;

/**
 * Mantem apenas digitos e limita ao formato brasileiro (DDD + 9 digitos).
 *
 * @param value - Valor digitado pelo usuario no campo de telefone.
 * @returns String contendo apenas digitos validos para persistencia no estado.
 */
export const toDigits = (value: string) => value.replace(/\D/g, "").slice(0, MAX_WHATSAPP_DIGITS);

/**
 * Aplica mascara visual de WhatsApp sem alterar o valor base armazenado.
 *
 * @param digits - Sequencia numerica sem mascara.
 * @returns Numero formatado para exibicao no input.
 */
export const formatWhatsapp = (digits: string) => {
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};
