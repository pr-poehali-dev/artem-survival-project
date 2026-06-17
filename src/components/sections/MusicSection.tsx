import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MUSIC_GENRES, KURT_COBAIN } from "./data";

interface UseInViewResult {
  ref: React.RefObject<HTMLDivElement>;
  visible: boolean;
}

interface Props {
  sectionRef: UseInViewResult;
}

export default function MusicSection({ sectionRef }: Props) {
  const [expandedMusic, setExpandedMusic] = useState<string | null>(null);
  const [playingTrack, setPlayingTrack] = useState<{ ytId: string; title: string; color: string; vkSearch?: string } | null>(null);
  const [ytError, setYtError] = useState(false);

  return (
    <section id="music" ref={sectionRef.ref} className="max-w-5xl mx-auto px-5 py-16">
      <div className={`transition-all duration-700 ${sectionRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(248,113,113,0.55)" }}>— блок 04</div>
          <h2 className="text-4xl font-black text-white" style={{ fontFamily: "Unbounded, sans-serif" }}>Музыка 🎵</h2>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>Нажми на трек — он заиграет прямо здесь</p>
        </div>

        {/* Mini player */}
        {playingTrack && (
          <div className="mb-6 rounded-2xl overflow-hidden animate-fade-in-up" style={{ border: `1px solid ${playingTrack.color}40`, backgroundColor: `${playingTrack.color}08` }}>
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${playingTrack.color}20` }}>
              <span className="text-lg animate-float">🎵</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{playingTrack.title}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>Сейчас играет</div>
              </div>
              <button onClick={() => setPlayingTrack(null)} className="text-xs px-3 py-1 rounded-full transition-colors hover:bg-white/10"
                style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
                ✕ Стоп
              </button>
            </div>
            {ytError ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 px-6">
                <div className="text-4xl">😔</div>
                <div className="text-center">
                  <div className="font-bold text-white text-sm mb-1">YouTube заблокирован</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Открой трек в другом месте</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                  <a href={`https://vk.com/audio?q=${encodeURIComponent(playingTrack.title)}`} target="_blank" rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: "#4680c2", border: "1px solid rgba(70,128,194,0.5)" }}>
                    🎵 VK Музыка
                  </a>
                  <a href={`https://music.yandex.ru/search?text=${encodeURIComponent(playingTrack.title)}`} target="_blank" rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                    style={{ backgroundColor: "rgba(255,204,0,0.15)", border: "1px solid rgba(255,204,0,0.4)", color: "#ffcc00" }}>
                    🎶 Яндекс Музыка
                  </a>
                </div>
              </div>
            ) : (
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  key={playingTrack.ytId}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${playingTrack.ytId}?autoplay=1&rel=0`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={playingTrack.title}
                  onError={() => setYtError(true)}
                />
                <div className="absolute bottom-2 right-2 z-10">
                  <button onClick={() => setYtError(true)}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.4)" }}>
                    Не работает?
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Genre accordions */}
        <div className="flex flex-col gap-3 mb-10">
          {MUSIC_GENRES.map((m, i) => {
            const isOpen = expandedMusic === m.genre;
            return (
              <div key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? `${m.color}0d` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isOpen ? m.color + "40" : "rgba(255,255,255,0.08)"}`,
                  animation: sectionRef.visible ? `card-appear 0.4s ${i * 0.08}s ease both` : "none",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpandedMusic(isOpen ? null : m.genre)}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}25` }}>
                    {m.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-black text-white text-sm" style={{ fontFamily: "Unbounded, sans-serif" }}>{m.genre}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ color: m.color, backgroundColor: `${m.color}15`, border: `1px solid ${m.color}25` }}>
                        {m.tracks.length} трека
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{m.desc}</p>
                  </div>
                  <div className="hidden sm:flex gap-1.5 flex-shrink-0">
                    {m.artists.slice(0, 2).map((a) => (
                      <span key={a} className="text-xs px-2 py-0.5 rounded-full" style={{ color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.07)" }}>{a}</span>
                    ))}
                  </div>
                  <div className="flex-shrink-0 ml-2 transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: m.color }}>
                    <Icon name="ChevronDown" size={18} />
                  </div>
                </div>

                {/* Tracks list */}
                {isOpen && (
                  <div className="px-4 pb-5" style={{ borderTop: `1px solid ${m.color}20` }}>
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${m.color}80` }}>▶ Нажми — заиграет</div>
                        <div className="flex flex-col gap-2">
                          {m.tracks.map((t, ti) => {
                            const isPlaying = playingTrack?.ytId === t.ytId;
                            return (
                              <button key={ti}
                                onClick={() => { setYtError(false); setPlayingTrack(isPlaying ? null : { ytId: t.ytId, title: t.title, color: m.color }); }}
                                className="flex items-center gap-3 p-2.5 rounded-xl w-full text-left transition-all duration-200 group"
                                style={{
                                  backgroundColor: isPlaying ? `${m.color}20` : "rgba(255,255,255,0.03)",
                                  border: `1px solid ${isPlaying ? m.color + "50" : "rgba(255,255,255,0.05)"}`,
                                }}
                              >
                                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 transition-all"
                                  style={{ backgroundColor: isPlaying ? m.color : `${m.color}20`, color: isPlaying ? "#0d0f1a" : m.color }}>
                                  {isPlaying ? "⏸" : "▶"}
                                </span>
                                <span className="text-xs flex-1" style={{ color: isPlaying ? "white" : "rgba(255,255,255,0.65)" }}>{t.title}</span>
                                {isPlaying && <span className="text-xs font-bold animate-pulse" style={{ color: m.color }}>играет</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${m.color}80` }}>💡 Когда слушать</div>
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>{m.vibe}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${m.color}80` }}>🎤 Артисты</div>
                          <div className="flex flex-wrap gap-2">
                            {m.artists.map((a) => (
                              <span key={a} className="px-3 py-1 rounded-full text-xs font-semibold"
                                style={{ backgroundColor: `${m.color}12`, border: `1px solid ${m.color}25`, color: "rgba(255,255,255,0.8)" }}>
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Курт Кобейн Bio */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(248,113,113,0.25)", backgroundColor: "rgba(248,113,113,0.04)" }}>
          <div className="h-1" style={{ background: "linear-gradient(90deg, #f87171, #fb923c, #f87171)" }} />
          <div className="p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.25)" }}>
                🎸
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(248,113,113,0.6)" }}>Легенда рока</div>
                <h3 className="font-black text-white text-xl" style={{ fontFamily: "Unbounded, sans-serif" }}>{KURT_COBAIN.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
                  <span>{KURT_COBAIN.years}</span>
                  <span style={{ color: "#f87171" }}>•</span>
                  <span>{KURT_COBAIN.role}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {KURT_COBAIN.facts.map((fact, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black"
                    style={{ backgroundColor: "rgba(248,113,113,0.2)", color: "#f87171", minWidth: 20 }}>{i + 1}</span>
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>{fact}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}>
              <div className="text-xs font-bold mb-1.5" style={{ color: "#f87171" }}>✨ Цитата</div>
              <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.72)" }}>{KURT_COBAIN.quote}</p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(248,113,113,0.6)" }}>Наследие</div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{KURT_COBAIN.legacy}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
