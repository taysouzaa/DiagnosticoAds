import { useState } from "react";
import videoCover from "../../assets/video-capa.png";

export function ScarcitySection() {
  const videoId = "ZP3qVjw32es";
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6" style={{ background: "var(--lp-bg)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className="text-white"
            style={{ fontSize: "clamp(1.4rem, 3.6vw, 2.1rem)", fontWeight: 800, lineHeight: 1.25 }}
          >
            Assista ao vídeo e entenda o próximo passo da sua análise
          </h2>
          <p
            className="mt-3"
            style={{ color: "var(--lp-muted)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.7 }}
          >
            O vídeo explica como funciona o diagnóstico e, ao lado, você vê a disponibilidade de horários.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-10 items-center">
          {/* Video */}
          <div className="relative">
            <div
              className="relative w-full aspect-video overflow-hidden rounded-3xl"
              style={{
                background: "#0F151B",
                boxShadow: "0 18px 45px rgba(0,0,0,0.35)",
                border: "1px solid var(--lp-border)",
              }}
            >
              {isPlaying ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="Vídeo diagnóstico"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 w-full h-full"
                  aria-label="Assistir ao vídeo"
                >
                  <img
                    src={videoCover}
                    alt="Capa do vídeo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Card (smaller) */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative overflow-hidden rounded-3xl p-6 md:p-8 text-center w-full max-w-md"
              style={{
                background: "linear-gradient(135deg, rgba(22,32,22,0.95) 0%, var(--lp-bg) 50%, rgba(22,32,22,0.95) 100%)",
                border: "1px solid rgba(86,213,79,0.25)",
              }}
            >
              {/* Glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, var(--lp-accent-2), transparent)" }}
              />

              {/* Badge */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
                  style={{
                    background: "rgba(186,255,0,0.12)",
                    color: "var(--lp-accent)",
                    border: "1px solid rgba(186,255,0,0.35)",
                  }}
                >
                  <span className="w-2 h-2 rounded-full " style={{ background: "var(--lp-accent)" }} />
                  Vagas Limitadas
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-white mb-4"
                style={{ fontSize: "clamp(1.1rem, 3vw, 1.55rem)", fontWeight: 800, lineHeight: 1.3 }}
              >
                Para garantir profundidade na análise, liberamos apenas{" "}
                <span style={{ color: "var(--lp-accent)" }}>3 horários por dia.</span>
              </h2>

              {/* Body */}
              <p
                style={{
                  color: "var(--lp-muted)",
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  lineHeight: 1.75,
                  margin: "0 auto 1.5rem",
                }}
              >
                Quando as agendas fecham, novas vagas são abertas conforme disponibilidade. Se você está
                vendo essa página, ainda há horários disponíveis.
              </p>

              {/* Bottom note */}
              <p style={{ color: "var(--lp-accent)", fontSize: "0.8rem" }}>
                ✦ Análise realizada por especialistas — não é sistema automatizado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
