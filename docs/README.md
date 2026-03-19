# DiagnósticoAds — Landing Page

Landing page de alta conversão para diagnóstico estratégico de anúncios em marketplaces (Mercado Livre, Shopee e Amazon).  
Projeto focado em clareza da proposta, prova social e conversão via formulário com CTA direto.

---

## Visão Geral
Esta página foi desenhada para conduzir o usuário por uma sequência objetiva:
proposta → autoridade → explicação → escassez → formulário → agradecimento.

## Funcionalidades
- CTA principal com scroll suave até o formulário
- Seção “O que será analisado” com pontos claros e objetivos
- Área de autoridade com especialistas e marketplaces atendidos
- Vídeo explicativo com capa personalizada
- Formulário com redirecionamento ao Google Calendar
- Tracking de UTMs e eventos principais
- Layout responsivo para mobile e desktop

## Stack
- React + TypeScript
- Vite
- Tailwind CSS (utilitários)

---

## Como rodar localmente

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Build de produção:
```bash
npm run build
```

4. Pré-visualização do build:
```bash
npx vite preview
```
---

## Personalizações rápidas

- **URL do agendamento**: `src/components/sections/FormSection.tsx`
- **Capa do vídeo**: `src/assets/video-capa.png`
- **Foto dos especialistas**: `src/assets/especialistas.png`
- **Logos dos marketplaces**: `src/assets/logos/`
- **Cores e fundo**: `src/styles/theme.css` (`--lp-*`)
- **Webhook de tracking**: variável `VITE_TRACKING_WEBHOOK_URL` no `.env` (aponta para `/webhook/track`)
- **Tracking HTML**: `public/tracking.js`

---

## Documentação técnica

A documentação técnica e oficial está em:
- `docs/INTEGRACAO_N8N.md` (leads + tracking via n8n)
- `docs/Documentacao_Oficial.md`
- `docs/Arquitetura_do_Sistema.md`
- `docs/Historico_de_Versoes.md`
- `docs/Diagramas.md`

---

## Estrutura relevante

- `src/App.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/AnalysisSection.tsx`
- `src/components/sections/AuthoritySection.tsx`
- `src/components/sections/ScarcitySection.tsx`
- `src/components/sections/FormSection.tsx`
- `src/styles/theme.css`

---

## Responsividade
O layout foi ajustado para mobile e desktop com:
- seções em tela cheia
- tipografia fluida
- espaçamento consistente entre blocos

---

## Autoria
Taynara Correia de Souza

---

## Licença
Este projeto está sob licença proprietária. Consulte o arquivo `LICENSE`.
