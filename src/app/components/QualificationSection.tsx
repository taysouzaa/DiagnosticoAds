const items = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--lp-accent-2)" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Já investe em anúncios",
    desc: "Você tem campanhas rodando mas sente que poderia extrair mais resultado com o mesmo orçamento.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--lp-accent-2)" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "Já gera vendas dentro do marketplace",
    desc: "Sua operação está funcionando, mas a escalabilidade ainda parece um obstáculo.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--lp-accent-2)" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Quer escalar com previsibilidade",
    desc: "Você quer crescer de forma estruturada, com dados e estratégia, não na base do improviso.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--lp-accent-2)" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Quer entender onde está perdendo margem",
    desc: "Você vende, mas a margem some e quer descobrir exatamente onde está o desperdício.",
  },
];

export function QualificationSection() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6" style={{ background: "var(--lp-bg)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-white"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, lineHeight: 1.25 }}
          >
            Essa análise é para você que:
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl transition-all duration-300 group cursor-default"
              style={{
                background: "var(--lp-bg)",
                border: "1px solid rgba(86,213,79,0.12)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(186,255,0,0.4)";
                (e.currentTarget as HTMLDivElement).style.background = "#243040";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(86,213,79,0.12)";
                (e.currentTarget as HTMLDivElement).style.background = "var(--lp-bg)";
              }}
            >
              {/* Icon container */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(86,213,79,0.1)" }}
              >
                {item.icon}
              </div>
              {/* Content */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" fill="var(--lp-accent-2)" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-white" style={{ fontWeight: 700, fontSize: "1rem" }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ color: "var(--lp-muted-2)", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
