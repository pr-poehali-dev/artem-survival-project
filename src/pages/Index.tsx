import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "all", label: "Всё", icon: "LayoutGrid" },
  { id: "guides", label: "Гайды", icon: "Gamepad2" },
  { id: "tips", label: "Советы", icon: "Lightbulb" },
  { id: "newbie", label: "Новичкам", icon: "Star" },
  { id: "recipes", label: "Рецепты", icon: "ChefHat" },
  { id: "books", label: "Книги", icon: "BookOpen" },
];

const POSTS = [
  {
    id: 1,
    category: "guides",
    tag: "Minecraft",
    tagColor: "green",
    title: "Лучшая база для выживания",
    desc: "Как построить защищённую базу с фермой, хранилищем и порталом в ад уже в первую неделю.",
    time: "8 мин",
    difficulty: "Средне",
    image: "https://cdn.poehali.dev/projects/06505539-a43e-4fc8-b125-1c85c59141c8/files/9b042e7b-9301-4fd4-9037-9b2bbd65d300.jpg",
    emoji: "⛏️",
  },
  {
    id: 2,
    category: "guides",
    tag: "Subnautica",
    tagColor: "purple",
    title: "Выживание в глубинах океана",
    desc: "Первые 3 часа в Subnautica: где добыть материалы, как не задохнуться и найти синий планшет.",
    time: "12 мин",
    difficulty: "Сложно",
    image: null,
    emoji: "🌊",
  },
  {
    id: 3,
    category: "guides",
    tag: "Rust",
    tagColor: "orange",
    title: "Первая ночь в Rust",
    desc: "Как выжить с самого старта: где найти камень и дерево, построить хижину и не умереть от мародёров.",
    time: "10 мин",
    difficulty: "Сложно",
    image: null,
    emoji: "🔥",
  },
  {
    id: 4,
    category: "tips",
    tag: "CS2",
    tagColor: "orange",
    title: "Топ-5 советов для новичков",
    desc: "Как целиться, управлять отдачей, правильно двигаться и коммуникировать с тиммейтами.",
    time: "5 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🎯",
  },
  {
    id: 5,
    category: "tips",
    tag: "Советы",
    tagColor: "green",
    title: "Управление ресурсами в играх",
    desc: "Универсальные механики, которые работают в Minecraft, Rust, Subnautica и Don't Starve.",
    time: "6 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🥫",
  },
  {
    id: 6,
    category: "newbie",
    tag: "Новичкам",
    tagColor: "green",
    title: "С чего начать в Minecraft",
    desc: "Пошаговый старт: первая ночь, добыча дерева, крафт инструментов и укрытие до рассвета.",
    time: "7 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🌱",
  },
  {
    id: 7,
    category: "newbie",
    tag: "Новичкам",
    tagColor: "purple",
    title: "Первый час в Subnautica",
    desc: "Не паникуй! Объясняю как работает кислород, где строить базу и почему не стоит плыть вниз.",
    time: "9 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🐟",
  },
  {
    id: 8,
    category: "newbie",
    tag: "Новичкам",
    tagColor: "orange",
    title: "Rust для самых новеньких",
    desc: "Объясняю механики простыми словами: крафт, строительство, где безопасно фармить первые ресурсы.",
    time: "11 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🪓",
  },
  {
    id: 9,
    category: "recipes",
    tag: "Рецепт",
    tagColor: "orange",
    title: "Паста за 15 минут",
    desc: "Быстрая паста карбонара — минимум ингредиентов, максимум вкуса. Идеально после долгой сессии.",
    time: "15 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🍝",
  },
  {
    id: 10,
    category: "recipes",
    tag: "Рецепт",
    tagColor: "purple",
    title: "Тосты геймера",
    desc: "Хрустящие тосты с яйцом и беконом. Сытный завтрак перед большой игровой сессией.",
    time: "10 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🥪",
  },
  {
    id: 11,
    category: "recipes",
    tag: "Рецепт",
    tagColor: "green",
    title: "Энергетический смузи",
    desc: "Банан, овёс, молоко и мёд — заряд бодрости на несколько часов игры без вреда для здоровья.",
    time: "5 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🥤",
  },
  {
    id: 12,
    category: "books",
    tag: "Книга",
    tagColor: "purple",
    title: "Первый игрок готовься",
    desc: "Эрнест Клайн. Виртуальный мир, загадки, ностальгия и эпичные отсылки к играм 80-х. Обязательно!",
    time: "Роман",
    difficulty: "12+",
    image: null,
    emoji: "📖",
  },
  {
    id: 13,
    category: "books",
    tag: "Книга",
    tagColor: "green",
    title: "Голодные игры",
    desc: "Сюзанна Коллинз. Выживание, стратегия, борьба за жизнь — если любишь survival игры, зайдёт на ура.",
    time: "Трилогия",
    difficulty: "12+",
    image: null,
    emoji: "🏹",
  },
  {
    id: 14,
    category: "books",
    tag: "Книга",
    tagColor: "orange",
    title: "Марсианин",
    desc: "Энди Вейр. Один человек выживает на Марсе с помощью науки и смекалки. Реальное выживание как в играх.",
    time: "Роман",
    difficulty: "13+",
    image: null,
    emoji: "🚀",
  },
  {
    id: 15,
    category: "books",
    tag: "Книга",
    tagColor: "purple",
    title: "Автостопом по Галактике",
    desc: "Дуглас Адамс. Безумно смешная и умная книга про приключения в космосе. Идеально для тех, кто любит Subnautica.",
    time: "Серия",
    difficulty: "12+",
    image: null,
    emoji: "🌌",
  },
];

const TAG_COLORS: Record<string, { border: string; text: string; bg: string }> = {
  green: { border: "border-[#39d353]", text: "text-[#39d353]", bg: "bg-[#39d353]/10" },
  purple: { border: "border-[#b565ff]", text: "text-[#b565ff]", bg: "bg-[#b565ff]/10" },
  orange: { border: "border-[#ff6b35]", text: "text-[#ff6b35]", bg: "bg-[#ff6b35]/10" },
};

const DIFFICULTY_COLORS: Record<string, string> = {
  "Легко": "text-[#39d353]",
  "Средне": "text-[#ff6b35]",
  "Сложно": "text-[#b565ff]",
  "12+": "text-[#b565ff]",
  "13+": "text-[#ff6b35]",
  "Роман": "text-muted-foreground",
  "Трилогия": "text-muted-foreground",
  "Серия": "text-muted-foreground",
};

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? POSTS
    : POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/50 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#39d353]/20 border border-[#39d353]/40 flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-[#39d353]" />
            </div>
            <span className="font-black text-lg tracking-tight" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              Guide<span className="text-[#39d353]">Master</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
            {[
              { label: "Гайды", cat: "guides" },
              { label: "Советы", cat: "tips" },
              { label: "Новичкам", cat: "newbie" },
              { label: "Рецепты", cat: "recipes" },
              { label: "Книги", cat: "books" },
            ].map((n) => (
              <a
                key={n.cat}
                href="#content"
                onClick={() => setActiveCategory(n.cat)}
                className="hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button className="px-4 py-2 rounded-lg bg-[#39d353] text-black text-sm font-bold hover:bg-[#39d353]/90 transition-all neon-glow-green">
            Подписаться
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#39d353]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#b565ff]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="animate-fade-in-up opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#39d353]/30 bg-[#39d353]/5 text-[#39d353] text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#39d353] animate-pulse-glow" />
              Авторские гайды от Артёма
            </div>

            <h1 className="animate-fade-in-up opacity-0 delay-100 text-4xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight max-w-4xl">
              Играй лучше.
              <br />
              <span className="text-[#39d353]">Читай. Готовь.</span>
            </h1>

            <p className="animate-fade-in-up opacity-0 delay-200 text-muted-foreground text-lg max-w-xl leading-relaxed">
              Гайды по Rust, Minecraft, Subnautica и CS2, советы новичкам, рецепты для геймеров и книги, которые стоит прочитать.
            </p>

            {/* Game tags */}
            <div className="animate-fade-in-up opacity-0 delay-300 flex flex-wrap justify-center gap-2">
              {["⚒️ Minecraft", "🌊 Subnautica", "🔥 Rust", "🎯 CS2"].map((g) => (
                <span key={g} className="px-3 py-1 rounded-full bg-secondary border border-border text-sm text-muted-foreground">
                  {g}
                </span>
              ))}
            </div>

            <div className="animate-fade-in-up opacity-0 delay-400 flex items-center gap-8 mt-2">
              {[
                { val: "15+", label: "материалов" },
                { val: "4", label: "игры" },
                { val: "4", label: "книги" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-[#39d353]">{s.val}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section id="content" className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-[#39d353] text-black border-[#39d353] neon-glow-green"
                  : "bg-card text-muted-foreground border-border hover:border-[#39d353]/50 hover:text-foreground"
              }`}
            >
              <Icon name={cat.icon as "LayoutGrid"} size={15} />
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* CARDS GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post, i) => {
            const colors = TAG_COLORS[post.tagColor];
            const isBook = post.category === "books";
            return (
              <article
                key={post.id}
                className="card-hover cursor-pointer group bg-card border border-border rounded-2xl overflow-hidden"
              >
                {/* Image / Emoji block */}
                <div className={`relative overflow-hidden bg-secondary flex items-center justify-center ${isBook ? "h-36" : "h-44"}`}>
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-7xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                      {post.emoji}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border ${colors.border} ${colors.text} ${colors.bg} backdrop-blur-sm`}>
                    {post.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-black text-base leading-tight mb-2 group-hover:text-[#39d353] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name={isBook ? "BookOpen" : "Clock"} size={12} />
                        {post.time}
                      </span>
                      <span className={`font-semibold ${DIFFICULTY_COLORS[post.difficulty] ?? "text-muted-foreground"}`}>
                        {post.difficulty}
                      </span>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-[#39d353] hover:gap-2.5 transition-all">
                      {isBook ? "О книге" : "Читать"}
                      <Icon name="ArrowRight" size={13} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-2xl overflow-hidden border border-[#39d353]/30 bg-[#39d353]/5 p-10 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#39d353]/5 via-transparent to-[#b565ff]/5 pointer-events-none" />
          <h3 className="relative text-2xl sm:text-3xl font-black mb-3">
            Есть идея? 🎮
          </h3>
          <p className="relative text-muted-foreground mb-6 max-w-md mx-auto">
            Хочешь гайд по конкретной игре, рецепт или совет по книге — напиши, и я добавлю!
          </p>
          <button className="relative px-8 py-3 rounded-xl bg-[#39d353] text-black font-bold hover:bg-[#39d353]/90 transition-all neon-glow-green">
            Предложить тему
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-black" style={{ fontFamily: 'Unbounded, sans-serif' }}>
            Guide<span className="text-[#39d353]">Master</span>
          </span>
          <span>Сделано с ❤️ Артёмом, 13 лет</span>
          <div className="flex gap-5">
            <a href="#content" onClick={() => setActiveCategory("guides")} className="hover:text-foreground transition-colors cursor-pointer">Гайды</a>
            <a href="#content" onClick={() => setActiveCategory("recipes")} className="hover:text-foreground transition-colors cursor-pointer">Рецепты</a>
            <a href="#content" onClick={() => setActiveCategory("books")} className="hover:text-foreground transition-colors cursor-pointer">Книги</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
