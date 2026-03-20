/**
 * Ponto de entrada da aplicação.
 * Monta o React no elemento raiz e carrega o CSS global.
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

// Inicializa o React no elemento #root definido no HTML.
createRoot(document.getElementById("root")!).render(<App />);
