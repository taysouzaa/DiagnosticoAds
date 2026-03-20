# Documentacao Oficial - DiagnosticoAds

Projeto: DiagnosticoAds  
Data: 19/03/2026  
Responsavel tecnico: Taynara Correia de Souza

## 1. Visao geral
O DiagnosticoAds e uma landing page de alta conversao voltada a captacao de leads para diagnostico estrategico de anuncios em marketplaces. O sistema conduz o usuario por uma sequencia de secoes informativas e de prova social, culminando em um formulario que registra o lead em automacao n8n e redireciona para o agendamento no Google Calendar.

## 2. Objetivo do sistema
Garantir uma experiencia de conversao clara e objetiva, capturando dados essenciais do lead e direcionando o usuario ao agendamento.

## 3. Escopo
- Renderizacao da landing page em SPA.
- Captura de dados do formulario.
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
2. Usuario navega pelas secoes e clica no CTA.
3. Usuario envia o formulario.
4. Payload e enviado ao webhook.
5. Usuario e redirecionado ao agendamento.

## 8. Estrutura de codigo
- src/App.tsx: composicao das secoes.
- src/components/sections: secoes visuais.
- src/styles: estilos globais.
- docs/integracao/INTEGRACAO_N8N.md: documentacao da automacao.

## 9. Operacao e build
Instalacao e execucao:
```bash
npm install
npm run dev
```
Build de producao:
```bash
npm run build
```

## 10. Licenca e propriedade
Uso restrito conforme arquivo LICENSE. O projeto e propriedade de Taynara Correia de Souza.
