import { useState } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  { id: "all", label: "Всё", icon: "LayoutGrid" },
  { id: "guides", label: "Гайды", icon: "Gamepad2" },
  { id: "tips", label: "Советы", icon: "Lightbulb" },
  { id: "recipes", label: "Рецепты", icon: "ChefHat" },
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
    id: 4,
    category: "tips",
    tag: "Советы",
    tagColor: "green",
    title: "Управление ресурсами в играх",
    desc: "Универсальные механики, которые работают в Minecraft, Subnautica и Don't Starve.",
    time: "6 мин",
    difficulty: "Легко",
    image: null,
    emoji: "🥫",
  },
  {
    id: 5,
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
    id: 6,
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
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#content" onClick={() => setActiveCategory("guides")} className="hover:text-foreground transition-colors">Гайды</a>
            <a href="#content" onClick={() => setActiveCategory("tips")} className="hover:text-foreground transition-colors">Советы</a>
            <a href="#content" onClick={() => setActiveCategory("recipes")} className="hover:text-foreground transition-colors">Рецепты</a>
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

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="animate-fade-in-up opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#39d353]/30 bg-[#39d353]/5 text-[#39d353] text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#39d353] animate-pulse-glow" />
              Авторские гайды от Артёма
            </div>

            <h1 className="animate-fade-in-up opacity-0 delay-100 text-4xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight max-w-4xl">
              Играй лучше.
              <br />
              <span className="text-[#39d353]">Готовь</span> вкуснее.
            </h1>

            <p className="animate-fade-in-up opacity-0 delay-200 text-muted-foreground text-lg max-w-xl leading-relaxed">
              Гайды по Minecraft, Subnautica и CS2, советы по выживанию и рецепты для геймеров — всё в одном месте.
            </p>

            <div className="animate-fade-in-up opacity-0 delay-300 flex items-center gap-8 mt-2">
              {[
                { val: "6+", label: "материалов" },
                { val: "3", label: "игры" },
                { val: "100%", label: "от души" },
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
            return (
              <article
                key={post.id}
                className="card-hover cursor-pointer group bg-card border border-border rounded-2xl overflow-hidden"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Image / Emoji block */}
                <div className="relative h-44 overflow-hidden bg-secondary flex items-center justify-center">
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
                        <Icon name="Clock" size={12} />
                        {post.time}
                      </span>
                      <span className={`font-semibold ${DIFFICULTY_COLORS[post.difficulty]}`}>
                        {post.difficulty}
                      </span>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-[#39d353] hover:gap-2.5 transition-all">
                      Читать
                      <Icon name="ArrowRight" size={13} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <span className="text-5xl">🔍</span>
            <p className="mt-4 text-lg">Материалов пока нет</p>
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative rounded-2xl overflow-hidden border border-[#39d353]/30 bg-[#39d353]/5 p-10 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#39d353]/5 via-transparent to-[#b565ff]/5 pointer-events-none" />
          <h3 className="relative text-2xl sm:text-3xl font-black mb-3">
            Есть идея для гайда? 🎮
          </h3>
          <p className="relative text-muted-foreground mb-6 max-w-md mx-auto">
            Напиши мне — и я сделаю гайд по любой игре или рецепт для геймеров.
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
            <a href="#content" className="hover:text-foreground transition-colors">Гайды</a>
            <a href="#content" className="hover:text-foreground transition-colors">Советы</a>
            <a href="#content" className="hover:text-foreground transition-colors">Рецепты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
