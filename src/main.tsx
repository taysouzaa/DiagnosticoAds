/**
 * Ponto de entrada da aplicação.
 * Monta o React no elemento raiz e carrega o CSS global.
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { initTracking, trackEvent } from "./services/tracking";

// Inicializa tracking (captura UTMs) e registra o carregamento da pagina.
initTracking();
trackEvent("page_load", { path: window.location.pathname });

// Inicializa o React no elemento #root definido no HTML.
createRoot(document.getElementById("root")!).render(<App />);
