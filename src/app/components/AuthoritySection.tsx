import especialistasImg from "../../assets/especialistas.png";
import mercadoLivreLogo from "../../assets/logos/mercado-livre.svg";
import shopeeLogo from "../../assets/logos/shopee.png";
import amazonLogo from "../../assets/logos/amazon.png";

const marketplaces = [
  {
    name: "Mercado Livre",
    logo: mercadoLivreLogo,
    alt: "Mercado Livre",
  },
  {
    name: "Shopee",
    logo: shopeeLogo,
    alt: "Shopee",
  },
  {
    name: "Amazon",
    logo: amazonLogo,
    alt: "Amazon",
  },
];

export function AuthoritySection() {
  return (
    <section className="relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden" style={{ background: "var(--lp-bg)" }}>
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(600px circle at 20% 20%, rgba(186,255,0,0.12), transparent 60%), radial-gradient(500px circle at 80% 0%, rgba(86,213,79,0.1), transparent 55%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-10 items-center">
          {/* Specialists photo (left) */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
              <div
                className="absolute -bottom-6 left-10 right-10 h-10 rounded-full blur-2xl"
                style={{ background: "rgba(0,0,0,0.55)" }}
              />
              <img
                src={especialistasImg}
                alt="Especialistas em Ads"
                className="relative w-full"
                style={{ filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.5))" }}
              />
              <div
                className="absolute -bottom-1 left-0 right-0 h-8"
                style={{
                  background: "linear-gradient(180deg, rgba(32,44,54,0) 0%, rgba(32,44,54,0.9) 100%)",
                }}
              />
            </div>
          </div>

          {/* Content (right) */}
          <div className="text-center">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
              style={{
                background: "rgba(186,255,0,0.1)",
                color: "var(--lp-accent)",
                border: "1px solid rgba(186,255,0,0.3)",
              }}
            >
              Especialistas 
            </span>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, lineHeight: 1.25 }}
            >
              Nossos especialistas analisam contas{" "}
              <span style={{ color: "var(--lp-accent)" }}>diariamente</span> dentro de:
            </h2>

            {/* Marketplace logos */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
              {marketplaces.map((m) => (
                <div
                  key={m.name}
                  className="relative flex items-center justify-center px-7 py-4 rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(27,36,45,0.95) 0%, rgba(22,30,38,0.98) 100%)",
                    border: "1px solid rgba(186,255,0,0.22)",
                    boxShadow: "0 18px 32px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.03)",
                  }}
                >
                  <div
                    className="absolute -top-6 -right-6 w-16 h-16 rounded-full"
                    style={{ background: "rgba(186,255,0,0.2)", filter: "blur(8px)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(120px circle at 20% 20%, rgba(255,255,255,0.06), transparent 60%)" }}
                  />
                  <img src={m.logo} alt={m.alt} className="relative h-9 w-auto" />
                </div>
              ))}
            </div>

            {/* Content replacement */}
            <p className="text-center" style={{ color: "var(--lp-muted)", fontSize: "1rem", lineHeight: 1.7 }}>
              Entregamos uma leitura completa da sua operação com foco em performance: identificamos gargalos,
              oportunidades de escala e um plano de ação claro para aplicar imediatamente.
            </p>
            <ul className="mt-4 space-y-2 text-center" style={{ color: "var(--lp-muted-2)", fontSize: "0.95rem" }}>
              <li className="flex items-start justify-center gap-2">
                <span className="mt-1 flex-shrink-0" style={{ color: "var(--lp-accent-2)" }}>✓</span>
                <span className="leading-relaxed">Diagnóstico de estrutura, verba e rentabilidade por canal.</span>
              </li>
              <li className="flex items-start justify-center gap-2">
                <span className="mt-1 flex-shrink-0" style={{ color: "var(--lp-accent-2)" }}>✓</span>
                <span className="leading-relaxed">Prioridades de otimização com impacto direto em margem.</span>
              </li>
              <li className="flex items-start justify-center gap-2">
                <span className="mt-1 flex-shrink-0" style={{ color: "var(--lp-accent-2)" }}>✓</span>
                <span className="leading-relaxed">Recomendações práticas para executar nos próximos 7 dias.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
