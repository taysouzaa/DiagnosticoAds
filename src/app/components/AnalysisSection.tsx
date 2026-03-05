const items = [
  {
    num: "01",
    title: "Distribuição da verba por campanhas",
    desc: "Onde seu orçamento está concentrado e o que precisa ajustar.",
  },
  {
    num: "02",
    title: "Campanhas que travam sua escala",
    desc: "Gargalos de segmentação, criativo e orçamento.",
  },
  {
    num: "03",
    title: "Estrutura alinhada ao seu faturamento",
    desc: "Se o setup atual suporta o nível de vendas que você tem hoje.",
  },
  {
    num: "04",
    title: "Pontos de desperdício de investimento",
    desc: "Canais e termos com baixa eficiência.",
  },
  {
    num: "05",
    title: "Ajustes práticos de performance",
    desc: "Prioridades claras para executar rápido e melhorar resultado.",
  },
];

export function AnalysisSection() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6" style={{ background: "var(--lp-bg)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4"
            style={{
              background: "rgba(186,255,0,0.12)",
              color: "var(--lp-accent)",
              border: "1px solid rgba(186,255,0,0.35)",
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--lp-accent)" }} />
            O que será analisado
          </span>
          <h2
            className="text-white"
          style={{ fontSize: "clamp(1.6rem, 4.2vw, 2.4rem)", fontWeight: 800, lineHeight: 1.2 }}
        >
          Durante a chamada estratégica você vai descobrir{" "}
          <span style={{ color: "var(--lp-accent)" }}>exatamente</span>:
        </h2>
        <p
          className="mt-3"
          style={{ color: "var(--lp-muted)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.7 }}
        >
          Diagnóstico claro, direto ao ponto e com ações práticas para aplicar no mesmo dia.
        </p>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 max-w-5xl mx-auto mb-12 text-left">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3"
            >
              <span className="mt-1 w-4 flex-shrink-0" style={{ color: "var(--lp-accent-2)" }}>✓</span>
              <p style={{ color: "var(--lp-muted)", fontSize: "1rem", lineHeight: 1.7 }}>
                <span style={{ color: "var(--lp-text)", fontWeight: 600 }}>{item.title}</span>
                {" — "}
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Reinforcement phrase */}
        <div
          className="max-w-3xl mx-auto p-6 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(186,255,0,0.12), rgba(86,213,79,0.06))",
            border: "1px solid rgba(186,255,0,0.35)",
          }}
        >
          <svg className="mx-auto mb-3" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="var(--lp-accent-2)" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <p
            className="text-white"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 700, lineHeight: 1.5 }}
        >
          Você sai com{" "}
          <span style={{ color: "var(--lp-accent)" }}>direcionamento claro</span> e{" "}
          <span style={{ color: "var(--lp-accent)" }}>prioridades definidas.</span>
        </p>
        </div>
      </div>
    </section>
  );
}
