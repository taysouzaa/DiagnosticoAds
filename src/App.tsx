/**
 * App principal da landing page DiagnósticoAds.
 * Organiza a sequência de seções e o rodapé da aplicação.
 */
import { HeroSection } from "./sections/HeroSection";
import { AnalysisSection } from "./sections/AnalysisSection";
import { AuthoritySection } from "./sections/AuthoritySection";
import { ScarcitySection } from "./sections/ScarcitySection";
import { FormSection } from "./sections/FormSection";

/**
 * Componente raiz da aplicação.
 *
 * @returns JSX.Element
 */
export default function App() {
  return (
    <div
      className="w-full min-h-screen"
      style={{ background: "var(--lp-bg)", fontFamily: "'Inter', sans-serif" }}
    >
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

      {/* Rodapé minimalista */}
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
