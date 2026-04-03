# DOCUMENTAÇÃO OFICIAL DO PROJETO

## AUTORA

Taynara Correia de Souza

## CONTATO

[taynara.souza.dev@gmail.com](mailto:taynara.souza.dev@gmail.com)  
+55 (19) 93500-3600

---

## Diagrama de Fluxo Principal (Mermaid)

```mermaid
flowchart TD
  A[Usuário acessa ads.html/index.html] --> B[tracking.js inicializa Tracking.init]
  B --> C[Canal e UTMs salvos no localStorage]
  C --> D[React monta App e seções]
  D --> E[Usuário preenche FormSection]
  E --> F[FormSection monta payload com dados + tracking + timestamp]
  F --> G{sendBeacon disponível e enviado?}
  G -- Sim --> H[POST para VITE_LEAD_WEBHOOK_URL]
  G -- Não --> I[Fallback fetch POST no-cors keepalive]
  H --> J[window.location.assign VITE_CALENDAR_URL]
  I --> J
  J --> K[Usuário segue para agenda]
```

---

## Diagrama de Sequência do Submit

```mermaid
sequenceDiagram
  autonumber
  participant U as Usuário
  participant B as Browser
  participant T as Tracking(localStorage)
  participant F as FormSection
  participant N as n8n Webhook
  participant C as Calendar

  U->>B: Acessa landing page
  B->>T: Tracking.init() (URL/referrer)
  U->>F: Preenche e envia formulário
  F->>T: getTrackingData()
  F->>F: Monta payload JSON
  alt sendBeacon retorna true
    F->>N: POST text/plain via sendBeacon
  else sendBeacon indisponível/falha
    F->>N: POST no-cors via fetch keepalive
  end
  F->>B: location.assign(calendarUrl)
  B->>C: Redireciona para agendamento
```

---

## Legenda de Componentes

| Elemento | Descrição |
| --- | --- |
| `tracking.js` | Resolve e persiste origem do tráfego |
| `FormSection` | Núcleo da captura, validação e envio de lead |
| `VITE_LEAD_WEBHOOK_URL` | Endpoint de entrada da automação |
| `VITE_CALENDAR_URL` | Destino final da navegação após submit |
