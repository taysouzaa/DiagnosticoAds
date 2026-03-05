import { Clock, Users } from "lucide-react";

export function ScarcitySection() {
  return (
    <section className="py-16 md:py-20 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-10 rounded-2xl border-2 border-orange-500 shadow-2xl">
          <div className="flex items-start gap-4 md:gap-5 mb-6">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                Vagas limitadas por dia
              </h3>
              <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                Para garantir profundidade na análise, liberamos apenas 
                <span className="font-bold text-orange-500"> 3 horários por dia</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 md:gap-5 pt-4 border-t border-slate-700">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 md:w-7 md:h-7 text-orange-500" />
            </div>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed pt-2">
              Quando as agendas fecham, novas vagas são abertas conforme disponibilidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
