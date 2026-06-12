import { useState } from "react";
import Icon from "@/components/ui/icon";

const GAMES = [
  { emoji: "⛏️", tag: "Minecraft", color: "#4ade80", title: "Лучшая база для выживания", desc: "Защищённая база с фермой и порталом уже в первую неделю.", time: "8 мин", difficulty: "Средне" },
  { emoji: "🌊", tag: "Subnautica", color: "#60a5fa", title: "Выживание в глубинах", desc: "Первые 3 часа: ресурсы, кислород, синий планшет.", time: "12 мин", difficulty: "Сложно" },
  { emoji: "🔥", tag: "Rust", color: "#fb923c", title: "Первая ночь в Rust", desc: "Хижина, ресурсы и как не умереть от мародёров.", time: "10 мин", difficulty: "Сложно" },
  { emoji: "🎯", tag: "CS2", color: "#facc15", title: "Топ-5 советов новичку", desc: "Прицел, отдача, движение и коммуникация.", time: "5 мин", difficulty: "Легко" },
  { emoji: "🌱", tag: "Новичкам", color: "#4ade80", title: "С чего начать в Minecraft", desc: "Первая ночь, дерево, крафт, укрытие до рассвета.", time: "7 мин", difficulty: "Легко" },
  { emoji: "🪓", tag: "Новичкам", color: "#fb923c", title: "Rust для самых новеньких", desc: "Крафт, строительство, первые безопасные ресурсы.", time: "11 мин", difficulty: "Легко" },
];

const RECIPES = [
  { emoji: "🍝", title: "Паста за 15 минут", desc: "Карбонара — минимум ингредиентов, максимум вкуса.", time: "15 мин", level: "Легко" },
  { emoji: "🥪", title: "Тосты геймера", desc: "Хрустящие тосты с яйцом и беконом перед сессией.", time: "10 мин", level: "Легко" },
  { emoji: "🥤", title: "Энергетический смузи", desc: "Банан, овёс, молоко и мёд — заряд на несколько часов.", time: "5 мин", level: "Легко" },
  { emoji: "🍳", title: "Яичница с сыром", desc: "Простой и быстрый перекус в любое время суток.", time: "7 мин", level: "Легко" },
];

const BOOKS = [
  { emoji: "📖", title: "Первый игрок готовься", author: "Эрнест Клайн", desc: "Виртуальный мир, загадки и эпичные отсылки к играм 80-х.", age: "12+", type: "Роман" },
  { emoji: "🏹", title: "Голодные игры", author: "Сюзанна Коллинз", desc: "Выживание, стратегия и борьба за жизнь — как в survival-играх.", age: "12+", type: "Трилогия" },
  { emoji: "🚀", title: "Марсианин", author: "Энди Вейр", desc: "Человек выживает на Марсе с помощью науки и смекалки.", age: "13+", type: "Роман" },
  { emoji: "🌌", title: "Автостопом по Галактике", author: "Дуглас Адамс", desc: "Смешная и умная книга про приключения в космосе.", age: "12+", type: "Серия" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen text-[#1a1a1a]"
      style={{
        backgroundColor: "#0f1f13",
        backgroundImage: `url('https://cdn.poehali.dev/projects/06505539-a43e-4fc8-b125-1c85c59141c8/bucket/41259bf8-2d8b-4670-b7a7-979f80545e3c.PNG')`,
        backgroundSize: "600px",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen" style={{ backgroundColor: "rgba(10,20,12,0.82)" }}>

        {/* HEADER */}
        <header className="sticky top-0 z-50" style={{ backgroundColor: "rgba(10,20,12,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(212,200,160,0.15)" }}>
          <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
            <span className="font-black text-xl tracking-tight text-[#d4c8a0]" style={{ fontFamily: 'Unbounded, sans-serif', letterSpacing: "-0.03em" }}>
              Artём<span className="text-[#4ade80]">.space</span>
            </span>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[#d4c8a0]/60">
              {[["Игры","games"],["Кулинария","food"],["Книги","books"],["Обо мне","about"]].map(([l, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#d4c8a0] transition-colors">{l}</button>
              ))}
            </nav>
            <div className="w-8 h-8 rounded-full border border-[#4ade80]/40 flex items-center justify-center text-sm">🎮</div>
          </div>
        </header>

        {/* HERO */}
        <section className="max-w-5xl mx-auto px-5 pt-16 pb-12">
          <div className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full text-xs font-semibold text-[#4ade80]" style={{ backgroundColor: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              13 лет · Геймер · Повар · Читатель
            </div>
            <h1 className="text-5xl sm:text-7xl font-black leading-[0.95] tracking-tight text-[#d4c8a0]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              Привет,<br />я <span className="text-[#4ade80]">Артём</span>
            </h1>
            <p className="text-[#d4c8a0]/55 text-lg max-w-lg leading-relaxed">
              Играю в Rust, Minecraft, Subnautica и CS2. Готовлю вкусную еду. Читаю хорошие книги. Здесь — всё самое интересное.
            </p>
            <div className="flex gap-3 flex-wrap mt-2">
              {[["Игры","games","🎮"],["Кулинария","food","🍳"],["Книги","books","📚"],["Обо мне","about","👋"]].map(([label, id, emoji]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
                  style={{ backgroundColor: "rgba(212,200,160,0.08)", border: "1px solid rgba(212,200,160,0.15)", color: "#d4c8a0" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(74,222,128,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.4)"; (e.currentTarget as HTMLElement).style.color = "#4ade80"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,200,160,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,200,160,0.15)"; (e.currentTarget as HTMLElement).style.color = "#d4c8a0"; }}
                >
                  {emoji} {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="max-w-5xl mx-auto px-5"><div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,200,160,0.2), transparent)" }} /></div>

        {/* ====== GAMES BLOCK ====== */}
        <section id="games" className="max-w-5xl mx-auto px-5 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-bold text-[#4ade80]/60 uppercase tracking-widest mb-2">— блок 01</div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#d4c8a0]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                Игры 🎮
              </h2>
            </div>
            <div className="flex gap-2 text-[#d4c8a0]/30 text-sm hidden sm:flex">
              <span className="px-2 py-1 rounded" style={{ border: "1px solid rgba(212,200,160,0.1)" }}>Rust</span>
              <span className="px-2 py-1 rounded" style={{ border: "1px solid rgba(212,200,160,0.1)" }}>Minecraft</span>
              <span className="px-2 py-1 rounded" style={{ border: "1px solid rgba(212,200,160,0.1)" }}>CS2</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAMES.map((g, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-2xl p-5 transition-all duration-300 card-hover"
                style={{ backgroundColor: "rgba(212,200,160,0.04)", border: "1px solid rgba(212,200,160,0.1)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${g.color}40`; (e.currentTarget as HTMLElement).style.backgroundColor = `${g.color}08`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,200,160,0.1)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,200,160,0.04)"; }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{g.emoji}</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ color: g.color, backgroundColor: `${g.color}15`, border: `1px solid ${g.color}30` }}>
                    {g.tag}
                  </span>
                </div>
                <h3 className="font-black text-[#d4c8a0] text-base mb-1.5 leading-tight group-hover:text-white transition-colors" style={{ fontFamily: 'Unbounded, sans-serif', fontSize: "0.9rem" }}>
                  {g.title}
                </h3>
                <p className="text-[#d4c8a0]/45 text-sm leading-relaxed mb-4">{g.desc}</p>
                <div className="flex items-center justify-between text-xs text-[#d4c8a0]/35">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{g.time}</span>
                    <span style={{ color: g.difficulty === "Легко" ? "#4ade80" : g.difficulty === "Средне" ? "#fb923c" : "#f87171" }}>{g.difficulty}</span>
                  </div>
                  <span className="flex items-center gap-1 font-semibold" style={{ color: g.color }}>
                    Читать <Icon name="ArrowRight" size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div className="max-w-5xl mx-auto px-5"><div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,200,160,0.2), transparent)" }} /></div>

        {/* ====== FOOD BLOCK ====== */}
        <section id="food" className="max-w-5xl mx-auto px-5 py-16">
          <div className="mb-8">
            <div className="text-xs font-bold text-[#fb923c]/60 uppercase tracking-widest mb-2">— блок 02</div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#d4c8a0]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              Кулинария 🍳
            </h2>
            <p className="text-[#d4c8a0]/40 text-sm mt-2">Простые и вкусные рецепты для геймеров</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RECIPES.map((r, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 card-hover"
                style={{ backgroundColor: "rgba(212,200,160,0.04)", border: "1px solid rgba(212,200,160,0.1)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,146,60,0.35)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(251,146,60,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,200,160,0.1)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,200,160,0.04)"; }}
              >
                {/* Color stripe */}
                <div className="h-1" style={{ background: `linear-gradient(90deg, #fb923c, #facc15)` }} />
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}>
                      {r.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-[#d4c8a0] text-base mb-1 group-hover:text-white transition-colors" style={{ fontFamily: 'Unbounded, sans-serif', fontSize: "0.9rem" }}>
                        {r.title}
                      </h3>
                      <p className="text-[#d4c8a0]/45 text-sm leading-relaxed mb-3">{r.desc}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-[#d4c8a0]/40"><Icon name="Clock" size={11} />{r.time}</span>
                        <span className="text-[#4ade80] font-semibold">{r.level}</span>
                        <span className="ml-auto flex items-center gap-1 font-semibold text-[#fb923c]">
                          Рецепт <Icon name="ArrowRight" size={11} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div className="max-w-5xl mx-auto px-5"><div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,200,160,0.2), transparent)" }} /></div>

        {/* ====== BOOKS BLOCK ====== */}
        <section id="books" className="max-w-5xl mx-auto px-5 py-16">
          <div className="mb-8">
            <div className="text-xs font-bold text-[#b565ff]/60 uppercase tracking-widest mb-2">— блок 03</div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#d4c8a0]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              Книги 📚
            </h2>
            <p className="text-[#d4c8a0]/40 text-sm mt-2">Что стоит прочитать — советую лично</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BOOKS.map((b, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 card-hover"
                style={{ backgroundColor: "rgba(212,200,160,0.04)", border: "1px solid rgba(212,200,160,0.1)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(181,101,255,0.35)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(181,101,255,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,200,160,0.1)"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(212,200,160,0.04)"; }}
              >
                <div className="text-4xl text-center py-2">{b.emoji}</div>
                <div>
                  <h3 className="font-black text-[#d4c8a0] text-sm leading-tight mb-1 group-hover:text-white transition-colors" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                    {b.title}
                  </h3>
                  <div className="text-[#b565ff]/70 text-xs font-semibold mb-2">{b.author}</div>
                  <p className="text-[#d4c8a0]/40 text-xs leading-relaxed">{b.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 text-xs" style={{ borderTop: "1px solid rgba(212,200,160,0.08)" }}>
                  <div className="flex gap-2">
                    <span className="text-[#d4c8a0]/30">{b.type}</span>
                    <span className="text-[#b565ff]/60 font-bold">{b.age}</span>
                  </div>
                  <span className="flex items-center gap-1 font-semibold text-[#b565ff]">
                    <Icon name="ArrowRight" size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div className="max-w-5xl mx-auto px-5"><div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,200,160,0.2), transparent)" }} /></div>

        {/* ====== ABOUT BLOCK ====== */}
        <section id="about" className="max-w-5xl mx-auto px-5 py-16 pb-20">
          <div className="mb-8">
            <div className="text-xs font-bold text-[#60a5fa]/60 uppercase tracking-widest mb-2">— блок 04</div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#d4c8a0]" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              Обо мне 👋
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main card */}
            <div className="rounded-2xl p-7" style={{ backgroundColor: "rgba(212,200,160,0.05)", border: "1px solid rgba(212,200,160,0.12)" }}>
              <div className="text-5xl mb-4">🧑‍💻</div>
              <h3 className="font-black text-[#d4c8a0] text-xl mb-3" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                Привет, я Артём!
              </h3>
              <p className="text-[#d4c8a0]/55 leading-relaxed text-sm">
                Мне 13 лет. Я геймер, кулинар-любитель и книголюб. Этот сайт я сделал, чтобы делиться гайдами по играм, рецептами и книжными советами. Здесь нет нудятины — только то, что реально интересно.
              </p>
            </div>
            {/* Interests */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: "🎮", title: "Играю", desc: "Rust, Minecraft,\nSubnautica, CS2", color: "#4ade80" },
                { emoji: "📚", title: "Читаю", desc: "Фантастику\nи приключения", color: "#b565ff" },
                { emoji: "🍳", title: "Готовлю", desc: "Быстро\nи вкусно", color: "#fb923c" },
                { emoji: "🏗️", title: "Собираю", desc: "Lego\nи конструкторы", color: "#60a5fa" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: `${item.color}08`, border: `1px solid ${item.color}20` }}
                >
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <div className="font-black text-sm mb-1" style={{ color: item.color, fontFamily: 'Unbounded, sans-serif', fontSize: "0.8rem" }}>{item.title}</div>
                  <div className="text-[#d4c8a0]/40 text-xs leading-relaxed whitespace-pre-line">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          {/* CTA */}
          <div className="mt-6 rounded-2xl p-6 text-center" style={{ backgroundColor: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)" }}>
            <p className="text-[#d4c8a0]/60 text-sm mb-4">Хочешь предложить тему для гайда или рецепта?</p>
            <button className="px-7 py-2.5 rounded-full font-bold text-sm transition-all" style={{ backgroundColor: "#4ade80", color: "#0a140c" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#86efac"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#4ade80"; }}
            >
              Написать мне ✉️
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid rgba(212,200,160,0.1)" }}>
          <div className="max-w-5xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#d4c8a0]/30">
            <span className="font-black text-[#d4c8a0]/50" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              Artём<span className="text-[#4ade80]/60">.space</span>
            </span>
            <span>Сделано с ❤️ Артёмом, 13 лет</span>
            <div className="flex gap-4">
              {[["Игры","games"],["Книги","books"],["Кулинария","food"],["Обо мне","about"]].map(([l,id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#d4c8a0]/70 transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
