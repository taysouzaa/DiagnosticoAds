import { Store, TrendingUp, BarChart3 } from "lucide-react";

export function AuthoritySection() {
  const marketplaces = [
    "Mercado Livre",
    "Shopee",
    "Amazon"
  ];

  const pillars = [
    {
      icon: BarChart3,
      text: "Foco exclusivo em performance"
    },
    {
      icon: Store,
      text: "Estrutura de campanhas"
    },
    {
      icon: TrendingUp,
      text: "Otimização de margem"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-lg md:text-xl text-slate-700 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Nossos especialistas analisam contas diariamente dentro de:
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-12">
            {marketplaces.map((marketplace, index) => (
              <div 
                key={index}
                className="bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-lg"
              >
                {marketplace}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={index}
                className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 md:p-8 text-center hover:border-orange-400 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <p className="font-semibold text-base md:text-lg text-slate-900">
                  {pillar.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl text-center">
          <p className="text-lg md:text-xl font-semibold text-white leading-relaxed">
            Estratégia aplicada na prática.
            <br className="md:hidden" />
            <span className="text-orange-500"> Baseada em dados reais.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
