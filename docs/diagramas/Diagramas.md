# Diagramas - DiagnosticoAds

Projeto: DiagnosticoAds  
Data: 19/03/2026  
Responsavel tecnico: Taynara Correia de Souza

## Diagrama 1 - Fluxo de usuario
```mermaid
flowchart TD
  A[Usuario acessa landing page] --> B[Clique no CTA]
  B --> C[Formulario]
  C --> D[Envio de payload para n8n]
  D --> E[Redirect para Google Calendar]
```

## Diagrama 2 - Fluxo de integracao
```mermaid
flowchart TD
  A[Front-end React] -->|POST text/plain| B[n8n Webhook]
  B --> C[Normalizacao de dados]
  C --> D[Google Sheets - Append Row]
```

## Diagrama 3 - Estrutura de componentes
```mermaid
flowchart TD
  App[App.tsx] --> Hero[HeroSection]
  App --> Analysis[AnalysisSection]
  App --> Authority[AuthoritySection]
  App --> Scarcity[ScarcitySection]
  App --> Form[FormSection]
```
