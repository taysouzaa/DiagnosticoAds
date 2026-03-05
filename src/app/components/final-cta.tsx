import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FinalCTA() {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-orange-100 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Se o conteúdo do vídeo fez sentido para você, 
            <span className="text-orange-600"> o próximo passo é aplicar isso diretamente na sua conta.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
            Agende sua análise estratégica agora.
          </p>
        </div>

        <button 
          onClick={scrollToForm}
          className="group bg-orange-600 hover:bg-orange-700 text-white font-bold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
        >
          Quero meu diagnóstico gratuito
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-sm text-slate-500 mt-6 md:mt-8">
          100% gratuito • Sem compromisso • Análise personalizada
        </p>
      </div>
    </section>
  );
}
