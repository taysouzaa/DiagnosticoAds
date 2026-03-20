# Arquitetura do Sistema - DiagnosticoAds

Projeto: DiagnosticoAds  
Data: 19/03/2026  
Responsavel tecnico: Taynara Correia de Souza

## 1. Visao arquitetural
O sistema adota arquitetura de aplicacao web estatica com renderizacao no cliente. Nao ha back-end proprio. A persistencia de dados ocorre por integracao com n8n e Google Sheets, e o agendamento e realizado via Google Calendar.

## 2. Componentes principais
- Front-end SPA: React + Vite.
- Automacao: n8n (webhook).
- Armazenamento: Google Sheets (leads).
- Agendamento: Google Calendar.
- Midia: YouTube embed.

## 3. Estrutura logica
- App.tsx compoe as secoes.
- Sections: Hero, Analysis, Authority, Scarcity, Form.

## 4. Fluxo de dados
1. Usuario acessa a pagina.
2. Usuario interage com CTA e preenche o formulario.
3. Usuario envia formulario; payload e enviado ao webhook de leads.
4. n8n normaliza dados e grava no Google Sheets (leads).
5. Usuario e redirecionado ao Google Calendar.

## 5. Integracoes externas
- n8n: recepcao do payload via webhook.
- Google Sheets: append de linhas (aba de leads).
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
- Sem telemetria ou tracking no front-end.
