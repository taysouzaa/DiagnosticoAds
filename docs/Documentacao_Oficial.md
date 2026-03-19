# Documentacao Oficial - DiagnosticoAds

Projeto: DiagnosticoAds  
Data: 19/03/2026  
Responsavel tecnico: Taynara Correia de Souza

## 1. Visao geral
O DiagnosticoAds e uma landing page de alta conversao voltada a captacao de leads para diagnostico estrategico de anuncios em marketplaces. O sistema conduz o usuario por uma sequencia de secoes informativas e de prova social, culminando em um formulario que registra o lead em automacao n8n e redireciona para o agendamento no Google Calendar.

## 2. Objetivo do sistema
Garantir uma experiencia de conversao clara e objetiva, capturando dados essenciais do lead, preservando a origem por UTM, registrando eventos criticos e permitindo envio opcional de tracking via webhook.

## 3. Escopo
- Renderizacao da landing page em SPA.
- Captura de dados do formulario.
- Persistencia de UTMs no navegador.
- Rastreamento de eventos (page load, clique de agendamento, envio de formulario).
- Envio de dados ao webhook n8n.
- Redirecionamento para agendamento.

Fora de escopo:
- Autenticacao de usuarios.
- Back-end proprio.
- Armazenamento local de dados sensiveis.
- Painel administrativo.

## 4. Requisitos funcionais
- Rolagem suave ate o formulario ao clicar no CTA principal.
- Captura obrigatoria de nome, e-mail e WhatsApp.
- Selecao obrigatoria de pelo menos um marketplace.
- Envio do payload ao webhook do n8n.
- Redirecionamento ao Google Calendar apos tentativa de envio.
- Captura e persistencia de UTMs.
- Registro de eventos de tracking em console JSON.
- Envio opcional de eventos de tracking para webhook externo (configuravel por variavel de ambiente).

## 5. Requisitos nao funcionais
- Responsividade completa para desktop e mobile.
- Baixa latencia de envio do formulario.
- Compatibilidade com navegadores modernos.
- Codigo organizado por camadas (sections, services, styles).

## 6. Tecnologias
- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- PostCSS
- n8n
- Google Sheets
- Google Calendar

## 7. Fluxo funcional
1. Usuario acessa a landing page.
2. UTMs sao capturadas e persistidas.
3. Evento page_load e registrado.
4. Usuario navega pelas secoes e clica no CTA.
5. Evento schedule_click e registrado.
6. Usuario envia o formulario.
7. Evento form_submit e registrado.
8. Payload e enviado ao webhook.
9. Usuario e redirecionado ao agendamento.
10. Evento schedule_redirect e registrado.

## 8. Estrutura de codigo
- src/App.tsx: composicao das secoes.
- src/components/sections: secoes visuais.
- src/services/tracking.ts: logica centralizada de tracking.
- public/tracking.js: tracking para paginas HTML estaticas.
- src/styles: estilos globais.
- docs/INTEGRACAO_N8N.md: documentacao da automacao.

## 9. Tracking e UTMs
- Parametros suportados: utm_source, utm_medium, utm_campaign, utm_content.
- Persistencia: localStorage.
- Eventos registrados em JSON no console e enviados a webhook quando configurado.
- Payload do tracking: source, medium, campaign, content, event, url, timestamp.
- Variavel de ambiente: VITE_TRACKING_WEBHOOK_URL (aponta para /webhook/track).

Eventos padrao:
- page_load
- schedule_click (location: hero ou form)
- form_submit
- schedule_redirect

## 10. Operacao e build
Instalacao e execucao:
```bash
npm install
npm run dev
```
Build de producao:
```bash
npm run build
```

## 11. Licenca e propriedade
Uso restrito conforme arquivo LICENSE. O projeto e propriedade de Taynara Correia de Souza.
