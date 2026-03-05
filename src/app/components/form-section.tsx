import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    marketplaces: [] as string[]
  });

  const marketplaceOptions = [
    "Mercado Livre",
    "Shopee",
    "Amazon",
    "Magalu",
    "Outros"
  ];

  const handleCheckboxChange = (marketplace: string) => {
    setFormData(prev => ({
      ...prev,
      marketplaces: prev.marketplaces.includes(marketplace)
        ? prev.marketplaces.filter(m => m !== marketplace)
        : [...prev.marketplaces, marketplace]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Formulário enviado! Em produção, aqui seria integrado com sistema de agendamento.");
  };

  return (
    <section id="form-section" className="py-16 md:py-24 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Solicite sua análise estratégica
          </h2>
          <p className="text-base md:text-lg text-slate-300">
            Preencha os dados abaixo para agendar seu diagnóstico gratuito
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-900 text-base"
                placeholder="Seu nome"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-900 text-base"
                placeholder="seu@email.com"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-900 mb-2">
                WhatsApp *
              </label>
              <input
                type="tel"
                id="whatsapp"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-900 text-base"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Marketplaces */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Quais marketplaces você anuncia? *
              </label>
              <div className="space-y-3">
                {marketplaceOptions.map((marketplace) => (
                  <label 
                    key={marketplace}
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-200 hover:border-orange-300 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.marketplaces.includes(marketplace)}
                      onChange={() => handleCheckboxChange(marketplace)}
                      className="w-5 h-5 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-base text-slate-900 font-medium">
                      {marketplace}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full group bg-orange-600 hover:bg-orange-700 text-white font-bold text-base md:text-lg px-8 py-4 md:py-5 rounded-full shadow-xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                Agendar diagnóstico gratuito
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
