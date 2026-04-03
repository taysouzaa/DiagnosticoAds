# DOCUMENTAÇÃO OFICIAL DO PROJETO

## AUTORA

Taynara Correia de Souza

## CONTATO

[taynara.souza.dev@gmail.com](mailto:taynara.souza.dev@gmail.com)  
+55 (19) 93500-3600

---

## 1. Resumo do Projeto

O `LP-diagnostico` é uma landing page de captação de leads para diagnóstico de anúncios em marketplaces. O sistema resolve a necessidade de transformar tráfego em agendamento qualificado com baixa fricção: captura dados do formulário, preserva metadados de origem (UTM/canal), envia para webhook do n8n e redireciona para agenda.

| Item | Descrição |
| --- | --- |
| Problema resolvido | Falta de fluxo padronizado para captar e qualificar leads de diagnóstico |
| Objetivo principal | Converter tráfego em solicitações de análise estratégica |
| Tipo de aplicação | Front-end SPA estática (React + Vite) |

---

## 2. Contexto e Finalidade do Sistema

| Tópico | Detalhamento |
| --- | --- |
| Finalidade | Capturar leads e encaminhar para operação comercial/consultiva |
| Público que utiliza | Potenciais clientes de diagnóstico de Ads (marketplaces) |
| Cenário de aplicação | Campanhas de aquisição com URL rastreável e CTA para formulário |

---

## 3. Arquitetura do Sistema

Arquitetura orientada a front-end estático com integração outbound:

1. `index.html`/`ads.html` inicializa `tracking.js`.
2. `Tracking.init()` registra canal e UTM em `localStorage`.
3. React monta a SPA (`src/main.tsx` + `src/App.tsx`).
4. `FormSection` monta payload, envia para webhook e redireciona para agenda.

| Camada | Responsabilidade | Arquivos |
| --- | --- | --- |
| Bootstrap | Carregar app e rastreamento | `index.html`, `ads.html`, `public/tracking.js` |
| UI | Renderizar jornada de conversão | `src/sections/*.tsx`, `src/App.tsx` |
| Configuração | Resolver URLs por ambiente | `src/config/runtime.ts`, `.env.*` |
| Utilitários | Tracking e formatação de WhatsApp | `src/lib/tracking.ts`, `src/lib/whatsapp.ts` |
| Build/Deploy | Geração de artefato estático | `vite.config.ts`, `vercel.json`, `deploy/hostgator/*` |

---

## 4. Tecnologias Utilizadas

| Categoria | Stack identificada no código |
| --- | --- |
| Linguagens | TypeScript, JavaScript, CSS, HTML |
| Frameworks/Bibliotecas | React 18.3.1, React DOM 18.3.1, Vite 6, Tailwind CSS v4, `tw-animate-css` |
| Ferramentas de automação | npm scripts (`dev`, `build`, `postbuild`) |
| Infraestrutura | Vercel (`vercel.json`) e estrutura paralela para HostGator (`deploy/hostgator`) |
| Banco de dados | Não há banco no front-end; persistência é delegada ao workflow externo (n8n) |

---

## 5. Estrutura do Projeto

```text
.
├─ src/
│  ├─ assets/                 # imagens e logos
│  ├─ config/runtime.ts       # leitura de VITE_* com fallback
│  ├─ lib/                    # utilitários de tracking e máscara
│  ├─ sections/               # seções da landing page
│  ├─ styles/                 # tema global, fontes e Tailwind
│  ├─ App.tsx                 # composição da página
│  └─ main.tsx                # bootstrap React
├─ public/
│  ├─ tracking.js             # captura de origem (UTM/referrer)
│  └─ htaccess-hostgator.txt  # regras de rewrite para Apache
├─ deploy/hostgator/          # pacote de publicação manual para HostGator
├─ docs/                      # documentação técnica do projeto
├─ ads.html                   # entrada de build
├─ index.html                 # entrada de desenvolvimento/local
├─ vite.config.ts             # build e plugins
└─ vercel.json                # configuração de deploy na Vercel
```

---

## 6. Funcionamento do Sistema

| Etapa | Implementação | Resultado |
| --- | --- | --- |
| Entrada de dados | Campos obrigatórios de nome, e-mail, WhatsApp e seleção de marketplaces | Dados de lead estruturados |
| Processamento | Normalização de WhatsApp, leitura de UTM/canal de `localStorage`, montagem de payload JSON | Payload pronto para automação |
| Integrações externas | POST para webhook n8n + redirecionamento para Google Calendar | Lead encaminhado e usuário segue para agendamento |
| Geração de resultado | Conversão em evento de lead e continuidade da jornada comercial | Continuidade operacional do funil |

---

## 7. Integrações e APIs

| Integração | Finalidade | Autenticação observada no código | Fluxo de comunicação |
| --- | --- | --- | --- |
| Webhook n8n (`VITE_LEAD_WEBHOOK_URL`) | Receber payload do lead | Não há token/chave no front-end | Navegador envia `POST` (`sendBeacon` ou `fetch no-cors`) |
| Google Calendar (`VITE_CALENDAR_URL`) | Abrir agenda após envio | Não aplicável | `window.location.assign(calendarUrl)` |
| YouTube Embed | Exibir vídeo explicativo | Não aplicável | `iframe` com `https://www.youtube.com/embed/...` |
| Google Fonts | Carregar fonte Inter | Não aplicável | `@import` CSS em `src/styles/fonts.css` |

---

## 8. Automação Implementada no Projeto

| Automação | Problema que resolve | Arquivos envolvidos | Entrada | Saída |
| --- | --- | --- | --- | --- |
| Tracking de origem | Preservar canal/UTM para atribuição | `public/tracking.js`, `src/lib/tracking.ts` | Query params e referrer | Objeto persistido em `localStorage` |
| Envio resiliente do lead | Reduzir perda de envio durante redirecionamento | `src/sections/FormSection.tsx` | Payload do formulário | Evento no webhook n8n + redirect |
| Pós-build (`postbuild`) | Garantir `index.html` em `dist` para compatibilidade de host | `package.json` | `dist/ads.html` | `dist/index.html` copiado |

Fluxo resumido de execução:

```text
visitante -> tracking.js -> localStorage -> formulário -> webhook n8n -> agenda
```

---

## 9. Configuração e Execução do Sistema

Pré-requisitos:

| Dependência | Versão recomendada |
| --- | --- |
| Node.js | 18+ |
| npm | 9+ |

Instalação e execução local:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Build de produção:

```bash
npm run build
```

Scripts disponíveis:

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia servidor Vite de desenvolvimento |
| `npm run build` | Gera build de produção (`dist/`) |
| `npm run postbuild` | Copia `dist/ads.html` para `dist/index.html` |

---

## 10. Variáveis de Ambiente

Variáveis encontradas no código-fonte:

| Variável | Função | Onde é usada |
| --- | --- | --- |
| `VITE_CALENDAR_URL` | URL de redirecionamento após envio do lead | `src/config/runtime.ts` |
| `VITE_LEAD_WEBHOOK_URL` | Endpoint de captura do lead no n8n | `src/config/runtime.ts` e `src/sections/FormSection.tsx` |

Exemplo de arquivo `.env.local`:

```env
VITE_CALENDAR_URL=
VITE_LEAD_WEBHOOK_URL=
```

Nunca incluir credenciais reais no repositório.

---

## 11. Segurança

| Pilar | Estado atual identificado |
| --- | --- |
| Autenticação | Não existe autenticação no front-end para envio ao webhook |
| Validação de dados | Validação básica HTML + normalização de telefone |
| Controle de acesso | Não há camada de backend/proxy para proteger endpoint |
| Proteção contra uso indevido | Não há CAPTCHA, assinatura de payload ou rate limiting no cliente |

Recomendação mínima para produção corporativa: proxy backend com assinatura/verificação do payload, rate limiting e anti-bot no fluxo de formulário.

---

## 12. Licença de Uso do Software

LICENÇA PADRÃO DOS PROJETOS

ACORDO DE LICENÇA DE SOFTWARE

Copyright (c) 2026 Taynara Correia de Souza  
Todos os direitos reservados.

AUTORA  
Taynara Correia de Souza  
Email: taynara.souza.dev@gmail.com  
Telefone / WhatsApp: +55 (19) 93500-3600

TITULARIDADE  
Este software e seu código-fonte são propriedade intelectual exclusiva de Taynara Correia de Souza e estão protegidos pelas leis de direitos autorais, incluindo a Lei de Software Brasileira (Lei nº 9.609/1998) e tratados internacionais de direitos autorais.

RESTRIÇÕES DE LICENÇA  
Sem autorização expressa e por escrito da autora, nenhuma pessoa ou organização está autorizada a:

1. Copiar este software.
2. Modificar este software.
3. Redistribuir este software.
4. Utilizar este software comercialmente.
5. Incorporar este software em outros projetos.
6. Reproduzir qualquer parte do código.

EXIBIÇÃO EM PORTFÓLIO  
Este repositório é publicado exclusivamente para demonstrar trabalho profissional e capacidade técnica.  
A visualização do código para fins educacionais ou de avaliação é permitida; porém, qualquer forma de reutilização, distribuição, modificação ou aplicação comercial é estritamente proibida sem autorização prévia e por escrito.

SOLICITAÇÕES DE PERMISSÃO  
Para solicitar permissão de uso, modificação ou licenciamento, entre em contato:  
Taynara Correia de Souza  
taynara.souza.dev@gmail.com

RESPONSABILIDADE  
Este software é fornecido "no estado em que se encontra", sem garantia de qualquer tipo.  
A autora não poderá ser responsabilizada por quaisquer danos resultantes de seu uso.

ACEITAÇÃO  
Ao acessar este repositório, você concorda com os termos desta licença.
