# DiagnósticoAds — Landing Page de Diagnóstico Estratégico

Landing page de alta conversão para diagnóstico estratégico de anúncios em marketplaces (Mercado Livre, Shopee e Amazon), com captura de leads e agendamento automatizado.

## Visão Geral
O projeto apresenta uma jornada direta para conversão: proposta de valor, prova de autoridade, vídeo explicativo, escassez controlada e formulário com envio de lead. O objetivo é reduzir fricção e guiar o usuário até o agendamento do diagnóstico.

## Demonstração
- Execute o projeto localmente e acesse `http://localhost:5173`.
- Fluxo esperado: visualizar a proposta, assistir ao vídeo, preencher o formulário, selecionar marketplaces e ser redirecionado para a agenda.

## Tecnologias Utilizadas
- React
- TypeScript
- Vite
- Tailwind CSS v4
- PostCSS
- n8n (automação)
- Google Sheets (armazenamento de leads)
- Google Calendar (agendamento)

## Estrutura do Projeto
- `src/App.tsx`: composição principal das seções da landing page.
- `src/components/sections`: seções visuais (Hero, Análise, Autoridade, Escassez, Formulário).
- `src/services/tracking.ts`: rastreamento centralizado de UTMs e eventos.
- `public/tracking.js`: tracking para páginas HTML estáticas.
- `src/assets`: imagens e logos utilizados na interface.
- `src/styles`: estilos globais e tokens de tema.
- `docs`: documentação técnica e documentos oficiais.
- `public/htaccess-hostgator.txt`: regra de deploy para Apache/HostGator.
- `ads.html`: entrada de build usada no Rollup/Vite.

## Instalação e Execução
```bash
npm install
npm run dev
```

## Build de Produção
```bash
npm run build
```

> Observação: o `postbuild` copia `dist/ads.html` para `dist/index.html` para compatibilidade com hospedagens que exigem `index.html` (ex.: Vercel).

## Preview do Build
```bash
npx vite preview
```

## Funcionalidades Principais
- CTA com rolagem suave para o formulário.
- Seção de análise com pontos objetivos do diagnóstico.
- Prova de autoridade com especialistas e marketplaces atendidos.
- Vídeo explicativo com capa customizada.
- Formulário com validação básica e seleção de marketplaces.
- Envio de lead para automação e redirecionamento para agendamento.
- Tracking de UTMs e eventos principais (page load, clique, envio e redirect).

## Tracking (UTM e Eventos)
- Captura de UTMs via querystring e persistência em `localStorage`.
- Eventos padronizados via `trackEvent(eventName, data)`.
- Log em JSON no console para auditoria local.
- Envio opcional para webhook externo via variável `VITE_TRACKING_WEBHOOK_URL`.
- Payload enviado ao webhook: `source`, `medium`, `campaign`, `content`, `event`, `url`, `timestamp`.

## Automação e Lógica Principal
O formulário monta um payload padronizado com data e hora no formato brasileiro e o envia ao webhook do n8n (leads). O envio tenta `navigator.sendBeacon` e, em fallback, utiliza `fetch` com `keepalive`. Após a tentativa de envio, o usuário é redirecionado para a agenda do Google Calendar. O fluxo completo de automação e tracking está documentado em `docs/INTEGRACAO_N8N.md`.

## Variáveis de Ambiente
Defina no `.env` local (não versionado):
```bash
VITE_TRACKING_WEBHOOK_URL=https://.../webhook/track
```

## Autor
- **Taynara Correia de Souza**
- Email: [taynara.souza.dev@gmail.com](mailto:taynara.souza.dev@gmail.com)
- Telefone/WhatsApp: +55 (19) 93500-3600

## Licença
Este projeto está sob licença proprietária. Consulte o arquivo `LICENSE`.

## Aviso de Propriedade Intelectual
Este projeto é propriedade de Taynara Correia de Souza. O código é disponibilizado exclusivamente para fins de demonstração profissional e portfólio, sendo proibido qualquer uso, cópia, modificação ou redistribuição sem autorização prévia.
