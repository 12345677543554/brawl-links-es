import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import gametuinAvatar from "@/assets/gametuin-avatar.png";
import bgTexture from "@/assets/bg-texture.png";
import brawler1 from "@/assets/brawler-1.png";
import brawler2 from "@/assets/brawler-2.png";
import brawler3 from "@/assets/brawler-3.png";

const YOUTUBE_URL = "https://m.youtube.com/@GAMETUIN?ra=m";
const TIKTOK_URL = "https://www.tiktok.com/@izan29096";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GAMETUIN | Creador de contenido de Brawl Stars" },
      {
        name: "description",
        content:
          "Scrollytelling de Brawl Stars con GAMETUIN: brawlers legendarios, récords de copas y todos mis enlaces de YouTube y TikTok.",
      },
      { property: "og:title", content: "GAMETUIN | Creador de contenido de Brawl Stars" },
      {
        property: "og:description",
        content:
          "Scrollytelling de Brawl Stars con GAMETUIN: brawlers legendarios, récords de copas y todos mis enlaces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------- Icons ---------------- */

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.8a4.8 4.8 0 0 1-3.9-4.3h-3.1v12.4a2.9 2.9 0 1 1-2.1-2.8v-3.2a6 6 0 1 0 5.2 6V9.3a7.8 7.8 0 0 0 4.5 1.4V7.6a4.8 4.8 0 0 1-.6-1.8z" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18 3h3v3a4 4 0 0 1-3.6 4A6 6 0 0 1 13 13.9V17h3a1 1 0 0 1 1 1v2H7v-2a1 1 0 0 1 1-1h3v-3.1A6 6 0 0 1 6.6 10 4 4 0 0 1 3 6V3h3V2h12v1zM6 5H5v1a2 2 0 0 0 1 1.7V5zm13 0h-1v2.7A2 2 0 0 0 19 6V5z" />
    </svg>
  );
}

/* ---------------- Data ---------------- */

type Brawler = {
  name: string;
  role: string;
  rarity: string;
  record: number;
  holder: string;
  quote: string;
  image: string;
  glow: string;
  stats: { label: string; value: number }[];
};

const BRAWLERS: Brawler[] = [
  {
    name: "COLT",
    role: "Francotirador de la ciudad",
    rarity: "Poco común",
    record: 1834,
    holder: "récord personal en trofeos",
    quote: "Seis balas, seis oportunidades de brillar.",
    image: brawler1,
    glow: "var(--chart-3)",
    stats: [
      { label: "Daño", value: 78 },
      { label: "Alcance", value: 95 },
      { label: "Velocidad", value: 62 },
    ],
  },
  {
    name: "SPIKE NEÓN",
    role: "Control de zona",
    rarity: "Legendario",
    record: 1712,
    holder: "récord personal en trofeos",
    quote: "Si te pincha, ya has perdido la partida.",
    image: brawler2,
    glow: "var(--accent)",
    stats: [
      { label: "Daño", value: 88 },
      { label: "Alcance", value: 70 },
      { label: "Velocidad", value: 74 },
    ],
  },
  {
    name: "EL OSO MECÁNICO",
    role: "Tanque destructor",
    rarity: "Mítico",
    record: 1650,
    holder: "récord personal en trofeos",
    quote: "No esquivo golpes: los devuelvo.",
    image: brawler3,
    glow: "var(--brand-gold)",
    stats: [
      { label: "Daño", value: 92 },
      { label: "Alcance", value: 38 },
      { label: "Velocidad", value: 55 },
    ],
  },
];

const MODES = [
  { name: "Atrapagemas", desc: "10 gemas y aguantar la cuenta atrás.", color: "var(--accent)" },
  { name: "Balón Brawl", desc: "Gol en el último segundo, clásico.", color: "var(--chart-3)" },
  { name: "Supervivencia", desc: "El último en pie se lleva todo.", color: "var(--chart-5)" },
  { name: "Atraco", desc: "Rompe la caja fuerte antes que ellos.", color: "var(--brand-gold)" },
  { name: "Noqueo", desc: "Sin reapariciones. Sin perdón.", color: "var(--chart-2)" },
  { name: "Zona Restringida", desc: "Controla el mapa, gana la ronda.", color: "var(--chart-4)" },
];

/* ---------------- Helpers ---------------- */

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);
  return value;
}

function ScrollProgressBar({ progress }: { progress: MotionValue<number> }) {
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left"
      style={{
        scaleX: progress,
        background:
          "linear-gradient(90deg, var(--brand-gold), var(--accent), var(--chart-3))",
      }}
    />
  );
}

/* ---------------- Sections ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[130vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgTexture})`, scale }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/50 via-background/75 to-background" />

        <motion.div style={{ y, opacity }} className="flex flex-col items-center">
          <div className="relative mb-6">
            <motion.div
              className="absolute -inset-2 rounded-full blur-xl"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--brand-gold), var(--accent), var(--chart-3), var(--brand-gold))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <img
              src={gametuinAvatar}
              alt="GAMETUIN"
              width={140}
              height={140}
              className="relative h-[140px] w-[140px] rounded-full border-2 border-white/25 bg-card object-cover"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center text-5xl font-black tracking-tight sm:text-7xl"
            style={{
              backgroundImage:
                "linear-gradient(180deg, var(--foreground), var(--brand-gold))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            GAMETUIN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-3 max-w-md text-center text-base font-medium text-muted-foreground"
          >
            🎮 Creador de contenido de Brawl Stars · Brawlers, récords de copas y las mejores
            jugadas
          </motion.p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mt-12 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground"
          >
            Desliza
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function IntroStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.15]);

  return (
    <section ref={ref} className="relative flex h-[120vh] items-center justify-center px-6">
      <motion.h2
        style={{ opacity, scale }}
        className="max-w-3xl text-center text-3xl font-black leading-tight sm:text-5xl"
      >
        Cada brawler tiene una historia.
        <br />
        <span className="text-primary">Cada copa, una batalla detrás.</span>
      </motion.h2>
    </section>
  );
}

function BrawlerChapter({ brawler, index }: { brawler: Brawler; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [active, setActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.35 && !active) setActive(true);
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });
  const imgY = useTransform(smooth, [0, 1], ["12%", "-12%"]);
  const imgRotate = useTransform(smooth, [0, 1], [index % 2 === 0 ? -8 : 8, index % 2 === 0 ? 6 : -6]);
  const imgScale = useTransform(smooth, [0, 0.5, 1], [0.8, 1.05, 0.92]);
  const glowOpacity = useTransform(smooth, [0, 0.5, 1], [0, 0.55, 0.1]);

  const counted = useCountUp(brawler.record, active);
  const reversed = index % 2 === 1;

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
          style={{ background: brawler.glow, opacity: glowOpacity }}
        />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--card)_60%,transparent),transparent_70%)]" />

        <div
          className={`mx-auto flex w-full max-w-5xl flex-col items-center gap-8 sm:gap-12 ${
            reversed ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* Brawler art */}
          <motion.div
            style={{ y: imgY, rotate: imgRotate, scale: imgScale }}
            className="relative w-[58%] max-w-xs shrink-0 md:w-1/2 md:max-w-md"
          >
            <img
              src={brawler.image}
              alt={brawler.name}
              loading="lazy"
              width={816}
              height={816}
              className="w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            />
          </motion.div>

          {/* Text */}
          <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur"
            >
              {brawler.rarity}
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, x: reversed ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-black leading-none sm:text-6xl"
            >
              {brawler.name}
            </motion.h3>

            <p className="mt-2 text-sm font-semibold text-muted-foreground">{brawler.role}</p>
            <p className="mt-4 max-w-sm text-sm italic text-foreground/80">“{brawler.quote}”</p>

            {/* Trophy record */}
            <div className="mt-7 w-full max-w-sm rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                <TrophyIcon className="h-4 w-4 text-primary" />
                Máximo de copas
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-black tabular-nums text-primary sm:text-6xl">
                  {counted.toLocaleString("es-ES")}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">copas</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{brawler.holder}</p>

              <div className="mt-4 flex flex-col gap-2.5">
                {brawler.stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-left text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <motion.span
                        className="block h-full rounded-full"
                        style={{ background: brawler.glow }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.value}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                      />
                    </span>
                    <span className="w-8 text-right text-xs font-bold tabular-nums text-foreground/80">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrophyRoad() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const milestones = [
    { copas: "500", text: "Primeras cajas y brawlers desbloqueados" },
    { copas: "5.000", text: "Se acaba la suerte, empieza la estrategia" },
    { copas: "20.000", text: "Aquí todos saben esquivar tu súper" },
    { copas: "50.000", text: "Territorio de leyendas y clubes top" },
  ];

  return (
    <section ref={ref} className="relative mx-auto max-w-2xl px-6 py-28">
      <h2 className="mb-14 text-center text-3xl font-black sm:text-4xl">
        La <span className="text-primary">senda de trofeos</span>
      </h2>
      <div className="relative pl-10">
        <div className="absolute left-3 top-0 h-full w-1 rounded-full bg-secondary" />
        <motion.div
          className="absolute left-3 top-0 w-1 origin-top rounded-full"
          style={{
            height,
            background: "linear-gradient(180deg, var(--brand-gold), var(--accent))",
          }}
        />
        <div className="flex flex-col gap-14">
          {milestones.map((m) => (
            <motion.div
              key={m.copas}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="absolute -left-[2.05rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background">
                <TrophyIcon className="h-3 w-3 text-primary" />
              </span>
              <p className="text-2xl font-black text-primary">{m.copas} copas</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModesGrid() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="mb-3 text-center text-3xl font-black sm:text-4xl">Modos de juego</h2>
      <p className="mb-10 text-center text-sm text-muted-foreground">
        Los escenarios donde se rompen los récords
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {MODES.map((mode, i) => (
          <motion.div
            key={mode.name}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur"
          >
            <span
              className="mb-3 block h-1.5 w-10 rounded-full"
              style={{ background: mode.color }}
            />
            <p className="text-base font-extrabold">{mode.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{mode.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LinksFinale() {
  const links = [
    {
      label: "YouTube",
      sublabel: "Suscríbete a mi canal",
      href: YOUTUBE_URL,
      Icon: YouTubeIcon,
      iconClass: "bg-brand-youtube text-brand-youtube-foreground",
    },
    {
      label: "TikTok",
      sublabel: "@izan29096",
      href: TIKTOK_URL,
      Icon: TikTokIcon,
      iconClass: "bg-foreground text-background",
    },
  ];

  return (
    <section className="relative mx-auto flex max-w-md flex-col items-center px-5 pb-20 pt-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-center text-3xl font-black sm:text-4xl"
      >
        Únete a la partida
      </motion.h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Todo mi contenido de Brawl Stars, en un solo sitio
      </p>

      <nav className="flex w-full flex-col gap-3.5">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card group"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <span className={`link-card__icon ${link.iconClass}`}>
              <link.Icon className="h-5 w-5" />
            </span>
            <span className="flex flex-1 flex-col">
              <span className="leading-tight">{link.label}</span>
              <span className="text-xs font-normal text-muted-foreground">{link.sublabel}</span>
            </span>
            <svg
              className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.a>
        ))}
      </nav>

      <footer className="pt-14 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} GAMETUIN · Hecho con cariño
        </p>
      </footer>
    </section>
  );
}

/* ---------------- Page ---------------- */

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgressBar progress={progress} />
      <Hero />
      <IntroStatement />
      {BRAWLERS.map((b, i) => (
        <BrawlerChapter key={b.name} brawler={b} index={i} />
      ))}
      <TrophyRoad />
      <ModesGrid />
      <LinksFinale />
    </main>
  );
}
