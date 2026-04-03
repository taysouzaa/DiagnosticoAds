# DOCUMENTAÇÃO OFICIAL DO PROJETO

## AUTORA

Taynara Correia de Souza

## CONTATO

[taynara.souza.dev@gmail.com](mailto:taynara.souza.dev@gmail.com)  
+55 (19) 93500-3600

---

## Escopo Operacional

Este documento cobre operação do projeto em desenvolvimento e publicação estática (Vercel/HostGator), incluindo rotas, comandos e monitoramento de erros.

---

## Rotas e Endpoints

### 1) Rotas de aplicação (estáticas / rewrite)

| Rota | Método | Finalidade | Origem da regra |
| --- | --- | --- | --- |
| `/ads.html` | GET | Entrada principal da landing no build | `vite.config.ts` + `.htaccess` |
| `/youtube` | GET | Atalho de canal, reescreve para `/?channel=youtube` | `public/htaccess-hostgator.txt` e `deploy/hostgator/htaccess.txt` |
| `/instagram` | GET | Atalho de canal, reescreve para `/?channel=instagram` | `public/htaccess-hostgator.txt` e `deploy/hostgator/htaccess.txt` |
| `/ads-assets/*` | GET | Assets do build | `vite.config.ts` (`assetsDir`) |

### 2) Endpoints externos consumidos

| Endpoint | Método | Uso no sistema | Configuração |
| --- | --- | --- | --- |
| `VITE_LEAD_WEBHOOK_URL` | POST | Recebimento de lead no n8n | `src/config/runtime.ts` |
| `VITE_CALENDAR_URL` | GET (redirect) | Continuação do fluxo para agendamento | `src/config/runtime.ts` |
| `https://www.youtube.com/embed/{id}` | GET | Exibição de vídeo na seção de escassez | `src/sections/ScarcitySection.tsx` |

Observação: não existe API interna (backend próprio) neste repositório.

---

## Scripts de Execução

| Script | Comando | Resultado |
| --- | --- | --- |
| Desenvolvimento | `npm run dev` | Sobe servidor Vite local |
| Build | `npm run build` | Gera artefatos em `dist/` com entrada em `ads.html` |
| Pós-build | `npm run postbuild` | Copia `dist/ads.html` para `dist/index.html` |

Fluxo operacional recomendado:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Validação de build antes de publicar:

```bash
npm run build
```

---

## Build e Deploy

| Ambiente | Estratégia | Arquivos-chave |
| --- | --- | --- |
| Vercel | Build estático por `npm run build`, saída em `dist` | `vercel.json` |
| HostGator | Publicação manual de artefato estático + regras Apache | `deploy/hostgator/*`, `public/htaccess-hostgator.txt` |

Checklist de publicação:

1. Confirmar `.env.local` correto para ambiente alvo.
2. Executar `npm run build`.
3. Validar existência de `dist/ads.html` e `dist/index.html`.
4. Publicar conteúdo de `dist/` ou pacote em `deploy/hostgator/`.
5. Testar rotas `/youtube` e `/instagram` com parâmetros UTM.

---

## Monitoramento de Erros

Estado atual: não há ferramenta de observabilidade embutida no front-end (sem Sentry/Datadog/etc.). O tratamento de erro no envio de lead é silencioso por desenho (`catch {}`), então o monitoramento deve ser externo.

| Fonte de erro | Como monitorar | Ação operacional |
| --- | --- | --- |
| Envio para webhook | Histórico de execuções no n8n | Verificar falhas de workflow, timeout e payload inválido |
| Falhas de front-end | Console e aba Network do navegador | Inspecionar erro JS e requests bloqueadas |
| Rewrites Apache | Logs de acesso/erro do host | Confirmar regras `.htaccess` e `DirectoryIndex` |
| Deploy Vercel | Dashboard de deploy/build | Revisar falhas de build e assets não encontrados |

Comandos úteis de diagnóstico local:

```bash
# localizar pontos com tratamento silencioso de exceção
rg -n "catch \\{\\}" src public

# localizar endpoints e integrações externas
rg -n "https?://|sendBeacon|fetch\\(" src public
```

Indicadores mínimos recomendados para operação corporativa:

1. Taxa de envio de lead por visita.
2. Taxa de erro de webhook (HTTP/network/workflow).
3. Tempo médio entre submit e redirecionamento.
4. Taxa de tráfego por canal (`channel`, `utm_source`, `utm_campaign`).
