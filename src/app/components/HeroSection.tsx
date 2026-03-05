export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-16 md:py-20 text-center"
      style={{
        background: "var(--lp-bg)",
      }}
    >
      <div className="absolute inset-0 opacity-40" style={{ background: "var(--lp-glow)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p
          className="mb-6 uppercase tracking-[0.4em]"
          style={{ color: "var(--lp-muted-2)", fontSize: "0.75rem", letterSpacing: "0.35em" }}
        >
          Diagnóstico Ads
        </p>

        <h1
          className="text-white mx-auto"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: "820px",
          }}
        >
          Se o conteúdo do vídeo fez sentido para você,{" "}
          <span style={{ color: "var(--lp-accent)" }}>o próximo passo é aplicar isso</span> diretamente em sua conta.
        </h1>

        <p
          className="mt-6 mx-auto"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
            color: "var(--lp-muted)",
            lineHeight: 1.7,
            maxWidth: "640px",
          }}
        >
          Receba um diagnóstico estratégico gratuito para identificar onde seus anúncios no Mercado Livre, Shopee ou Amazon estão limitando sua escala.
        </p>

        <div className="relative mt-8 md:mt-10 inline-flex">
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl"
            style={{ background: "rgba(186,255,0,0.22)" }}
          />
          <button
            onClick={scrollToForm}
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 cursor-pointer"
            style={{
              background: "var(--lp-accent)",
              color: "var(--lp-bg)",
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              fontWeight: 700,
              boxShadow: "0 0 28px rgba(186,255,0,0.35), 0 8px 26px rgba(0,0,0,0.45)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.background = "#C6FF2E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.background = "var(--lp-accent)";
            }}
          >
            <span>Agendar diagnóstico gratuito</span>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-5 md:gap-6">
          {["Gratuito, sem pegadinha", "Análise real por especialistas", "Resultado aplicável imediatamente"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg width="14" height="14" fill="var(--lp-accent-2)" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span style={{ fontSize: "0.9rem", color: "var(--lp-muted-2)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
