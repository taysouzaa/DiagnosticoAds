import { Target, TrendingUp, AlertCircle, Zap, CheckSquare } from "lucide-react";

export function AnalysisSection() {
  const analysisPoints = [
    {
      icon: Target,
      text: "Como sua verba está distribuída entre campanhas"
    },
    {
      icon: AlertCircle,
      text: "Quais campanhas estão travando sua escala"
    },
    {
      icon: TrendingUp,
      text: "Se sua estrutura está adequada ao seu nível de faturamento"
    },
    {
      icon: Zap,
      text: "Pontos de desperdício de investimento"
    },
    {
      icon: CheckSquare,
      text: "Ajustes práticos para melhorar performance"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 text-center mb-12 md:mb-16">
          Durante a call estratégica você vai descobrir:
        </h2>

        <div className="space-y-4 md:space-y-5 max-w-3xl mx-auto mb-12">
          {analysisPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-5 md:p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </div>
                <p className="text-base md:text-lg text-slate-700 font-medium pt-2">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 md:p-8 rounded-2xl text-center max-w-3xl mx-auto shadow-xl">
          <p className="text-lg md:text-xl font-semibold text-white">
            Você sai com direcionamento claro e prioridades definidas.
          </p>
        </div>
      </div>
    </section>
  );
}
