# DOCUMENTAÇÃO OFICIAL DO PROJETO

## AUTORA

Taynara Correia de Souza

## CONTATO

[taynara.souza.dev@gmail.com](mailto:taynara.souza.dev@gmail.com)  
+55 (19) 93500-3600

---

## Visão Arquitetural

O sistema adota arquitetura de front-end estático com responsabilidades separadas por camada:

1. Inicialização HTML e tracking.
2. Renderização da SPA React.
3. Composição de payload de lead.
4. Entrega assíncrona para automação externa (n8n).
5. Redirecionamento para agenda.

| Camada | Módulo | Responsabilidade |
| --- | --- | --- |
| Entrada | `index.html`, `ads.html` | Disponibilizar `#root` e disparar `Tracking.init()` |
| Tracking | `public/tracking.js` | Resolver canal/UTM por query/referrer e persistir em `localStorage` |
| UI | `src/App.tsx`, `src/sections/*` | Orquestrar jornada visual da landing |
| Domínio de formulário | `src/sections/FormSection.tsx` | Validar campos, montar payload e disparar envio |
| Configuração | `src/config/runtime.ts` | Ler `VITE_*` com fallback seguro |
| Utilidades | `src/lib/tracking.ts`, `src/lib/whatsapp.ts` | Abstrair leitura de tracking e formatação de telefone |

---

## Estrutura de Pastas

```text
src/
  assets/          # imagens e logos renderizados nas seções
  config/          # configuração de runtime e variáveis de ambiente
  lib/             # utilitários puros (tracking, whatsapp)
  sections/        # componentes de domínio da landing
  styles/          # tema global + Tailwind
  App.tsx          # composição das seções
  main.tsx         # bootstrap do React

public/
  tracking.js              # script de tracking executado antes do app React
  htaccess-hostgator.txt   # regras Apache para host compartilhado

deploy/hostgator/          # pacote estático para publicação manual
```

---

## Fluxo de Dados Principal

| Etapa | Origem | Transformação | Destino |
| --- | --- | --- | --- |
| Captura de origem | URL e `document.referrer` | Mapeamento `channel/source/medium/campaign` | `localStorage` (`diagnosticoads:tracking`) |
| Entrada de formulário | Usuário | Máscara/normalização de WhatsApp e seleção de marketplaces | Estado React (`useState`) |
| Enriquecimento de lead | Estado do formulário + tracking + timestamp | JSON com chaves esperadas pelo workflow | `body` do POST |
| Entrega externa | Browser API (`sendBeacon`/`fetch`) | Envio em texto JSON (`text/plain`) | Webhook do n8n |
| Continuação da jornada | Finalização do submit | Navegação programática | Google Calendar |

---

## Comunicação Entre Módulos

| Origem | Destino | Forma de comunicação |
| --- | --- | --- |
| `index.html` / `ads.html` | `public/tracking.js` | Script global antes do bundle React |
| `FormSection` | `APP_CONFIG` | Import estático de configuração |
| `FormSection` | `getTrackingData()` | Import utilitário para consumo de `localStorage` |
| `FormSection` | Webhook externo | HTTP `POST` sem CORS explícito (`no-cors`) |
| `FormSection` | Navegador | Redirecionamento por `window.location.assign` |

Pontos de acoplamento relevantes:

1. Chave de armazenamento (`diagnosticoads:tracking`) compartilhada entre `tracking.js` e `src/lib/tracking.ts`.
2. Campos do payload (ex.: `"Nome completo "`) acoplados ao contrato do workflow externo.
3. URLs de integração centralizadas em `src/config/runtime.ts`.
