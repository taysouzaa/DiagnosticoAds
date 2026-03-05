import { HeroSection } from "./components/HeroSection";
import { AnalysisSection } from "./components/AnalysisSection";
import { AuthoritySection } from "./components/AuthoritySection";
import { ScarcitySection } from "./components/ScarcitySection";
import { FormSection } from "./components/FormSection";

export default function App() {
  return (
    <div className="w-full min-h-screen" style={{ background: "var(--lp-bg)", fontFamily: "'Inter', sans-serif" }}>
      {/* Bloco 1 – Hero */}
      <HeroSection />

      {/* Bloco 3 – O que será analisado */}
      <AnalysisSection />

      {/* Bloco 4 – Autoridade */}
      <AuthoritySection />

      {/* Bloco 5 – Escassez Controlada */}
      <ScarcitySection />

      {/* Bloco 6 – Formulário Estratégico */}
      <FormSection />

      {/* Footer minimal */}
      <footer
        className="text-center py-6 px-5"
        style={{ background: "var(--lp-bg)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-4xl mx-auto">
          <p style={{ color: "var(--lp-muted-2)", fontSize: "0.75rem", marginTop: "2px" }}>
            © {new Date().getFullYear()} Método P4. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
