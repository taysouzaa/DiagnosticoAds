# DOCUMENTAÇÃO OFICIAL DO PROJETO

## AUTORA

Taynara Correia de Souza

## CONTATO

[taynara.souza.dev@gmail.com](mailto:taynara.souza.dev@gmail.com)  
+55 (19) 93500-3600

---

## Escopo da Revisão

Revisão técnica baseada no código-fonte atual do repositório, com foco em decisões de engenharia, padrões adotados e débitos técnicos priorizados.

---

## Decisões Técnicas Identificadas

| Decisão | Evidência no código | Justificativa técnica |
| --- | --- | --- |
| Componentização por seções de negócio | `src/sections/*.tsx` | Favorece manutenção e evolução da narrativa da landing |
| Configuração por ambiente com fallback | `src/config/runtime.ts` | Permite mudar URLs sem alterar código |
| Tracking desacoplado em script de bootstrap | `public/tracking.js` + `src/lib/tracking.ts` | Garante captura de origem antes da inicialização React |
| Envio resiliente de lead | `navigator.sendBeacon` com fallback `fetch keepalive` em `FormSection.tsx` | Reduz perda de evento durante redirecionamento |
| Estilo híbrido (Tailwind + inline style) | `src/styles/*` e objetos inline nos componentes | Entrega rápida de UI e controle visual fino |
| Build orientado a arquivo de entrada específico | `vite.config.ts` (`ads.html`) | Adequação ao cenário de landing estática |

---

## Padrões e Bibliotecas

| Categoria | Escolha atual | Observação |
| --- | --- | --- |
| UI | React 18 + função componente | Padrão moderno e adequado para SPA curta |
| Build | Vite 6 | Ciclo rápido de desenvolvimento/build |
| Estilo | Tailwind v4 + CSS de tema + inline styles | Funciona, mas aumenta dispersão de responsabilidade visual |
| Estado | `useState` local | Simples e suficiente para o escopo atual |
| Integração | Webhook HTTP direto no cliente | Baixo custo de implementação, maior exposição operacional |

---

## Débitos Técnicos e Pontos de Melhoria

| Severidade | Item | Impacto | Evidência |
| --- | --- | --- | --- |
| Alta | Endpoint de webhook exposto no cliente | Risco de abuso, spam e tráfego malicioso | `src/config/runtime.ts`, `FormSection.tsx` |
| Alta | Tratamento silencioso de exceções (`catch {}`) | Perda de observabilidade e diagnóstico | `FormSection.tsx`, `tracking.js` |
| Alta | Ausência de backend/proxy para validação do payload | Sem autenticação, rate limiting e assinatura de origem | Arquitetura atual front-only |
| Média | Chave de payload com espaço final (`"Nome completo "`) | Contrato frágil e propenso a erro em integrações futuras | `FormSection.tsx` |
| Média | Sem testes automatizados (unitários/e2e) | Risco de regressão em copy, validação e conversão | Repositório sem suíte de testes |
| Média | Mistura de estilo inline e utilitários | Manutenção visual menos previsível | `src/sections/*.tsx` |
| Média | Duplicação de artefatos de deploy no repositório | Aumenta ruído e risco de divergência entre fontes e build | `deploy/hostgator/ads-assets/*` |
| Baixa | Script global em `window` para tracking | Acoplamento global e difícil tipagem/futuro refactor | `public/tracking.js` |

---

## Recomendações Prioritárias

### Curto prazo (1 sprint)

1. Introduzir observabilidade mínima (ex.: captura de erro de submit + logs estruturados no n8n).
2. Normalizar contrato de payload (remover fragilidade de nomes de campo).
3. Criar teste de fumaça para fluxo de submit e redirecionamento.

### Médio prazo (2 a 3 sprints)

1. Inserir proxy/backend leve para proteger webhook com autenticação e rate limiting.
2. Consolidar estratégia de estilos (reduzir inline styles críticos).
3. Definir pipeline de CI com validação de build e lint.

---

## Conclusão Técnica

A base atual é funcional e objetiva para conversão de landing page, com boa separação por domínio de tela. O principal risco está na camada operacional/segurança de integração (webhook público) e na ausência de observabilidade. A evolução recomendada é fortalecer confiabilidade e governança sem alterar a simplicidade do fluxo principal.
