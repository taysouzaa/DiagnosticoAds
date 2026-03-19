# Arquitetura do Sistema - DiagnosticoAds

Projeto: DiagnosticoAds  
Data: 19/03/2026  
Responsavel tecnico: Taynara Correia de Souza

## 1. Visao arquitetural
O sistema adota arquitetura de aplicacao web estatica com renderizacao no cliente. Nao ha back-end proprio. A persistencia de dados ocorre por integracao com n8n e Google Sheets, e o agendamento e realizado via Google Calendar.

## 2. Componentes principais
- Front-end SPA: React + Vite.
- Servico de tracking: modulo centralizado em src/services/tracking.ts.
- Automacao: n8n (webhook).
- Armazenamento: Google Sheets (leads e tracking).
- Agendamento: Google Calendar.
- Midia: YouTube embed.

## 3. Estrutura logica
- App.tsx compoe as secoes.
- Sections: Hero, Analysis, Authority, Scarcity, Form.
- Tracking: captura UTMs, persiste em localStorage e registra eventos.

## 4. Fluxo de dados
1. Usuario acessa a pagina e UTMs sao capturadas.
2. Tracking registra page_load com contexto de URL e referrer.
3. Usuario interage com CTA e eventos de clique sao registrados.
4. Usuario envia formulario; payload e enviado ao webhook de leads.
5. Tracking registra form_submit e schedule_redirect (com envio opcional via webhook de tracking).
6. n8n normaliza dados e grava no Google Sheets (leads e tracking).
7. Usuario e redirecionado ao Google Calendar.

## 5. Integracoes externas
- n8n: recepcao do payload via webhook.
- n8n Tracking: recepcao de eventos via webhook dedicado.
- Google Sheets: append de linhas (aba de leads e aba de tracking).
- Google Calendar: agendamento.
- YouTube: video incorporado.

## 6. Consideracoes de seguranca
- Nenhum dado sensivel e armazenado localmente.
- Webhook deve ser protegido por configuracao no n8n e hospedagem.
- Envio em text/plain para reduzir erros de CORS.

## 7. Escalabilidade
- Front-end estatico escalavel por CDN.
- Limites operacionais dependem do throughput do n8n e do Google Sheets.

## 8. Observabilidade
- Logging local via console em JSON.
- Preparacao para integracao futura com Google Analytics, Meta Pixel e webhooks.
