import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import Modal from "@/components/sections/Modal";
import MusicSection from "@/components/sections/MusicSection";
import FortniteSection from "@/components/sections/FortniteSection";
import {
  ModalData, GAMES, RECIPES, BOOKS,
  DIFF_COLOR, PARTICLES, BG_URL,
} from "@/components/sections/data";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Index() {
  const [modal, setModal] = useState<ModalData | null>(null);
  const gamesSection    = useInView();
  const foodSection     = useInView();
  const booksSection    = useInView();
  const musicSection    = useInView();
  const fortniteSection = useInView();
  const aboutSection    = useInView();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const openGame   = (g: typeof GAMES[0])   => setModal({ type: "game",   emoji: g.emoji, title: g.title, tag: g.tag, color: g.color, time: g.time, diff: g.diff });
  const openRecipe = (r: typeof RECIPES[0]) => setModal({ type: "recipe", emoji: r.emoji, title: r.title, color: "#fb923c", time: r.time });
  const openBook   = (b: typeof BOOKS[0])   => setModal({ type: "book",   emoji: b.emoji, title: b.title, author: b.author, color: "#b565ff", age: b.age });

  return (
    <>
      {modal && <Modal data={modal} onClose={() => setModal(null)} />}

      <div className="min-h-screen" style={{ color: "#f0f0f8" }}>

        {/* ── Pattern background ──────────────────────── */}
        <div className="fixed inset-0 z-0" style={{
          backgroundImage: `url('${BG_URL}')`,
          backgroundSize: "420px",
          backgroundRepeat: "repeat",
          opacity: 0.18,
        }} />
        <div className="fixed inset-0 z-0" style={{ backgroundColor: "#0d0f1a", opacity: 0.88 }} />

        {/* ── Particles ─────────────────────────────── */}
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
          {PARTICLES.map((p) => (
            <div key={p.id} className="absolute rounded-full"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size,
                backgroundColor: p.color, opacity: p.opacity,
                animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite` }} />
          ))}
          <div className="absolute w-[600px] h-[600px] rounded-full"
            style={{ top: "-5%", left: "-15%", background: "radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)", animation: "blob 10s ease-in-out infinite" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full"
            style={{ top: "35%", right: "-10%", background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)", animation: "blob 12s 3s ease-in-out infinite" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full"
            style={{ bottom: "5%", left: "25%", background: "radial-gradient(circle, rgba(181,101,255,0.05) 0%, transparent 70%)", animation: "blob 9s 6s ease-in-out infinite" }} />
        </div>

        {/* ── HEADER ──────────────────────────────────── */}
        <header className="sticky top-0 z-50 animate-fade-in" style={{
          backgroundColor: "rgba(13,15,26,0.92)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
            <span className="font-black text-xl text-white" style={{ fontFamily: "Unbounded, sans-serif", letterSpacing: "-0.03em" }}>
              Artём<span className="text-[#4ade80]">.space</span>
            </span>
            <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              {[["🎮 Игры","games"],["🍳 Кулинария","food"],["📚 Книги","books"],["🎵 Музыка","music"],["🎯 Фортнайт","fortnite"],["👋 Обо мне","about"]].map(([l,id]) => (
                <button key={id} onClick={() => scrollTo(id as string)} className="transition-colors hover:text-white">{l}</button>
              ))}
            </nav>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ border: "1px solid rgba(74,222,128,0.3)", backgroundColor: "rgba(74,222,128,0.08)" }}>🎮</div>
          </div>
        </header>

        <div className="relative z-10">

          {/* ── HERO ──────────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-5 pt-14 pb-16">
            <div className="animate-fade-in-up delay-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ color: "#4ade80", backgroundColor: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" style={{ animation: "pulse-glow 2s infinite" }} />
              13 лет · Геймер · Повар · Читатель
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
              <div className="flex-1">
                <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight mb-5 text-white"
                  style={{ fontFamily: "Unbounded, sans-serif" }}>
                  Привет,<br />я <span className="shimmer-text">Артём</span> ✌️
                </h1>
                <p className="animate-fade-in-up delay-200 text-lg leading-relaxed mb-8"
                  style={{ color: "rgba(255,255,255,0.65)", maxWidth: "460px" }}>
                  Играю в Rust, Minecraft, Subnautica, CS2, Poppy Playtime и «Героев». Готовлю вкусную еду. Читаю хорошие книги.
                </p>
                <div className="animate-fade-in-up delay-300 flex gap-3 flex-wrap">
                  {([["🎮 Игры","games","#4ade80"],["🍳 Кулинария","food","#fb923c"],["📚 Книги","books","#b565ff"],["👋 Обо мне","about","#60a5fa"]] as [string,string,string][]).map(([label,id,color]) => (
                    <button key={id} onClick={() => scrollTo(id)}
                      className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
                      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30`, color }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="animate-fade-in-up delay-400 flex-shrink-0 self-center">
                <div className="relative w-52 h-52 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full animate-spin-slow"
                    style={{ background: "conic-gradient(from 0deg, #4ade80, #60a5fa, #b565ff, #fb923c, #4ade80)", padding: "2px", borderRadius: "50%" }}>
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: "#0d0f1a" }} />
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-2 animate-float">🎮</div>
                    <div className="font-black text-white text-sm" style={{ fontFamily: "Unbounded, sans-serif" }}>8 игр</div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>в коллекции</div>
                  </div>
                  <div className="absolute -top-2 -right-3 px-2 py-1 rounded-full text-xs font-bold animate-float"
                    style={{ backgroundColor: "#4ade80", color: "#0d0f1a", animationDelay: "1s" }}>Rust</div>
                  <div className="absolute -bottom-2 -left-3 px-2 py-1 rounded-full text-xs font-bold animate-float"
                    style={{ backgroundColor: "#60a5fa", color: "#0d0f1a", animationDelay: "2.5s" }}>Subnautica</div>
                </div>
              </div>
            </div>
          </section>

          {/* ── GAMES ─────────────────────────────────── */}
          <section id="games" ref={gamesSection.ref} className="max-w-5xl mx-auto px-5 py-16">
            <div className={`transition-all duration-700 ${gamesSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(74,222,128,0.55)" }}>— блок 01</div>
                  <h2 className="text-4xl font-black text-white" style={{ fontFamily: "Unbounded, sans-serif" }}>Игры 🎮</h2>
                </div>
                <div className="hidden sm:flex gap-2 flex-wrap justify-end max-w-xs">
                  {["Rust","Minecraft","CS2","Subnautica"].map((g) => (
                    <span key={g} className="px-2 py-1 rounded text-xs"
                      style={{ color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.07)" }}>{g}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {GAMES.map((g, i) => (
                  <div key={i} onClick={() => openGame(g)}
                    className="card-hover cursor-pointer group rounded-2xl p-5"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      animation: gamesSection.visible ? `card-appear 0.5s ${i * 0.07}s ease both` : "none",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${g.color}50`; (e.currentTarget as HTMLElement).style.backgroundColor = `${g.color}0d`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)"; }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{g.emoji}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ color: g.color, backgroundColor: `${g.color}18`, border: `1px solid ${g.color}30` }}>{g.tag}</span>
                    </div>
                    <h3 className="font-black text-white leading-tight mb-1.5"
                      style={{ fontFamily: "Unbounded, sans-serif", fontSize: "0.82rem" }}>{g.title}</h3>
                    <p className="leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem" }}>{g.desc}</p>
                    <div className="flex items-center justify-between" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{g.time}</span>
                        <span style={{ color: DIFF_COLOR[g.diff] }} className="font-semibold">{g.diff}</span>
                      </div>
                      <span className="flex items-center gap-0.5 font-bold" style={{ color: g.color }}>
                        Читать <Icon name="ArrowRight" size={11} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="max-w-5xl mx-auto px-5">
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
          </div>

          {/* ── FOOD ──────────────────────────────────── */}
          <section id="food" ref={foodSection.ref} className="max-w-5xl mx-auto px-5 py-16">
            <div className={`transition-all duration-700 ${foodSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(251,146,60,0.55)" }}>— блок 02</div>
                <h2 className="text-4xl font-black text-white" style={{ fontFamily: "Unbounded, sans-serif" }}>Кулинария 🍳</h2>
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>Нажми на рецепт — покажу как готовить</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RECIPES.map((r, i) => (
                  <div key={i} onClick={() => openRecipe(r)}
                    className="card-hover cursor-pointer group rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      animation: foodSection.visible ? `card-appear 0.5s ${i * 0.1}s ease both` : "none",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,146,60,0.4)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(251,146,60,0.07)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)"; }}
                  >
                    <div className="h-0.5" style={{ background: "linear-gradient(90deg, #fb923c, #facc15)" }} />
                    <div className="p-5 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                        style={{ backgroundColor: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}>
                        {r.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-white text-sm mb-1" style={{ fontFamily: "Unbounded, sans-serif" }}>{r.title}</h3>
                        <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.42)" }}>{r.desc}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}><Icon name="Clock" size={11} />{r.time}</span>
                          <span className="font-semibold" style={{ color: "#4ade80" }}>Легко</span>
                          <span className="ml-auto flex items-center gap-1 font-bold" style={{ color: "#fb923c" }}>Рецепт <Icon name="ArrowRight" size={11} /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="max-w-5xl mx-auto px-5">
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
          </div>

          {/* ── BOOKS ─────────────────────────────────── */}
          <section id="books" ref={booksSection.ref} className="max-w-5xl mx-auto px-5 py-16">
            <div className={`transition-all duration-700 ${booksSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(181,101,255,0.55)" }}>— блок 03</div>
                <h2 className="text-4xl font-black text-white" style={{ fontFamily: "Unbounded, sans-serif" }}>Книги 📚</h2>
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>Нажми — расскажу о чём книга</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BOOKS.map((b, i) => (
                  <div key={i} onClick={() => openBook(b)}
                    className="card-hover cursor-pointer group rounded-2xl p-5 flex flex-col gap-3"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      animation: booksSection.visible ? `card-appear 0.5s ${i * 0.1}s ease both` : "none",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(181,101,255,0.4)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(181,101,255,0.07)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)"; }}
                  >
                    <div className="text-4xl text-center py-2">{b.emoji}</div>
                    <div>
                      <h3 className="font-black text-white text-sm leading-tight mb-1" style={{ fontFamily: "Unbounded, sans-serif" }}>{b.title}</h3>
                      <div className="text-xs font-semibold mb-2" style={{ color: "rgba(181,101,255,0.75)" }}>{b.author}</div>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{b.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "0.75rem" }}>
                      <span className="font-bold" style={{ color: "rgba(181,101,255,0.65)" }}>{b.age}</span>
                      <span className="flex items-center gap-1 font-bold" style={{ color: "#b565ff" }}>О книге <Icon name="ArrowRight" size={11} /></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="max-w-5xl mx-auto px-5">
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
          </div>

          {/* ── MUSIC ─────────────────────────────────── */}
          <MusicSection sectionRef={musicSection} />

          <div className="max-w-5xl mx-auto px-5">
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
          </div>

          {/* ── FORTNITE ──────────────────────────────── */}
          <FortniteSection sectionRef={fortniteSection} />

          <div className="max-w-5xl mx-auto px-5">
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
          </div>

          {/* ── ABOUT ─────────────────────────────────── */}
          <section id="about" ref={aboutSection.ref} className="max-w-5xl mx-auto px-5 py-16 pb-20">
            <div className={`transition-all duration-700 ${aboutSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(96,165,250,0.55)" }}>— блок 05</div>
                <h2 className="text-4xl font-black text-white" style={{ fontFamily: "Unbounded, sans-serif" }}>Обо мне 👋</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="rounded-2xl p-7" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="text-5xl mb-4 animate-float">🧑‍💻</div>
                  <h3 className="font-black text-white text-xl mb-3" style={{ fontFamily: "Unbounded, sans-serif" }}>Привет, я Артём!</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                    Мне 13 лет. Я геймер, кулинар-любитель и книголюб. Этот сайт я сделал, чтобы делиться гайдами по играм, рецептами и книжными советами. Здесь нет нудятины — только то, что реально интересно.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    ["🎮","Играю","Rust, Minecraft\nSubnautica, CS2\nPoppy, HoMM","#4ade80"],
                    ["📚","Читаю","Фантастику\nи приключения","#b565ff"],
                    ["🍳","Готовлю","Быстро\nи вкусно","#fb923c"],
                    ["🏗️","Собираю","Lego\nи конструкторы","#60a5fa"],
                  ] as [string,string,string,string][]).map(([emoji,title,desc,color]) => (
                    <div key={title} className="rounded-xl p-4 transition-transform hover:scale-105"
                      style={{ backgroundColor: `${color}0a`, border: `1px solid ${color}20` }}>
                      <div className="text-2xl mb-2">{emoji}</div>
                      <div className="font-black text-sm mb-1" style={{ color, fontFamily: "Unbounded, sans-serif", fontSize: "0.78rem" }}>{title}</div>
                      <div className="text-xs leading-relaxed whitespace-pre-line" style={{ color: "rgba(255,255,255,0.38)" }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Написать мне */}
                <div className="rounded-2xl p-6 text-center relative overflow-hidden gradient-border"
                  style={{ backgroundColor: "rgba(74,222,128,0.04)" }}>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(74,222,128,0.08) 0%, transparent 70%)" }} />
                  <div className="relative text-3xl mb-3">✉️</div>
                  <h4 className="relative font-black text-white text-sm mb-2" style={{ fontFamily: "Unbounded, sans-serif" }}>Написать мне</h4>
                  <p className="relative text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Хочешь предложить тему для гайда или рецепта?
                  </p>
                  <a href="https://t.me/Doktop9890" target="_blank" rel="noreferrer"
                    className="relative inline-block px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 neon-glow-green"
                    style={{ backgroundColor: "#4ade80", color: "#0d0f1a" }}>
                    Написать ✉️
                  </a>
                </div>

                {/* Донат */}
                <div id="donate" className="rounded-2xl p-6 text-center relative overflow-hidden"
                  style={{ backgroundColor: "rgba(251,191,36,0.04)", border: "1px solid rgba(251,191,36,0.2)" }}>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.07) 0%, transparent 70%)" }} />
                  <div className="relative text-3xl mb-3 animate-float">☕</div>
                  <h4 className="relative font-black text-white text-sm mb-2" style={{ fontFamily: "Unbounded, sans-serif" }}>Поддержать автора</h4>
                  <p className="relative text-xs mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Если сайт нравится — можешь угостить меня кофе ☕ Это помогает делать больше гайдов и рецептов!
                  </p>
                  <div className="relative flex flex-col gap-2">
                    {[
                      { label: "💸 100 руб",          amount: "100"  },
                      { label: "☕ Кофе — 120 руб",   amount: "120"  },
                      { label: "💰 500 руб",           amount: "500"  },
                      { label: "🍕 Пицца — 720 руб",  amount: "720"  },
                      { label: "🎮 Игра — 300 руб",   amount: "300"  },
                      { label: "🏆 1 000 руб",        amount: "1000" },
                      { label: "👑 2 500 руб",        amount: "2500" },
                    ].map((tier) => (
                      <button key={tier.amount}
                        className="w-full px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                        style={{ backgroundColor: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", color: "#fbbf24" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(251,191,36,0.22)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(251,191,36,0.12)"; }}
                      >
                        {tier.label}
                      </button>
                    ))}
                    <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                      Реквизиты появятся после настройки
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FOOTER ──────────────────────────────────── */}
          <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="max-w-5xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
              style={{ color: "rgba(255,255,255,0.22)" }}>
              <span className="font-black" style={{ fontFamily: "Unbounded, sans-serif", color: "rgba(255,255,255,0.38)" }}>
                Artём<span style={{ color: "rgba(74,222,128,0.55)" }}>.space</span>
              </span>
              <span>Сделано с ❤️ Артёмом, 13 лет</span>
              <div className="flex gap-4">
                {[["Игры","games"],["Кулинария","food"],["Книги","books"],["Музыка","music"],["Фортнайт","fortnite"],["Обо мне","about"]].map(([l,id]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="hover:text-white transition-colors">{l}</button>
                ))}
              </div>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}