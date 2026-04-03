/**
 * Secao de formulario (captura de leads) com envio para webhook e redirecionamento.
 * Inclui selecao de marketplaces e validacoes basicas no front-end.
 */
import { useState } from "react";
import mercadoLivreLogo from "../assets/logos/mercado-livre.svg";
import shopeeLogo from "../assets/logos/shopee.png";
import amazonLogo from "../assets/logos/amazon.png";
import magaluLogo from "../assets/logos/magalu.png";
import { APP_CONFIG } from "../config/runtime";
import { getTrackingData } from "../lib/tracking";
import { formatWhatsapp, toDigits } from "../lib/whatsapp";

type MarketplaceOption = {
  id: string;
  label: string;
  logo?: string;
};

type FloatingLogo = {
  src: string;
  size: number;
  left: string;
  top: string;
  rotate: string;
  drift: string;
  duration: string;
  delay: string;
  opacity: number;
};

/**
 * Opcoes de marketplaces exibidas como botoes seletivos.
 * A opcao "Outros" nao possui logo e utiliza marcador visual simples.
 */
const marketplaceOptions: MarketplaceOption[] = [
  { id: "mercadolivre", label: "Mercado Livre", logo: mercadoLivreLogo },
  { id: "shopee", label: "Shopee", logo: shopeeLogo },
  { id: "amazon", label: "Amazon", logo: amazonLogo },
  { id: "magalu", label: "Magalu", logo: magaluLogo },
  { id: "outros", label: "Outros" },
];

// Mapa auxiliar para converter ids internos em labels legiveis no payload do webhook.
const marketplaceLabelsById = Object.fromEntries(
  marketplaceOptions.map((option) => [option.id, option.label]),
) as Record<string, string>;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  background: "rgba(18,24,32,0.85)",
  border: "1px solid var(--lp-border)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
  color: "var(--lp-text)",
  outline: "none",
  fontSize: "1rem",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

// Logos flutuantes para reforco visual em telas grandes.
const floatingLogos: FloatingLogo[] = [
  {
    src: amazonLogo,
    size: 96,
    left: "6%",
    top: "4%",
    rotate: "-8deg",
    drift: "18px",
    duration: "18s",
    delay: "0s",
    opacity: 0.8,
  },
  {
    src: shopeeLogo,
    size: 90,
    left: "86%",
    top: "10%",
    rotate: "10deg",
    drift: "-16px",
    duration: "20s",
    delay: "-4s",
    opacity: 0.85,
  },
  {
    src: mercadoLivreLogo,
    size: 120,
    left: "3%",
    top: "60%",
    rotate: "-6deg",
    drift: "16px",
    duration: "22s",
    delay: "-8s",
    opacity: 0.75,
  },
  {
    src: magaluLogo,
    size: 84,
    left: "90%",
    top: "64%",
    rotate: "8deg",
    drift: "-14px",
    duration: "24s",
    delay: "-12s",
    opacity: 0.78,
  },
];

/**
 * Aplica destaque visual de foco no campo do formulario.
 *
 * @param event - Evento de foco do input.
 * @returns void
 */
const handleFieldFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  event.currentTarget.style.borderColor = "rgba(186,255,0,0.6)";
  event.currentTarget.style.boxShadow = "0 0 0 3px rgba(186,255,0,0.12)";
};

/**
 * Restaura o estilo base do campo apos perder foco.
 *
 * @param event - Evento de blur do input.
 * @returns void
 */
const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
  event.currentTarget.style.borderColor = "var(--lp-border)";
  event.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.02)";
};

/**
 * Formulario principal com integracao n8n e redirecionamento para agenda.
 *
 * @returns JSX.Element
 */
export function FormSection() {
  const { calendarUrl, leadWebhookUrl } = APP_CONFIG;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Armazena apenas digitos para evitar problemas de edicao no mobile.
  const [whatsapp, setWhatsapp] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Alterna a selecao de marketplaces.
   *
   * @param id - Identificador do marketplace.
   * @returns void
   */
  const toggleMarketplace = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  /**
   * Envia o lead para o webhook do n8n e redireciona para o agendamento.
   *
   * @param event - Evento de submit do formulario.
   * @returns Promise<void>
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Timestamp local para registrar data e hora de entrada do lead.
      const now = new Date();
      const date = now.toLocaleDateString("pt-BR");
      const time = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Payload alinhado as colunas do Google Sheets (inclui espaco no final).
      const tracking = getTrackingData();
      const selectedLabels = selected.map((id) => marketplaceLabelsById[id] || id);
      const payload = {
        "Nome completo ": name,
        "E-mail": email,
        WhatsApp: formatWhatsapp(whatsapp),
        "Data de entrada de leads": date,
        Data: date,
        Hora: time,
        // Mantemos labels textuais para facilitar leitura/automacao no n8n e na planilha.
        "Quais marketplaces você anuncia": selectedLabels,
        Funil: "DiagnosticoAds",
        channel: tracking.channel,
        source: tracking.source,
        medium: tracking.medium,
        campaign: tracking.campaign,
        timestamp: new Date().toISOString(),
      };

      const body = JSON.stringify(payload);

      // Tenta enviar mesmo durante navegacao (mais confiavel no redirect).
      let sent = false;
      if (navigator.sendBeacon) {
        sent = navigator.sendBeacon(
          leadWebhookUrl,
          new Blob([body], { type: "text/plain;charset=UTF-8" }),
        );
      }

      if (!sent) {
        await Promise.race([
          // Alternativa via fetch em modo no-cors.
          fetch(leadWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=UTF-8" },
            body,
            mode: "no-cors",
            keepalive: true,
          }),
          // Evita travar o usuario caso o endpoint demore.
          new Promise((resolve) => setTimeout(resolve, 1200)),
        ]);
      }
    } catch {
      // Mesmo se falhar, seguimos o fluxo para o agendamento.
    } finally {
      // Redirecionamento para agenda apos envio (ou tentativa de envio).
      window.location.assign(calendarUrl);
    }
  };

  return (
    <section
      id="formulario"
      className="relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden"
      style={{ background: "var(--lp-bg)" }}
    >
      <style>{`
        @keyframes logo-fall {
          0% { transform: translate3d(0, -50px, 0) rotate(var(--rotation)); opacity: var(--opacity); }
          50% { transform: translate3d(calc(var(--drift) / 2), 60px, 0) rotate(var(--rotation)); opacity: var(--opacity); }
          100% { transform: translate3d(var(--drift), 160px, 0) rotate(var(--rotation)); opacity: var(--opacity); }
        }
      `}</style>

      <div className="absolute inset-0" style={{ background: "var(--lp-glow)" }} />
      <div
        className="absolute -top-24 right-[-120px] w-[420px] h-[420px] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(86,213,79,0.3), rgba(186,255,0,0.04) 60%)",
        }}
      />
      <div
        className="absolute -bottom-28 left-[-140px] w-[480px] h-[480px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, rgba(186,255,0,0.2), rgba(86,213,79,0.04) 65%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 3 }}>
        {floatingLogos.map((logo, index) => (
          <div
            key={`${logo.src}-${index}`}
            className="absolute"
            style={
              {
                top: logo.top,
                left: logo.left,
                width: logo.size,
                height: logo.size,
                opacity: logo.opacity,
                animation: "logo-fall var(--duration) linear infinite",
                animationDelay: "var(--delay)",
                filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.45))",
                ["--rotation" as string]: logo.rotate,
                ["--drift" as string]: logo.drift,
                ["--duration" as string]: logo.duration,
                ["--delay" as string]: logo.delay,
                ["--opacity" as string]: String(logo.opacity),
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <img src={logo.src} alt="" className="w-full h-full object-contain" style={{ opacity: 1 }} />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cabecalho */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
            style={{
              background: "rgba(186,255,0,0.1)",
              color: "var(--lp-accent)",
              border: "1px solid rgba(186,255,0,0.3)",
            }}
          >
            Formulário
          </span>
          <h2
            className="text-white"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, lineHeight: 1.25 }}
          >
            Solicite sua análise estratégica
          </h2>
          <p className="mt-3" style={{ color: "var(--lp-muted-2)", fontSize: "1rem" }}>
            Preencha abaixo e nossa equipe entrará em contato em até 24h.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative p-6 sm:p-7 md:p-10 rounded-3xl overflow-hidden max-w-2xl mx-auto"
          style={{
            background: "linear-gradient(135deg, rgba(28,36,45,0.95) 0%, rgba(20,26,32,0.98) 100%)",
            border: "1px solid rgba(186,255,0,0.25)",
            boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, var(--lp-accent), transparent)" }}
          />

          {/* Nome */}
          <div className="mb-5">
            <label className="block mb-2 text-white" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              Nome completo <span style={{ color: "var(--lp-accent)" }}>*</span>
            </label>
            <input
              type="text"
              required
              autoComplete="name"
              placeholder="Seu nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
              style={inputStyle}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
          </div>

          {/* E-mail */}
          <div className="mb-5">
            <label className="block mb-2 text-white" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              E-mail <span style={{ color: "var(--lp-accent)" }}>*</span>
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={inputStyle}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
          </div>

          {/* WhatsApp */}
          <div className="mb-7">
            <label className="block mb-2 text-white" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              WhatsApp <span style={{ color: "var(--lp-accent)" }}>*</span>
            </label>
            <input
              type="tel"
              required
              autoComplete="tel"
              inputMode="numeric"
              placeholder="(11) 99999-9999"
              value={formatWhatsapp(whatsapp)}
              onChange={(event) => setWhatsapp(toDigits(event.target.value))}
              style={inputStyle}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
            />
          </div>

          {/* Marketplaces (selecao) */}
          <div className="mb-8">
            <label className="block mb-3 text-white" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              Quais marketplaces você anuncia? <span style={{ color: "var(--lp-accent)" }}>*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {marketplaceOptions.map((marketplace) => {
                const isSelected = selected.includes(marketplace.id);
                return (
                  <button
                    type="button"
                    key={marketplace.id}
                    onClick={() => toggleMarketplace(marketplace.id)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                    style={{
                      background: isSelected ? "rgba(186,255,0,0.12)" : "rgba(18,24,32,0.9)",
                      border: isSelected
                        ? "1.5px solid rgba(186,255,0,0.9)"
                        : "1.5px solid rgba(255,255,255,0.08)",
                      color: isSelected ? "var(--lp-accent)" : "var(--lp-muted)",
                      boxShadow: isSelected ? "0 10px 20px rgba(0,0,0,0.25)" : "none",
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: "0.9rem",
                    }}
                  >
                    {marketplace.logo ? (
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <img src={marketplace.logo} alt={marketplace.label} className="h-5 w-auto" />
                      </div>
                    ) : (
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: isSelected ? "var(--lp-accent)" : "#2D3D4A" }}
                      />
                    )}
                    {marketplace.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Envio */}
          <button
            type="submit"
            disabled={loading || selected.length === 0}
            className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "var(--lp-accent)",
              color: "var(--lp-bg)",
              fontSize: "1.1rem",
              fontWeight: 700,
              boxShadow: "0 0 36px rgba(186,255,0,0.35), 0 12px 30px rgba(0,0,0,0.35)",
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="var(--lp-bg)" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="var(--lp-bg)"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>Agendar diagnóstico gratuito</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          {/* Aviso de privacidade */}
          <p className="text-center mt-4" style={{ color: "var(--lp-muted-2)", fontSize: "0.8rem" }}>
            DiagnósticoAds | Método P4
          </p>
        </form>
      </div>
    </section>
  );
}
