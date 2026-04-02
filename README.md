# DiagnósticoAds

Landing page de captação de leads para diagnóstico estratégico de anúncios em marketplaces, com envio para automação n8n e redirecionamento para agendamento.

## Descrição do Projeto

O projeto foi construído como SPA em React/Vite para maximizar conversão com fluxo direto:

1. Proposta de valor (Hero).
2. Explicação do que será analisado.
3. Prova de autoridade.
4. Vídeo explicativo e escassez.
5. Formulário com captura de origem (channel/UTM), envio do lead e redirecionamento.

## Tecnologias Utilizadas

- React 18
- TypeScript
- Vite 6
- Tailwind CSS v4
- PostCSS
- n8n (webhook)
- Google Sheets (persistência via n8n)
- Google Calendar (agendamento)

## Instalação

Pré-requisitos:

- Node.js 18+
- npm 9+

Passos:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Aplicação local: `http://localhost:5173`

## Scripts

- `npm run dev`: ambiente de desenvolvimento.
- `npm run build`: build de produção (`ads.html` como entrada principal).
- `npm run postbuild`: copia `dist/ads.html` para `dist/index.html`.

## Estrutura do Projeto

```text
src
├─ assets
├─ sections
├─ config
├─ lib
├─ styles
├─ App.tsx
└─ main.tsx
public
├─ tracking.js
└─ htaccess-hostgator.txt
docs
├─ arquitetura.md
├─ diagramas.md
├─ diagramas-mermaid-2026-04-02.md
├─ documentacao-tecnica.md
├─ engenharia-revisao-2026-04-02.md
├─ historico-versoes.md
└─ integracao-n8n.md
deploy
└─ hostgator
```

## Funcionalidades

- Landing page responsiva com seções modulares.
- CTA com rolagem suave até o formulário.
- Seleção de marketplaces no formulário.
- Tracking de origem por URL/referrer persistido em `localStorage`.
- Envio de lead com fallback (`sendBeacon` e `fetch` com `keepalive`).
- Redirecionamento imediato para agenda após tentativa de envio.

## Configuração de Ambiente

Arquivo `.env.local`:

```env
VITE_CALENDAR_URL=https://calendar.app.google/...
VITE_LEAD_WEBHOOK_URL=https://seu-n8n/webhook/DiagnosticoAds
```

Sem override, o projeto usa valores default definidos em [src/config/runtime.ts](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/src/config/runtime.ts).

## Integrações

- Webhook n8n para recebimento de leads.
- Google Sheets para armazenamento dos leads (via workflow).
- Google Calendar para agendamento.
- YouTube para vídeo incorporado.

## Segurança e Boas Práticas

- Não há autenticação no front-end; segurança depende do endpoint n8n.
- Recomenda-se restringir origem e aplicar validação/antispam no workflow.
- Segredos não devem ficar no repositório; usar variáveis de ambiente.
- Revisão técnica completa: [docs/engenharia-revisao-2026-04-02.md](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/docs/engenharia-revisao-2026-04-02.md).

## Autor

- Taynara Correia de Souza
- Email: [taynara.souza.dev@gmail.com](mailto:taynara.souza.dev@gmail.com)
- Telefone / WhatsApp: +55 (19) 93500-3600

## Licença

Licença proprietária. Consulte [LICENSE](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/LICENSE).
