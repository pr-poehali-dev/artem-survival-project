import Icon from "@/components/ui/icon";
import { ModalData, GAME_DETAILS, RECIPE_DETAILS, BOOK_DETAILS } from "./data";

interface Props {
  data: ModalData;
  onClose: () => void;
}

export default function Modal({ data, onClose }: Props) {
  const accentColor = data.color;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden animate-fade-in-up max-h-[85vh] overflow-y-auto"
        style={{ backgroundColor: "#0f1120", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={e => e.stopPropagation()}>
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }} />
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: `${accentColor}12`, border: `1px solid ${accentColor}25` }}>
              {data.emoji}
            </div>
            <div>
              {data.tag && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-1 inline-block"
                  style={{ color: accentColor, backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}30` }}>
                  {data.tag}
                </span>
              )}
              {data.author && (
                <div className="text-xs font-semibold mb-1" style={{ color: `${accentColor}` }}>{data.author}</div>
              )}
              <h2 className="font-black text-white text-lg leading-tight" style={{ fontFamily: "Unbounded, sans-serif", fontSize: "1rem" }}>
                {data.title}
              </h2>
              <div className="flex gap-3 mt-1 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {data.time && <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{data.time}</span>}
                {data.diff && <span style={{ color: data.diff === "Легко" ? "#4ade80" : data.diff === "Средне" ? "#fb923c" : "#f87171" }} className="font-semibold">{data.diff}</span>}
                {data.age && <span className="font-bold" style={{ color: accentColor }}>{data.age}</span>}
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 flex-shrink-0 ml-auto"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              <Icon name="X" size={16} />
            </button>
          </div>

          {data.type === "game" && GAME_DETAILS[data.title] && (() => {
            const d = GAME_DETAILS[data.title];
            return (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `${accentColor}70` }}>Пошаговый гайд</div>
                <div className="flex flex-col gap-3 mb-5">
                  {d.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-xl"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black"
                        style={{ backgroundColor: `${accentColor}20`, color: accentColor, minWidth: 20 }}>
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${accentColor}0a`, border: `1px solid ${accentColor}25` }}>
                  <div className="text-xs font-bold mb-1" style={{ color: accentColor }}>💡 Совет от Артёма</div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{d.tip}</p>
                </div>
              </div>
            );
          })()}

          {data.type === "recipe" && RECIPE_DETAILS[data.title] && (() => {
            const d = RECIPE_DETAILS[data.title];
            return (
              <div>
                <div className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(251,146,60,0.7)" }}>Что понадобится</div>
                  <div className="flex flex-wrap gap-2">
                    {d.ingredients.map((ing, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)", color: "rgba(255,255,255,0.8)" }}>
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(251,146,60,0.7)" }}>Как готовить</div>
                <div className="flex flex-col gap-3">
                  {d.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-xl"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black"
                        style={{ backgroundColor: "rgba(251,146,60,0.2)", color: "#fb923c", minWidth: 20 }}>
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {data.type === "book" && BOOK_DETAILS[data.title] && (() => {
            const d = BOOK_DETAILS[data.title];
            return (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(181,101,255,0.7)" }}>О чём книга</div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>{d.review}</p>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(181,101,255,0.7)" }}>Почему стоит читать</div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>{d.why}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(181,101,255,0.07)", border: "1px solid rgba(181,101,255,0.2)" }}>
                  <div className="text-xs font-bold mb-2" style={{ color: "#b565ff" }}>✨ Цитата</div>
                  <p className="text-sm italic leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{d.quote}</p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
