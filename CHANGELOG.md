# Changelog

Todas as mudanças relevantes deste projeto são documentadas aqui.

Este histórico segue Semantic Versioning (`MAJOR.MINOR.PATCH`).

## [0.2.0] - 2026-04-02

### Added

- Camada de configuração de runtime em `src/config/runtime.ts`.
- Utilitário de tracking em `src/lib/tracking.ts`.
- Utilitário de telefone/WhatsApp em `src/lib/whatsapp.ts`.
- Arquivo `.env.example` para configuração de ambiente.
- Revisão técnica completa em `docs/engenharia-revisao-2026-04-02.md`.
- Diagramas técnicos (Mermaid + PlantUML) em `docs/diagramas-mermaid-2026-04-02.md`.

### Changed

- Refatoração segura de `src/sections/FormSection.tsx` para reduzir acoplamento e duplicação.
- Ajuste de chave estável em `src/sections/AnalysisSection.tsx`.
- Atualização de `ads.html` e `index.html` para `lang="pt-BR"` e `meta description`.
- Reescrita do `README.md` com padrão profissional.
- Atualização da documentação técnica em `docs/documentacao-tecnica.md`.

### Security

- Configurações operacionais (agenda/webhook) passaram a suportar override via variáveis de ambiente.

## [0.1.0] - 2026-03-05

### Added

- Primeira versão funcional da landing page.
- Integração inicial de formulário com webhook.
- Estrutura base de seções e layout responsivo.
