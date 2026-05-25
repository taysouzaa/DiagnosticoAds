# Relatório Técnico de Execução — LP-diagnostico

## Data de referência
- 2026-05-25

## Objetivo solicitado
- Remover a seção "Especialistas".
- Migrar o projeto para HTML/CSS/JavaScript puro (sem React/TSX).
- Depois, alinhar a página para ter a mesma estrutura do projeto:
  - `C:\Users\Tainara\OneDrive\Documentos\Dev-projects\lead-diagnostico`

---

## Registro detalhado (cronológico)

### 1) Auditoria inicial do projeto
Foi feito levantamento da estrutura do repositório para mapear os pontos de alteração:
- Listagem de arquivos/pastas do projeto.
- Leitura de arquivos centrais:
  - `src/App.tsx`
  - `src/main.tsx`
  - `src/sections/*`
  - `src/styles/*`
  - `src/lib/*`
  - `src/config/runtime.ts`
  - `ads.html`, `index.html`, `vite.config.ts`, `package.json`

Conclusão da auditoria:
- O projeto estava em React + Vite, com renderização por componentes TSX.
- A seção "Especialistas" estava implementada em `AuthoritySection`.

---

### 2) Detecção de árvore Git suja e procedimento de segurança
Antes de alterar código, foi identificado que o repositório já tinha várias mudanças locais (modificados, removidos e não rastreados).

Ação executada (confirmada por você):
- Primeiro organizar estado atual (backup), depois executar migração.

Backup criado:
- Comando usado: `git stash push -u -m "pre-html-css-js-migration backup 2026-05-25"`
- Resultado:
  - `stash@{0}: On main: pre-html-css-js-migration backup 2026-05-25`
  - Árvore local ficou limpa para iniciar migração com segurança.

---

### 3) Migração para HTML/CSS/JavaScript puro (fase estática)
Foi executada a conversão da aplicação React para versão estática:

#### 3.1) Recursos estáticos criados/copiados
- `public/styles.css` (derivado do CSS compilado já existente para preservar visual)
- `public/main.js` (lógica de interação da página em JS puro)
- Assets copiados para `public/`:
  - `public/video-capa.png`
  - `public/logos/*`

#### 3.2) HTML estático criado
- `ads.html` e `index.html` foram reescritos para estrutura estática.
- Lógica portada para JS puro:
  - rolagem para formulário,
  - reprodução de vídeo,
  - máscara e validação de WhatsApp,
  - seleção de canais,
  - envio ao webhook com `sendBeacon` + fallback `fetch`.

#### 3.3) Configuração de build simplificada
- `vite.config.ts` simplificado para build estático.
- `package.json` reduzido para dependência principal de build (`vite`).
- `npm install` executado para sincronizar lockfile e remover dependências antigas.

#### 3.4) Limpeza de código legado React
- Pasta `src/` removida.
- `postcss.config.mjs` removido.

#### 3.5) Build validado
- `npm run build` executado com sucesso.
- Artefatos estáticos gerados em `dist/`.

Observação:
- Nesta fase, a seção "Especialistas" havia sido retirada do fluxo da versão estática gerada manualmente.

---

### 4) Ajuste solicitado posteriormente: igualar estrutura ao projeto `lead-diagnostico`
Após a migração estática, foi solicitado espelhar a estrutura da página de referência.

Ações executadas:
- Cópia da estrutura HTML de referência para este projeto:
  - `lead-diagnostico/index.html` -> `LP-diagnostico/ads.html`
  - `lead-diagnostico/index.html` -> `LP-diagnostico/index.html`
- Cópia de recursos visuais e fontes:
  - `lead-diagnostico/assets/*` -> `LP-diagnostico/public/assets/*`
  - `lead-diagnostico/fonts/*` -> `LP-diagnostico/public/fonts/*`
- Para refletir organização da referência também na raiz:
  - criação de `assets/` e `fonts/` na raiz do `LP-diagnostico`
  - cópia dos mesmos arquivos para essas pastas

Resultado:
- Estrutura da página passou a seguir o modelo do `lead-diagnostico`.
- Isso reintroduz a seção "Especialistas", porque ela existe no HTML de referência copiado.

---

### 5) Builds e validações finais
Build executado novamente após espelhamento:
- `npm run build` -> sucesso.

Mensagens de aviso observadas no build (não bloqueantes):
- referências com nomes codificados (`%20`, `%2C`) para imagens com espaços/vírgulas podem não ser resolvidas durante o pipeline, mas os arquivos existem em `dist/assets`.
- fontes passaram a ser empacotadas em `dist/ads-assets` após ajuste de estrutura.

---

## Estado atual do projeto

### Resultado funcional
- Página principal está com estrutura espelhada do projeto `lead-diagnostico`.
- Build está passando.

### Itens importantes para controle
- Existe um backup completo do estado anterior em:
  - `stash@{0}` com a mensagem `pre-html-css-js-migration backup 2026-05-25`

Comandos úteis para recuperar/verificar:
- Ver stash: `git stash list`
- Aplicar stash sem remover: `git stash apply stash@{0}`
- Aplicar e remover da pilha: `git stash pop stash@{0}`

---

## Arquivos-chave alterados nesta execução
- `ads.html`
- `index.html`
- `vite.config.ts`
- `package.json`
- `package-lock.json`
- `public/assets/*`
- `public/fonts/*`
- `assets/*` (raiz)
- `fonts/*` (raiz)
- Remoções de legado React (`src/*`, `postcss.config.mjs`)

---

## Observação de consistência de requisitos
- Requisito inicial: remover seção "Especialistas".
- Requisito posterior: deixar com a mesma estrutura de `lead-diagnostico`.
- Como o HTML de referência contém "Especialistas", a última solicitação sobrescreveu o estado anterior e trouxe essa seção de volta.

Se necessário, na próxima etapa pode ser feita uma versão "estrutura igual ao lead-diagnostico", porém sem o bloco de "Especialistas".

---

## Atualização posterior — fidelidade ao conteúdo original publicado

### Solicitação
- "Ser fiel ao conteúdo original" de `https://diagnosticoads.metodop4.com.br/`.

### Verificação feita
- Foi capturado o HTML publicado da homepage.
- Identificado que o site online usa um shell HTML enxuto com React montado por bundle:
  - `./ads-assets/ads-DelTht8T.js`
  - `./ads-assets/ads-DIWLxrol.css`

### Ações executadas
1. Download do shell publicado e cópia para os arquivos locais:
   - `tmp_remote_index.html` -> `ads.html`
   - `tmp_remote_index.html` -> `index.html`

2. Download dos assets exatos usados em produção para a pasta local `ads-assets/`:
   - `ads-DelTht8T.js`
   - `ads-DIWLxrol.css`
   - `especialistas-D4VD691H.png`
   - `magalu-OInpqTNw.png`
   - `mercado-livre-BwIUklkS.svg`
   - `video-capa-BZlhIfWe.png`

3. Download dos arquivos de raiz referenciados pelo shell:
   - `01.png`
   - `tracking.js`

### Resultado
- O projeto local agora usa o mesmo shell e os mesmos arquivos centrais de produção, mantendo fidelidade ao conteúdo original publicado.
- Isso inclui a estrutura/fluxo existente no bundle oficial (incluindo seções renderizadas por ele).

---

## Ajuste de direcionamento — conteúdo escrito (não estrutura)

### Pedido recebido
- "conteúdo escrito, não a estrutura"

### Interpretação aplicada
- Manter a estrutura visual/base que estava sendo usada do `lead-diagnostico`.
- Ajustar o texto para ficar alinhado ao conteúdo original do `diagnosticoads.metodop4.com.br`.

### Ações executadas
1. Estrutura base restaurada:
   - `lead-diagnostico/index.html` copiado para `ads.html` e `index.html`.

2. Edição textual ampla em `ads.html` (espelhada em `index.html`):
   - Hero (badge, headline, subtítulo e CTA) com copy do original.
   - Seção de análise com títulos/descrições do conteúdo original.
   - Seção de especialistas com texto alinhado ao original.
   - Seção de vídeo/próximo passo com copy do original.
   - Formulário/modal com labels e opções alinhadas ao original:
     - Nome completo
     - E-mail
     - WhatsApp
     - Confirmar WhatsApp
     - Quanto você investe em publicidade nos marketplaces hoje?
     - Em quais canais
     - Opções de investimento no formato com "/mês".

3. Ajustes funcionais para alinhar com o original:
   - Webhook alterado para:
     - `https://n8n.srv1095468.hstgr.cloud/webhook/DiagnosticoAds`
   - Redirecionamento alterado para:
     - `https://calendar.app.google/zaNXcV4By3HUQuc88`

4. Metadados textuais ajustados:
   - `title` para `DiagnósticoAds`.
   - descrições principais para copy de diagnóstico estratégico gratuito.

### Validação
- Build executado com sucesso (`npm run build`).
- Avisos de caminho codificado em imagens foram mantidos como não bloqueantes.

---

## Remoção solicitada — seção "Especialistas"

### Pedido
- Remover a seção "Especialistas".

### Ação executada
- Removido o bloco HTML da seção dedicada:
  - `<section class="especialistas-sec" id="especialistas"> ... </section>`
- Arquivos atualizados:
  - `ads.html`
  - `index.html`

### Observação
- A remoção foi somente da seção dedicada `id="especialistas"`.
- Menções textuais à palavra "especialistas" podem permanecer em outras seções (ex.: FAQ ou textos descritivos), pois não fazem parte da seção removida.

---

## Ajuste visual — título centralizado no Hero

### Pedido
- Centralizar o título principal do hero.

### Alteração aplicada
- CSS de `.hero h1` atualizado em `ads.html` e `index.html` com:
  - `margin-left: auto;`
  - `margin-right: auto;`
  - `text-align: center;`

### Resultado
- O título principal do hero agora aparece centralizado horizontalmente.
