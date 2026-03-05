# DiagnósticoAds — Landing Page

Landing page de alta conversão para diagnóstico estratégico de anúncios em marketplaces (Mercado Livre, Shopee e Amazon).

## Visão Geral
Esta página foi projetada para guiar o usuário por uma jornada clara: apresentar a proposta, mostrar autoridade, explicar o diagnóstico em vídeo e direcionar para o formulário com CTA direto.

## Principais Seções
- Hero com CTA direto para o formulário
- O que será analisado (lista clara de pontos de diagnóstico)
- Especialistas e marketplaces atendidos
- Vídeo explicativo + escassez de horários
- Formulário com redirecionamento ao Calendly
- Encerramento com agradecimento

## Stack
- React + TypeScript
- Vite
- Tailwind CSS (utilitários)

## Como rodar localmente
1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Build de produção:
```bash
npm run build
```

4. Pré-visualização do build:
```bash
npx vite preview
```

## Personalizações rápidas
- **URL do Calendly**: `src/app/components/FormSection.tsx`
- **Capa do vídeo**: `src/assets/video-capa.png`
- **Foto dos especialistas**: `src/assets/especialistas.png`
- **Logos dos marketplaces**: `src/assets/logos/`
- **Cores e fundo**: `src/styles/theme.css` (variáveis `--lp-*`)

## Estrutura relevante
- `src/app/App.tsx`
- `src/app/components/HeroSection.tsx`
- `src/app/components/AnalysisSection.tsx`
- `src/app/components/AuthoritySection.tsx`
- `src/app/components/ScarcitySection.tsx`
- `src/app/components/FormSection.tsx`
- `src/app/components/FinalCTASection.tsx`
- `src/styles/theme.css`

## Responsividade
O layout foi ajustado para mobile e desktop, com seções em tela cheia e espaçamentos otimizados para leitura por blocos.

## Desenvolvedora 
Taynara Souza

## Licença
Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE`.
