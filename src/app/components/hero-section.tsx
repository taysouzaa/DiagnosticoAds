import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6 md:space-y-8">
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Você assistiu ao vídeo.
            <br />
            <span className="text-orange-500">Agora vamos aplicar isso</span>
            <br />
            na sua conta.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Receba um diagnóstico estratégico gratuito para identificar onde seus Ads no 
            <span className="font-semibold text-white"> Mercado Livre, Shopee ou Amazon </span>
            estão limitando sua escala.
          </p>

          {/* Microcopy */}
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Indicado para vendedores que já investem em anúncios e querem aumentar eficiência e margem.
          </p>

          {/* CTA Principal */}
          <div className="pt-4 md:pt-6">
            <button 
              onClick={scrollToForm}
              className="group bg-orange-600 hover:bg-orange-700 text-white font-bold text-base md:text-lg px-8 md:px-12 py-4 md:py-5 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
            >
              Quero minha análise estratégica gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
