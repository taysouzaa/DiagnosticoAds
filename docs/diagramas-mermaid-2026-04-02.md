# Diagramas Técnicos

Data: 2026-04-02  
Projeto: DiagnósticoAds

## 1) Diagrama de Arquitetura

### Mermaid

```mermaid
graph TD
  U[Usuario] --> FE[Landing Page React]
  FE --> T[Tracking Script public/tracking.js]
  T --> LS[(localStorage)]
  FE --> W[n8n Webhook]
  W --> GS[Google Sheets]
  FE --> C[Google Calendar]
  FE --> YT[YouTube Embed]
```

### PlantUML

```plantuml
@startuml
actor Usuario
node "Landing Page React" as FE
node "Tracking Script" as T
database "localStorage" as LS
node "n8n Webhook" as W
database "Google Sheets" as GS
node "Google Calendar" as C
node "YouTube" as YT

Usuario --> FE
FE --> T
T --> LS
FE --> W
W --> GS
FE --> C
FE --> YT
@enduml
```

## 2) Diagrama de Fluxo

### Mermaid

```mermaid
sequenceDiagram
  participant U as Usuario
  participant FE as FormSection
  participant TR as Tracking
  participant WB as Webhook n8n
  participant GC as Google Calendar

  U->>FE: Preenche formulario
  FE->>TR: Le origem salva
  FE->>FE: Monta payload
  FE->>WB: sendBeacon (tentativa)
  alt sendBeacon falha
    FE->>WB: fetch no-cors keepalive
  end
  FE->>GC: Redirect para agenda
```

### PlantUML

```plantuml
@startuml
actor Usuario as U
participant FormSection as FE
participant Tracking as TR
participant "Webhook n8n" as WB
participant "Google Calendar" as GC

U -> FE: Preenche formulario
FE -> TR: Le origem salva
FE -> FE: Monta payload
FE -> WB: sendBeacon
alt sendBeacon falha
  FE -> WB: fetch no-cors keepalive
end
FE -> GC: Redirect para agenda
@enduml
```

## 3) Diagrama de Componentes

### Mermaid

```mermaid
flowchart TD
  App[App.tsx] --> Hero[HeroSection]
  App --> Analysis[AnalysisSection]
  App --> Authority[AuthoritySection]
  App --> Scarcity[ScarcitySection]
  App --> Form[FormSection]
  Form --> Config[src/config/runtime.ts]
  Form --> TrackingLib[src/lib/tracking.ts]
  Form --> PhoneLib[src/lib/whatsapp.ts]
```

### PlantUML

```plantuml
@startuml
package "src" {
  [App.tsx] --> [HeroSection]
  [App.tsx] --> [AnalysisSection]
  [App.tsx] --> [AuthoritySection]
  [App.tsx] --> [ScarcitySection]
  [App.tsx] --> [FormSection]
  [FormSection] --> [runtime.ts]
  [FormSection] --> [tracking.ts]
  [FormSection] --> [whatsapp.ts]
}
@enduml
```
