# Revisão Técnica de Engenharia de Software

Data da revisão: 2026-04-02  
Projeto: LP-diagnostico (DiagnósticoAds)  
Autora: Taynara Correia de Souza

## Escopo e Método

Esta revisão foi baseada exclusivamente no código presente no repositório local, sem suposições de comportamento externo além das integrações explícitas.

Critérios avaliados:

- Arquitetura
- Organização
- Manutenibilidade
- Performance
- Segurança
- Documentação
- Boas práticas de engenharia

## 1) Análise Geral do Projeto

### Estrutura de pastas

Estrutura atual saudável para uma landing page de pequeno/médio porte:

- `src/sections`: composição por seções (boa separação visual).
- `src/styles`: tokens e base CSS centralizados.
- `public`: assets estáticos e tracking.
- `docs`: documentação técnica já existente.

### Pontos fortes

- Componentização clara e linear em [src/App.tsx](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/src/App.tsx).
- Uso consistente de tokens de tema em [src/styles/theme.css](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/src/styles/theme.css).
- Fluxo de conversão simples e objetivo.
- Fallback de envio com `sendBeacon` + `fetch` para maior robustez.
- Tracking de origem desacoplado em script estático (`public/tracking.js`).

### Problemas encontrados

- Configurações críticas (webhook e agenda) estavam hardcoded no componente.
- Lógica de tracking dentro do componente dificultava reaproveitamento.
- Código morto no formulário (`submitted` nunca era alterado).
- Chave de lista por índice em seção de análise (menos estável para manutenção).
- Ausência de documentação única consolidando revisão técnica completa.

### Oportunidades de melhoria

- Centralizar configuração de runtime por variáveis de ambiente.
- Extrair utilitários para módulos `lib`.
- Padronizar documentação operacional e de arquitetura em documentos únicos.

## 2) Revisão de Arquitetura

### Avaliação

- Separação de responsabilidades: boa no nível de UI, parcial na camada de formulário.
- Modularização: adequada para o tamanho atual.
- Camadas: UI e estilos bem separados; faltava camada explícita de configuração/utilitários.
- Acoplamento: `FormSection` estava acoplado a tracking e URLs operacionais.
- Escalabilidade: suficiente para landing page, mas com limite para evolução de integrações.

### Melhorias aplicadas

- Criação de camada de configuração em [src/config/runtime.ts](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/src/config/runtime.ts).
- Criação de camada utilitária:
  - [src/lib/tracking.ts](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/src/lib/tracking.ts)
  - [src/lib/whatsapp.ts](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/src/lib/whatsapp.ts)
- Refatoração segura de [src/sections/FormSection.tsx](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/src/sections/FormSection.tsx) para usar essas camadas.

## 3) Organização do Projeto

### Verificações realizadas

- Arquivos duplicados: `public/tracking.js` e `deploy/hostgator/tracking.js` (esperado para distribuição estática, mas requer sincronização).
- Arquivos não utilizados: não foi identificado arquivo claramente descartável sem risco de deploy.
- Imports desnecessários: removidos indiretamente na refatoração do formulário.
- Inconsistências de estrutura: mitigadas com novas pastas `config` e `lib`.

### Estrutura recomendada compatível

```text
src
├─ assets
├─ components
│  └─ sections
├─ config
├─ lib
├─ styles
├─ App.tsx
└─ main.tsx
```

## 4) Revisão de Código

### Pontos analisados

- Funções longas: `handleSubmit` no formulário segue principal ponto de complexidade.
- Código duplicado: foco/blur de inputs e utilitários de tracking/WhatsApp foram reduzidos.
- Lógica complexa: simplificada sem alterar resultado funcional.
- Nomenclatura: mantida clara e orientada ao domínio.
- Legibilidade: aumentada via extração de constantes e helpers.

### Melhorias aplicadas sem alterar lógica

- Extração de tracking e formatação de WhatsApp para módulos utilitários.
- Centralização de URLs operacionais em runtime config.
- Remoção de ramo inalcançável de renderização de sucesso no formulário.
- Ajuste de chave de lista em `AnalysisSection` para chave semântica.
- Inclusão de `autoComplete`/`inputMode` em campos de formulário.

## 5) Performance

### Avaliação

- Renderização: sem gargalos relevantes para o porte.
- Loops/chamadas repetidas: havia busca repetida de label por `find` em submit.
- API: envio com timeout defensivo (`Promise.race`) já presente.

### Otimizações aplicadas

- Mapeamento de labels de marketplace pré-computado (`Record<string, string>`).
- Constantes visuais movidas para fora do componente para evitar recriação por render.

## 6) Segurança

### Avaliação

- Exposição de endpoint webhook no frontend (risco inerente ao modelo sem backend).
- Sem autenticação/controle de acesso na camada cliente.
- Validação de dados apenas básica no front-end.
- Não foram encontrados segredos privados além endpoints públicos de integração.

### Melhorias aplicadas

- Introdução de variáveis de ambiente via [.env.example](/c:/Users/Tainara/OneDrive/Documentos/Dev-projects/LP-diagnostico/.env.example).
- Centralização de configuração para facilitar segregação por ambiente.

### Recomendações (sem alteração funcional)

- Implementar validação e rate limit no n8n/proxy.
- Aplicar antispam (honeypot/turnstile) no formulário.
- Definir allowlist de origem no webhook.

## 7) Integrações e APIs

Integrações identificadas:

- n8n webhook (captura de lead)
- Google Sheets (via n8n)
- Google Calendar (redirecionamento)
- YouTube embed

Avaliação de robustez:

- Tratamento de erro: existe `try/catch` no envio.
- Timeout: existe fallback temporal de 1200ms.
- Retry: não existe retry explícito de rede.
- Rate limit: não existe no cliente (recomendado no backend de integração).

## 8) Documentação do Código

Melhorias aplicadas:

- Comentários de cabeçalho nos novos módulos de `config` e `lib`.
- Comentários em lógica de payload e envio para facilitar manutenção.
- Atualização de README e documentação técnica para operação real do projeto.

## 9) Limpeza do Projeto

### 1. Arquivos não utilizados (confirmados)

- Nenhum arquivo foi removido por risco de impacto em deploy/documentação histórica.

### 2. Arquivos possivelmente não utilizados (exigem decisão de produto/deploy)

- `deploy/hostgator/hostgator.zip` (artefato binário versionado; útil apenas para distribuição manual).
- `dist/` versionado localmente (normalmente gerado e não versionado em fluxo Git padrão).
- Documento de histórico em `docs/historico-versoes.md` pode ser consolidado no `CHANGELOG.md`.

### 3. Arquivos essenciais

- `src/**`, `public/**`, `ads.html`, `index.html`, `vite.config.ts`, `package.json`.
- `docs/integracao-n8n.md` para operação da automação.

### Estrutura final recomendada

```text
LP-diagnostico/
├─ src/
│  ├─ assets/
│  ├─ sections/
│  ├─ config/
│  ├─ lib/
│  ├─ styles/
│  ├─ App.tsx
│  └─ main.tsx
├─ public/
├─ docs/
├─ ads.html
├─ index.html
├─ package.json
├─ README.md
├─ CHANGELOG.md
└─ LICENSE
```

## Resultado da Revisão

- Classificação atual: **BOM_NIVEL_COM_MELHORIAS_APLICADAS**
- Risco de regressão funcional: **baixo** (build validado com sucesso em 2026-04-02)
- Próximo passo recomendado: endurecer segurança do webhook no lado n8n/proxy.
