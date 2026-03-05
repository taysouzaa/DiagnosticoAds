import { CheckCircle2 } from "lucide-react";

export function QualificationSection() {
  const qualifications = [
    "Já investe em anúncios",
    "Já gera vendas dentro do marketplace",
    "Quer escalar com previsibilidade",
    "Quer entender onde está perdendo margem"
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 text-center mb-12 md:mb-16">
          Essa análise é para você que:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {qualifications.map((item, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
            >
              <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-orange-600 flex-shrink-0 mt-1" />
              <p className="text-base md:text-lg text-slate-800 font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
