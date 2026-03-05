export function FinalCTASection() {
  return (
    <section
      className="relative min-h-[100svh] px-4 sm:px-6 py-16 md:py-20 overflow-hidden flex items-center justify-center"
      style={{ background: "var(--lp-bg)" }}
    >
      {/* Accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(186,255,0,0.5) 50%, transparent 100%)" }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--lp-accent)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        <h2
          className="text-white mb-5"
        style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.6rem)", fontWeight: 800, lineHeight: 1.25 }}
      >
          Obrigado por confiar no <span style={{ color: "var(--lp-accent)" }}>DiagnósticoAds</span>.
        </h2>

        <p
          className="mx-auto"
          style={{
            color: "var(--lp-muted)",
            fontSize: "clamp(1rem, 2.4vw, 1.2rem)",
            lineHeight: 1.8,
            maxWidth: "720px",
          }}
        >
          Nosso time vai analisar sua operação e entregar um caminho claro para ganhar escala com
          eficiência. Você recebe prioridades objetivas, sem promessas vazias.
        </p>
      </div>
    </section>
  );
}
