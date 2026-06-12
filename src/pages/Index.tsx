import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ── Modal content ────────────────────────────────────── */
const GAME_DETAILS: Record<string, { steps: string[]; tip: string }> = {
  "Лучшая база для выживания": {
    steps: [
      "🪵 День 1: Нарубай 64 дерева и 32 камня. Сразу сделай верстак и деревянные инструменты.",
      "🏠 День 1–2: Построй домик 5×5 с дверью и факелами. Не выходи ночью без брони.",
      "⛏️ День 3–5: Копай вниз шахту 1×2 до уровня 12 — там больше всего железа и золота.",
      "🌾 День 6–7: Построй ферму пшеницы 9×9 рядом с водой. Это бесконечная еда.",
      "🔥 День 8+: Собери 10 обсидиана и постройся портал в Нижний мир за серой крепостью.",
    ],
    tip: "Совет: Всегда держи в инвентаре 10+ варёной еды. Голод = медленное восстановление здоровья.",
  },
  "Выживание в глубинах": {
    steps: [
      "🌊 Старт: Не паникуй! Сначала собери обломки с подводной капсулы — там еда и базовые материалы.",
      "🐠 Час 1: Плыви на мелководье (биом Kelp Forest). Там безопасно и много ресурсов для начала.",
      "🔬 Час 2: Построй Scanner Room и 2 кислородных танка. Без этого глубже 100м опасно.",
      "🏠 Час 3: Найди место для базы на 50–80м глубины. Строй Multipurpose Room + Fabricator.",
      "📋 Важно: Синий планшет находится в Mushroom Forest на обломке корабля. Следуй сигналу.",
    ],
    tip: "Совет: Рипперы и Бонешарки опасны. Если видишь большую рыбу — уплывай зигзагом.",
  },
  "Первая ночь в Rust": {
    steps: [
      "🪨 Старт: Сразу бей камни кулаком — получишь Камень. Им руби деревья и других камни.",
      "🪓 Крафт: Сделай Каменный Топор (2 камня + 2 дерева) и Факел (дерево + ткань).",
      "🏠 База: Найди скалы подальше от дороги. Построй 2×2 дом из дерева с замком кодом.",
      "🔥 Костёр: Обязательно сделай костёр внутри базы — ночью без него умрёшь от холода.",
      "👀 Безопасность: Не подходи к другим игрокам первые часы. Большинство убьют.",
    ],
    tip: "Совет: Код замка — самая важная вещь. Запомни свой код или запиши. Без него потеряешь всё.",
  },
  "Топ-5 советов новичку": {
    steps: [
      "🎯 Прицел: Держи прицел на уровне головы — тогда легче хедшотить. Не смотри в пол!",
      "🚶 Движение: Не стреляй на бегу. Остановись, присядь (Ctrl) и стреляй — точнее в разы.",
      "🔊 Звук: Надень наушники! Звук шагов врага — это мини-радар. Слышишь шаги = готовься.",
      "💰 Экономика: Не трать деньги на AWP в начале раунда. AK или M4 важнее.",
      "📡 Связь: Говори тиммейтам где враги: «Двое на B» лучше чем молчать и умереть.",
    ],
    tip: "Совет: Играй с мышью на низком сенсе (400–800 DPI). Высокий сенс — частая ошибка новичков.",
  },
  "Все боссы и секреты": {
    steps: [
      "🧸 Хагги Вагги: Используй Grab-Pack попеременно — красная рука тянет, синяя цепляется за стены.",
      "🌸 Мамочка с длинными ногами: Беги только по синим следам. Красные — ловушка, сразу смерть.",
      "🎵 Музыкальный зверь: Запомни последовательность нот. Каждый раз они случайные, смотри на экран.",
      "🔑 Секреты: В главе 2 в вентиляции есть тайная комната с кассетой — открывает скрытую историю.",
      "💜 Финал: Для истинной концовки собери все записки и кассеты. Иначе увидишь только обычный конец.",
    ],
    tip: "Совет: Игра жутковатая, но не сложная. Главное — не торопиться и читать все записки.",
  },
  "Тактика для новичков": {
    steps: [
      "📋 Перед входом: Всегда слушай брифинг. Там говорят сколько подозреваемых и тип миссии.",
      "🚪 Зачистка: Открывай двери медленно (зажми). Резкое открытие = выстрел в лицо.",
      "📢 Команды: Кричи «ПОЛИЦИЯ! НЕ ДВИГАТЬСЯ!» (C) перед входом. Снижает шанс перестрелки.",
      "🔦 Снаряжение: Берите Flash-bang и Beanbag Shotgun — помогают брать живыми без лишних жертв.",
      "🤝 Команда: Не иди в одиночку. Ready or Not — командная игра. Прикрывай напарников.",
    ],
    tip: "Совет: За убийство мирных жителей снимают очки. Сначала стреляй несмертельным, потом реагируй.",
  },
  "Как выиграть кампанию": {
    steps: [
      "🏰 Замок: Строй мага с самого начала — Башня Магов даёт огромный прирост мощи армии.",
      "⚔️ Герой: Прокачивай одного главного героя (лучше рыцаря или мага). Армия без героя слабее в разы.",
      "💰 Золото: Захватывай шахты в первые 3 дня. Деньги = войска = победа. Без денег всё рухнет.",
      "🗺️ Разведка: Сначала разведай карту Pathfinder'ом. Знай где враг ДО того, как он узнает про тебя.",
      "⚡ Скорость: Не затягивай — противник тоже растёт. Атакуй на 5–7 неделе, пока он не стал сильнее.",
    ],
    tip: "Совет: Дипломатия — не слабость. Нейтральные города выгоднее покупать, чем захватывать с потерями.",
  },
  "С чего начать в Minecraft": {
    steps: [
      "🌅 Первое что делаешь: Руби деревья СРАЗУ. 5 стволов хватит на старт. Не трать время на осмотр.",
      "🪓 Крафт: Верстак → деревянная кирка → каменная кирка → железная кирка. Это главная цепочка.",
      "🌙 До ночи: У тебя есть 10 минут. Построй хижину 5×5 из земли или дерева. Некрасиво, но спасёт.",
      "🕯️ Освещение: Факелы внутри и снаружи — не дают мобам спавниться рядом. Делай их много.",
      "🌄 День 2: Найди пещеру рядом с базой. Там железо — приоритет номер один.",
    ],
    tip: "Совет: Первую ночь можно просто копать вниз в своей хижине. Утром выйдешь с запасом камня.",
  },
};

const RECIPE_DETAILS: Record<string, { ingredients: string[]; steps: string[] }> = {
  "Паста за 15 минут": {
    ingredients: ["200г спагетти", "2 яйца", "100г бекона или ветчины", "50г твёрдого сыра", "Соль, чёрный перец"],
    steps: [
      "Вари спагетти в солёной воде по инструкции на упаковке (обычно 8–10 мин).",
      "Пока варится паста — обжарь нарезанный бекон на сковороде без масла 3–4 мин.",
      "Взбей яйца вилкой в миске, добавь тёртый сыр и перец. Перемешай.",
      "Слей воду с пасты, сохранив полстакана отвара. Добавь пасту к бекону, выключи огонь.",
      "Вылей яично-сырную смесь, быстро мешай — яйца не должны свариться, должен получиться соус.",
    ],
  },
  "Тосты геймера": {
    ingredients: ["2 ломтика белого хлеба", "2 яйца", "3–4 ломтика бекона", "Масло для жарки", "Соль по вкусу"],
    steps: [
      "Поджарь хлеб в тостере или на сковороде до золотистой корочки.",
      "На той же сковороде с маслом обжарь бекон — 2 мин с каждой стороны.",
      "Рядом с беконом разбей яйца. Жарь 3 минуты — белок должен схватиться, желток остаётся мягким.",
      "Выложи бекон на тост, сверху — яйцо. Посоли по вкусу.",
      "Готово! Ешь горячим прямо перед игровой сессией.",
    ],
  },
  "Энергетический смузи": {
    ingredients: ["1 банан", "3 ст.л. овсяных хлопьев", "200 мл молока", "1 ст.л. мёда", "По желанию: горсть ягод"],
    steps: [
      "Засыпь овсянку в блендер — пусть постоит 2 мин, чтобы размягчилась.",
      "Добавь банан (можно замороженный — будет гуще), молоко и мёд.",
      "Если есть ягоды — тоже кидай. Клубника или черника дают отличный вкус.",
      "Блендируй 30–40 секунд до однородности.",
      "Пей сразу! Через час овсянка набухнет и станет гуще.",
    ],
  },
  "Яичница с сыром": {
    ingredients: ["3 яйца", "30г любого сыра", "1 ч.л. сливочного масла", "Соль, зелень по желанию"],
    steps: [
      "Разогрей сковороду на среднем огне, добавь масло — дай растаять.",
      "Разбей яйца. Можно взбить вилкой для омлета или жарить как есть.",
      "Посоли. Жарь 2–3 минуты — пока белок схватится.",
      "Натри сыр и посыпь сверху. Накрой крышкой на 30 секунд — сыр расплавится.",
      "Готово! Подавай прямо на сковороде или переложи на тарелку.",
    ],
  },
};

const BOOK_DETAILS: Record<string, { review: string; why: string; quote: string }> = {
  "Первый игрок готовься": {
    review: "2044 год. Весь мир проводит время в виртуальной реальности OASIS. Создатель этого мира умер и оставил в игре пасхальное яйцо — кто найдёт его первым, получит всё его состояние. Главный герой Уэйд — бедный подросток, который знает об играх 80-х абсолютно всё.",
    why: "Если ты любишь игры — эта книга для тебя на 100%. Автор запихнул в неё тысячи отсылок к Pac-Man, D&D, Star Wars и другим легендам. Читается за 2–3 дня, не оторваться.",
    quote: "«Реальность — это единственное место, где нельзя найти нормальной еды»",
  },
  "Голодные игры": {
    review: "Будущее. Страна Панем поделена на 12 округов. Каждый год Капитолий устраивает Голодные игры — двое подростков из каждого округа сражаются до смерти на арене. Всё это транслируется по ТВ. Главная героиня Китнисс добровольно идёт на арену вместо младшей сестры.",
    why: "Это не просто выживалка — это история про смелость, несправедливость и то, как один человек может изменить целый мир. Если любишь Rust и выживание в играх — ощущение похожее, только в книге.",
    quote: "«Я доброволец! Я иду на Игры вместо неё!»",
  },
  "Марсианин": {
    review: "Астронавт Марк Уотни остался один на Марсе. Все думают, что он мёртв. Связи нет, еды на 300 дней, а помощь прилетит через 4 года. Он должен выжить с помощью ботаники, химии и чёрного юмора. Это реальная наука, рассказанная как крутое приключение.",
    why: "Самая близкая к играм книга из всех — это буквально симулятор выживания с крафтингом и решением задач. После неё захочется поиграть в Subnautica или The Martian Survival.",
    quote: "«Я собираюсь научиться выращивать еду на планете, где ничего не растёт»",
  },
  "Автостопом по Галактике": {
    review: "Земля уничтожена, чтобы освободить место для межгалактической трассы. Главный герой Артур Дент спасается благодаря другу-инопланетянину и теперь путешествует по Галактике автостопом. Книга одновременно абсурдная, смешная и неожиданно умная.",
    why: "Эта книга изменила представление о том, каким может быть юмор. Автор Дуглас Адамс был настоящим гением абсурда. Читается легко, смеёшься вслух. Идеально для поездок или перед сном.",
    quote: "«Ответ на главный вопрос жизни, вселенной и всего остального — 42»",
  },
};

/* ── Modal ────────────────────────────────────────────── */
type ModalData = {
  type: "game" | "recipe" | "book";
  emoji: string;
  title: string;
  tag?: string;
  color?: string;
  author?: string;
  time?: string;
  diff?: string;
  age?: string;
};

function Modal({ data, onClose }: { data: ModalData; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  const accentColor = data.color ?? "#4ade80";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl animate-fade-in-up"
        style={{ backgroundColor: "#12141f", border: `1px solid ${accentColor}30`, boxShadow: `0 0 60px ${accentColor}15` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colored top bar */}
        <div className="h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}60)` }} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
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
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 flex-shrink-0"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Content: GAME */}
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

          {/* Content: RECIPE */}
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

          {/* Content: BOOK */}
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

/* ── Data ─────────────────────────────────────────────── */
const GAMES = [
  { emoji: "⛏️", tag: "Minecraft",        color: "#4ade80", title: "Лучшая база для выживания",  desc: "Ферма, хранилище и портал в ад уже в первую неделю.",    time: "8 мин",  diff: "Средне" },
  { emoji: "🌊", tag: "Subnautica",       color: "#60a5fa", title: "Выживание в глубинах",       desc: "Первые 3 часа: ресурсы, кислород и синий планшет.",      time: "12 мин", diff: "Сложно" },
  { emoji: "🔥", tag: "Rust",             color: "#fb923c", title: "Первая ночь в Rust",         desc: "Хижина, ресурсы и как не умереть от мародёров.",         time: "10 мин", diff: "Сложно" },
  { emoji: "🎯", tag: "CS2",              color: "#facc15", title: "Топ-5 советов новичку",      desc: "Прицел, отдача, движение и коммуникация с командой.",    time: "5 мин",  diff: "Легко"  },
  { emoji: "🧸", tag: "Poppy Playtime",  color: "#e879f9", title: "Все боссы и секреты",        desc: "Как пройти каждую главу и не попасться Хагги Вагги.",    time: "9 мин",  diff: "Средне" },
  { emoji: "🔫", tag: "Ready or Not",    color: "#94a3b8", title: "Тактика для новичков",       desc: "Основы тактического шутера: зачистка, команда, снаряж.", time: "11 мин", diff: "Сложно" },
  { emoji: "⚔️", tag: "Герои М и М",     color: "#fbbf24", title: "Как выиграть кампанию",     desc: "Прокачка героев, армии и грамотная экономика замка.",    time: "14 мин", diff: "Средне" },
  { emoji: "🌱", tag: "Новичкам",        color: "#4ade80", title: "С чего начать в Minecraft",  desc: "Первая ночь, крафт инструментов, укрытие до рассвета.",  time: "7 мин",  diff: "Легко"  },
];

const RECIPES = [
  { emoji: "🍝", title: "Паста за 15 минут",   desc: "Карбонара — минимум ингредиентов, максимум вкуса.",      time: "15 мин" },
  { emoji: "🥪", title: "Тосты геймера",        desc: "Хрустящие тосты с яйцом и беконом перед сессией.",      time: "10 мин" },
  { emoji: "🥤", title: "Энергетический смузи", desc: "Банан, овёс, молоко и мёд — заряд на несколько часов.", time: "5 мин"  },
  { emoji: "🍳", title: "Яичница с сыром",      desc: "Простой и сытный перекус в любое время суток.",         time: "7 мин"  },
];

const BOOKS = [
  { emoji: "📖", title: "Первый игрок готовься",   author: "Эрнест Клайн",    desc: "Виртуальный мир и эпичные отсылки к играм 80-х.",    age: "12+" },
  { emoji: "🏹", title: "Голодные игры",            author: "Сюзанна Коллинз", desc: "Выживание и стратегия — как в лучших survival-играх.", age: "12+" },
  { emoji: "🚀", title: "Марсианин",                author: "Энди Вейр",       desc: "Выживание на Марсе с помощью науки и смекалки.",      age: "13+" },
  { emoji: "🌌", title: "Автостопом по Галактике",  author: "Дуглас Адамс",   desc: "Смешная и умная книга про приключения в космосе.",    age: "12+" },
];

const DIFF_COLOR: Record<string, string> = {
  "Легко": "#4ade80", "Средне": "#fb923c", "Сложно": "#f87171",
};

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

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%`,
  size: (i % 3) + 1.5, delay: (i * 0.4) % 7, duration: 4 + (i % 4),
  color: ["#4ade80","#60a5fa","#b565ff","#fb923c","#facc15"][i % 5],
  opacity: 0.12 + (i % 3) * 0.08,
}));

const BG_URL = "https://cdn.poehali.dev/projects/06505539-a43e-4fc8-b125-1c85c59141c8/bucket/5d442ca0-8e55-46e4-818d-d7a00bc44274.png";

export default function Index() {
  const [modal, setModal] = useState<ModalData | null>(null);
  const gamesSection  = useInView();
  const foodSection   = useInView();
  const booksSection  = useInView();
  const aboutSection  = useInView();

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
        {/* Dark overlay */}
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
              {[["🎮 Игры","games"],["🍳 Кулинария","food"],["📚 Книги","books"],["👋 Обо мне","about"]].map(([l,id]) => (
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

          {/* ── ABOUT ─────────────────────────────────── */}
          <section id="about" ref={aboutSection.ref} className="max-w-5xl mx-auto px-5 py-16 pb-20">
            <div className={`transition-all duration-700 ${aboutSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(96,165,250,0.55)" }}>— блок 04</div>
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
              <div className="rounded-2xl p-7 text-center relative overflow-hidden gradient-border"
                style={{ backgroundColor: "rgba(74,222,128,0.04)" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(74,222,128,0.08) 0%, transparent 70%)" }} />
                <p className="relative text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Хочешь предложить тему для гайда или рецепта?
                </p>
                <button className="relative px-7 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 neon-glow-green"
                  style={{ backgroundColor: "#4ade80", color: "#0d0f1a" }}>
                  Написать мне ✉️
                </button>
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
                {[["Игры","games"],["Книги","books"],["Кулинария","food"],["Обо мне","about"]].map(([l,id]) => (
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
