# Documentação Técnica - DiagnósticoAds

Data: 2026-04-02  
Projeto: LP-diagnostico  
Responsável: Taynara Correia de Souza

## 1. Resumo do Projeto

Aplicação web de página única (SPA) orientada à captação de leads para diagnóstico de anúncios em marketplaces. O usuário percorre seções de contexto e envia dados via formulário para uma automação n8n, sendo redirecionado para agendamento no Google Calendar.

## 2. Arquitetura

Arquitetura frontend estática (React + Vite), sem backend próprio no repositório.

Camadas:

- Apresentação: componentes React em `src/sections`.
- Configuração: `src/config/runtime.ts`.
- Utilitários: `src/lib/*`.
- Estilo: `src/styles/*`.
- Tracking estático: `public/tracking.js`.

## 3. Tecnologias

- React 18
- TypeScript
- Vite 6
- Tailwind CSS v4
- PostCSS
- n8n (webhook)
- Google Sheets (destino de dados via n8n)
- Google Calendar (agendamento)

## 4. Estrutura

```text
src/
  assets/
  sections/
  config/
  lib/
  styles/
  App.tsx
  main.tsx
public/
  tracking.js
  htaccess-hostgator.txt
docs/
ads.html
index.html
```

## 5. Fluxo de Dados

1. Usuário acessa a landing page.
2. `tracking.js` captura origem (`channel` / UTM / referrer) e persiste em `localStorage`.
3. Usuário preenche formulário e seleciona marketplaces.
4. `FormSection` monta payload com dados pessoais + tracking + timestamp.
5. Front-end tenta envio por `navigator.sendBeacon`; fallback com `fetch no-cors keepalive`.
6. Usuário é redirecionado para URL de agenda.
7. n8n recebe, normaliza e persiste em Google Sheets (fora do frontend).

## 6. Integrações

- Webhook de lead (`VITE_LEAD_WEBHOOK_URL`)
- Google Calendar (`VITE_CALENDAR_URL`)
- YouTube embed (seção de vídeo)

Resiliência implementada no cliente:

- Fallback de transporte (`sendBeacon` → `fetch`)
- Timeout defensivo de submit via `Promise.race`

## 7. Segurança

Condições atuais:

- Sem autenticação no frontend (escopo de landing page pública).
- Endpoint webhook exposto no cliente por necessidade de arquitetura.
- Validação no frontend apenas básica.

Recomendações:

- Controle de origem e autenticação no endpoint n8n/proxy.
- Rate limit e antispam server-side.
- Sanitização e validação estrita no workflow.
- Não versionar segredos; usar variáveis de ambiente.

## 8. Configuração

Arquivo de referência: `.env.example`

```env
VITE_CALENDAR_URL=https://calendar.app.google/...
VITE_LEAD_WEBHOOK_URL=https://seu-n8n/webhook/DiagnosticoAds
```

Comportamento:

- Se variável não existir, o runtime usa valores default em `src/config/runtime.ts`.
- Deploy HostGator depende também de `public/htaccess-hostgator.txt`.
