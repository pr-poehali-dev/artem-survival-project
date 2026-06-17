import { FORTNITE_DATA } from "./data";

interface UseInViewResult {
  ref: React.RefObject<HTMLDivElement>;
  visible: boolean;
}

interface Props {
  sectionRef: UseInViewResult;
}

export default function FortniteSection({ sectionRef }: Props) {
  return (
    <section id="fortnite" ref={sectionRef.ref} className="max-w-5xl mx-auto px-5 py-16">
      <div className={`transition-all duration-700 ${sectionRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(167,139,250,0.6)" }}>— для брата</div>
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black text-white" style={{ fontFamily: "Unbounded, sans-serif" }}>Fortnite</h2>
            <span className="text-4xl">🎯</span>
          </div>
          <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>Гайды, советы, оружие и скины — всё что надо знать</p>
        </div>

        {/* Banner + карта */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative rounded-2xl overflow-hidden p-7"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.05) 50%, rgba(167,139,250,0.1) 100%)", border: "1px solid rgba(124,58,237,0.35)" }}>
            <div className="absolute top-0 right-0 text-[120px] leading-none select-none pointer-events-none" style={{ opacity: 0.08 }}>🎯</div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ backgroundColor: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", color: "#a78bfa" }}>
                ⚡ Battle Royale · 100 игроков · 1 победитель
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Фортнайт — это не просто стрелялка. Это строительство, стратегия и быстрые реакции одновременно. Здесь нужно уметь всё: строить, целиться и думать быстрее противника.
              </p>
            </div>
          </div>

          {/* Карта */}
          <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.35)", minHeight: 220 }}>
            <img
              src="https://cdn.poehali.dev/projects/06505539-a43e-4fc8-b125-1c85c59141c8/bucket/6b9165de-d715-4811-9d7b-305a8d35ce7b.png"
              alt="Карта Фортнайта"
              className="w-full h-full object-cover"
              style={{ minHeight: 220 }}
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(13,15,26,0.7) 0%, transparent 50%)" }} />
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-xs font-bold" style={{ color: "#a78bfa" }}>🗺️ Карта острова</span>
            </div>
          </div>
        </div>

        {/* Tips + Weapons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Tips */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(167,139,250,0.6)" }}>🎓 Советы выжившего</div>
            <div className="flex flex-col gap-3">
              {FORTNITE_DATA.tips.map((tip, i) => (
                <div key={i}
                  className="flex gap-3 items-start p-3.5 rounded-xl card-hover"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    animation: sectionRef.visible ? `card-appear 0.4s ${i * 0.07}s ease both` : "none",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(124,58,237,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)"; }}
                >
                  <span className="text-xl flex-shrink-0">{tip.emoji}</span>
                  <div>
                    <div className="font-black text-white text-xs mb-0.5" style={{ fontFamily: "Unbounded, sans-serif" }}>{tip.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{tip.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weapons + Skins */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(167,139,250,0.6)" }}>🔫 Топ оружие</div>
              <div className="grid grid-cols-2 gap-3">
                {FORTNITE_DATA.weapons.map((w, i) => (
                  <div key={i} className="p-3.5 rounded-xl card-hover"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      animation: sectionRef.visible ? `card-appear 0.4s ${i * 0.08 + 0.2}s ease both` : "none",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(124,58,237,0.07)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)"; }}
                  >
                    <div className="text-2xl mb-2">{w.emoji}</div>
                    <div className="font-black text-white text-xs mb-0.5" style={{ fontFamily: "Unbounded, sans-serif" }}>{w.name}</div>
                    <div className="text-xs mb-1.5" style={{ color: "#a78bfa" }}>{w.type}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(167,139,250,0.6)" }}>👕 Культовые скины</div>
              <div className="flex flex-wrap gap-2">
                {FORTNITE_DATA.skins.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ backgroundColor: `${s.color}10`, border: `1px solid ${s.color}25` }}>
                    <span>{s.emoji}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{s.name}</div>
                      <div className="text-xs" style={{ color: s.color }}>{s.rarity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seasons timeline */}
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(167,139,250,0.6)" }}>📅 Эпохи Фортнайта</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FORTNITE_DATA.seasons.map((s, i) => (
              <div key={i} className="p-4 rounded-xl card-hover"
                style={{
                  backgroundColor: "rgba(124,58,237,0.05)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  animation: sectionRef.visible ? `card-appear 0.5s ${i * 0.1}s ease both` : "none",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(124,58,237,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(124,58,237,0.05)"; }}
              >
                <div className="text-3xl mb-3">{s.emoji}</div>
                <div className="font-black text-white text-sm mb-0.5" style={{ fontFamily: "Unbounded, sans-serif", fontSize: "0.8rem" }}>{s.name}</div>
                <div className="text-xs font-semibold mb-2" style={{ color: "#a78bfa" }}>{s.era}</div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
