/**
 * Ponto de entrada da aplicação.
 * Monta o React no elemento raiz e carrega o CSS global.
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { initTracking, trackEvent } from "./services/tracking";

// Evita duplicar tracking caso o HTML ja tenha inicializado.
const win = window as typeof window & { __trackingInitDone?: boolean };
if (!win.__trackingInitDone) {
  initTracking();
  trackEvent("page_load", { path: window.location.pathname });
  win.__trackingInitDone = true;
}

// Inicializa o React no elemento #root definido no HTML.
createRoot(document.getElementById("root")!).render(<App />);
