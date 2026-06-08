# LP Diagnóstico — Documento Técnico

## Visão Geral

Landing page para captação de leads do diagnóstico gratuito de Ads em marketplaces (funil `diagnostico-organico`). Ao converter, o lead é registrado em Google Sheets via n8n e redirecionado para agendamento.

URL de produção: `https://diagnosticoads.metodop4.com.br`

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML + CSS + JavaScript |
| Build | Vite 6 |
| Automação | n8n Webhook |
| Deploy | Vercel / HostGator |

## Estrutura

```
LP-diagnostico/
├── index.html              # Source (dev)
├── ads.html                # Variante para tráfego pago
├── dist/                   # Build Vite (para deploy)
├── assets/
├── fonts/
├── diagnostico-organico-tay/   # Variante orgânica
├── deploy/
└── docs/
```

## Fluxo de conversão

1. Lead acessa LP (orgânica ou paga)
2. Preenche formulário
3. n8n registra lead em 3 abas do Google Sheets: Organico, Banco de Dados e CRM Geral
4. Redirecionamento para link de agendamento

## Build e deploy

```bash
# Dev
npm install
npm run dev

# Build para produção
npm run build   # gera dist/

# Deploy Vercel
vercel --prod

# Deploy HostGator
# Fazer upload do conteúdo de dist/ via FTP
```

## Variantes

- `index.html` — tráfego orgânico
- `ads.html` — tráfego pago (Google/Meta Ads)
- `diagnostico-organico-tay/` — variante personalizada
