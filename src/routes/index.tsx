import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import gametuinAvatar from "@/assets/gametuin-avatar.png";
import bgTexture from "@/assets/bg-texture.png";
import coltAsset from "@/assets/brawl/colt-model.png.asset.json";
import spikeAsset from "@/assets/brawl/spike-model.png.asset.json";
import nitaAsset from "@/assets/brawl/nita-model.png.asset.json";
import coltG1 from "@/assets/brawl/colt-gadget-1.png.asset.json";
import coltG2 from "@/assets/brawl/colt-gadget-2.png.asset.json";
import coltS1 from "@/assets/brawl/colt-star-1.png.asset.json";
import coltS2 from "@/assets/brawl/colt-star-2.png.asset.json";
import spikeG1 from "@/assets/brawl/spike-gadget-1.png.asset.json";
import spikeG2 from "@/assets/brawl/spike-gadget-2.png.asset.json";
import spikeS1 from "@/assets/brawl/spike-star-1.png.asset.json";
import spikeS2 from "@/assets/brawl/spike-star-2.png.asset.json";
import nitaG1 from "@/assets/brawl/nita-gadget-1.png.asset.json";
import nitaG2 from "@/assets/brawl/nita-gadget-2.png.asset.json";
import nitaS1 from "@/assets/brawl/nita-star-1.png.asset.json";
import nitaS2 from "@/assets/brawl/nita-star-2.png.asset.json";

const YOUTUBE_URL = "https://m.youtube.com/@GAMETUIN?ra=m";
const TIKTOK_URL = "https://www.tiktok.com/@izan29096";

type Ability = { name: string; description: string; image?: string };
type Brawler = {
  name: string; role: string; rarity: string; record: number; image: string; color: string;
  attack: Ability; super: Ability; gadgets: Ability[]; stars: Ability[]; hypercharge: Ability;
};

const BRAWLERS: Brawler[] = [
  {
    name: "COLT", role: "Destructor", rarity: "Especial", record: 1834, image: coltAsset.url, color: "var(--brawler-colt)",
    attack: { name: "Revólveres", description: "Dispara una ráfaga de seis balas de largo alcance." },
    super: { name: "Tormenta de balas", description: "Una descarga más larga que atraviesa rivales y destruye obstáculos." },
    gadgets: [
      { name: "Recarga rápida", description: "Dispara dos tiros rápidos que ralentizan al objetivo.", image: coltG1.url },
      { name: "Bala de plata", description: "La siguiente bala atraviesa rivales y destruye el entorno.", image: coltG2.url },
    ],
    stars: [
      { name: "Botas veloces", description: "Aumenta la velocidad de movimiento de Colt.", image: coltS1.url },
      { name: "Pistoletazo", description: "Aumenta el alcance y la velocidad de sus balas.", image: coltS2.url },
    ],
    hypercharge: { name: "Empuñadura doble", description: "La Tormenta de balas se vuelve mucho más ancha." },
  },
  {
    name: "SPIKE", role: "Destructor", rarity: "Legendario", record: 1712, image: spikeAsset.url, color: "var(--brawler-spike)",
    attack: { name: "Corazón espinado", description: "Lanza un cactus que explota y dispara espinas en todas direcciones." },
    super: { name: "Granada punzante", description: "Cubre una zona de espinas que daña y ralentiza a los enemigos." },
    gadgets: [
      { name: "Lluvia de espinas", description: "Lanza una oleada de agujas en la dirección elegida.", image: spikeG1.url },
      { name: "Vida vegetal", description: "Planta un cactus protector que cura al equipo al destruirse.", image: spikeG2.url },
    ],
    stars: [
      { name: "Fertilizante", description: "Spike recupera salud dentro del área de su súper.", image: spikeS1.url },
      { name: "Curvatura", description: "Las espinas vuelan en curva para alcanzar mejor a los rivales.", image: spikeS2.url },
    ],
    hypercharge: { name: "Temporada de floración", description: "Amplía el área de su súper y potencia sus espinas." },
  },
  {
    name: "NITA", role: "Destructor", rarity: "Especial", record: 1650, image: nitaAsset.url, color: "var(--brawler-nita)",
    attack: { name: "Temblor", description: "Lanza una onda sísmica que atraviesa a varios enemigos." },
    super: { name: "Abrazo del oso", description: "Invoca a Bruce, un gran oso que persigue y golpea a los rivales." },
    gadgets: [
      { name: "Garras de oso", description: "Bruce golpea el suelo y aturde a los enemigos cercanos.", image: nitaG1.url },
      { name: "Piel protectora", description: "Bruce obtiene un escudo temporal contra el daño.", image: nitaG2.url },
    ],
    stars: [
      { name: "Hermano oso", description: "Nita y Bruce se curan cuando el otro golpea a un rival.", image: nitaS1.url },
      { name: "Zarpazo veloz", description: "Bruce ataca más rápido.", image: nitaS2.url },
    ],
    hypercharge: { name: "Hipercrecimiento", description: "Bruce se hace más grande, rápido y resistente." },
  },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GAMETUIN | Brawl Stars en español" },
    { name: "description", content: "Descubre con GAMETUIN los ataques, supers, gadgets, habilidades estelares e hipercargas de brawlers reales de Brawl Stars." },
    { property: "og:title", content: "GAMETUIN | Brawl Stars en español" },
    { property: "og:description", content: "Brawlers, habilidades y récords de copas en una experiencia interactiva." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});

function TrophyIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M18 3h3v3a4 4 0 0 1-3.6 4A6 6 0 0 1 13 13.9V17h3a1 1 0 0 1 1 1v2H7v-2a1 1 0 0 1 1-1h3v-3.1A6 6 0 0 1 6.6 10 4 4 0 0 1 3 6V3h3V2h12v1zM6 5H5v1a2 2 0 0 0 1 1.7V5zm13 0h-1v2.7A2 2 0 0 0 19 6V5z" /></svg>;
}
function YouTubeIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" /></svg>; }
function TikTokIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M16.6 5.8a4.8 4.8 0 0 1-3.9-4.3H9.6v12.4a2.9 2.9 0 1 1-2.1-2.8V7.9a6 6 0 1 0 5.2 6V9.3a7.8 7.8 0 0 0 4.5 1.4V7.6a4.8 4.8 0 0 1-.6-1.8z" /></svg>; }
function LightningIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M13.2 2 4.5 13.1h6.2L9.8 22l9.7-12.2H13L13.2 2z" /></svg>; }

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => { if (!active) return; let frame = 0; const start = performance.now(); const tick = (now: number) => { const p = Math.min((now - start) / 1400, 1); setValue(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, [target, active]);
  return value;
}

function ScrollProgressBar({ progress }: { progress: MotionValue<number> }) {
  return <motion.div className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-progress" style={{ scaleX: progress }} />;
}

function Decor({ variant = "default" }: { variant?: "default" | "compact" }) {
  return <div className={`brawl-decor ${variant === "compact" ? "brawl-decor--compact" : ""}`} aria-hidden="true">
    <span className="decor-skull">★</span><span className="decor-bolt">✦</span><span className="decor-cross">✚</span><span className="decor-dot" />
  </div>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, .78], [1, 0]);
  return <section ref={ref} className="relative h-[135vh]">
    <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
      <motion.div className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${bgTexture})`, scale }} />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" /><Decor />
      <motion.div style={{ y, opacity }} className="flex flex-col items-center">
        <div className="relative mb-6"><div className="avatar-burst" /><img src={gametuinAvatar} alt="GAMETUIN" className="relative h-32 w-32 rounded-full border-4 border-primary object-cover sm:h-36 sm:w-36" /></div>
        <p className="mb-2 text-xs font-black uppercase text-primary">Brawl Stars en español</p>
        <h1 className="title-game text-center text-6xl font-black sm:text-8xl">GAMETUIN</h1>
        <p className="mt-4 max-w-md text-center text-sm font-semibold text-muted-foreground sm:text-base">Brawlers reales, todas sus habilidades y las mejores jugadas.</p>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.7, repeat: Infinity }} className="mt-12 flex flex-col items-center gap-2 text-xs font-black uppercase text-primary"><span>Desliza</span><span className="text-2xl">↓</span></motion.div>
      </motion.div>
    </div>
  </section>;
}

function AbilityCard({ ability, kind, delay = 0 }: { ability: Ability; kind: string; delay?: number }) {
  return <motion.article initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ delay }} className="ability-card">
    {ability.image ? <img src={ability.image} alt="" className="h-10 w-10 shrink-0 object-contain" /> : <span className={`ability-symbol ability-symbol--${kind}`}><LightningIcon /></span>}
    <span className="min-w-0"><span className="block text-[.62rem] font-black uppercase text-muted-foreground">{kind}</span><strong className="block text-sm leading-tight">{ability.name}</strong><span className="mt-1 block text-xs leading-snug text-muted-foreground">{ability.description}</span></span>
  </motion.article>;
}

function BrawlerChapter({ brawler, index }: { brawler: Brawler; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [active, setActive] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", v => { if (v > .22 && !active) setActive(true); });
  const smooth = useSpring(scrollYProgress, { stiffness: 75, damping: 22 });
  const imageY = useTransform(smooth, [0, 1], ["18%", "-18%"]);
  const imageScale = useTransform(smooth, [0, .5, 1], [.76, 1.08, .9]);
  const glowOpacity = useTransform(smooth, [0, .5, 1], [.1, .72, .12]);
  const count = useCountUp(brawler.record, active);
  return <section ref={ref} className="relative py-20 md:h-[280vh] md:py-0">
    <div className="relative flex min-h-screen items-center px-4 py-6 sm:px-7 md:sticky md:top-0 md:h-screen md:overflow-hidden">
      <Decor variant="compact" />
      <motion.div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" style={{ background: brawler.color, opacity: glowOpacity }} />
      <div className={`mx-auto grid w-full max-w-6xl items-center gap-4 md:grid-cols-[.82fr_1.18fr] md:gap-10 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
        <motion.div style={{ y: imageY, scale: imageScale }} className="relative mx-auto flex h-[28vh] w-full max-w-xs items-center justify-center md:h-[64vh] md:max-w-md">
          <div className="brawler-rays" style={{ color: brawler.color }} />
          <img src={brawler.image} alt={`${brawler.name}, aspecto oficial de Brawl Stars`} className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl" />
          <span className="absolute bottom-0 z-20 rounded-full border-2 border-primary bg-background/90 px-3 py-1 text-[.65rem] font-black uppercase text-primary">Aspecto del juego</span>
        </motion.div>
        <div className="relative z-20 mx-auto w-full max-w-2xl">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div><span className="rarity-badge">{brawler.rarity}</span><h2 className="mt-2 text-4xl font-black leading-none sm:text-6xl">{brawler.name}</h2><p className="mt-1 text-xs font-black uppercase text-muted-foreground">Clase: {brawler.role}</p></div>
            <div className="trophy-chip"><TrophyIcon className="h-5 w-5" /><span><b>{count.toLocaleString("es-ES")}</b><small>mejor marca*</small></span></div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <AbilityCard ability={brawler.attack} kind="Ataque" /><AbilityCard ability={brawler.super} kind="Súper" delay={.05} />
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {brawler.gadgets.map((a, i) => <AbilityCard key={a.name} ability={a} kind={`Gadget ${i + 1}`} delay={i * .05} />)}
            {brawler.stars.map((a, i) => <AbilityCard key={a.name} ability={a} kind={`Habilidad estelar ${i + 1}`} delay={i * .05} />)}
          </div>
          <div className="mt-2"><AbilityCard ability={brawler.hypercharge} kind="Hipercarga" /></div>
          <p className="mt-2 text-[.62rem] text-muted-foreground">* Marca personal de ejemplo, pendiente de confirmar por GAMETUIN.</p>
        </div>
      </div>
    </div>
  </section>;
}

const MODES = ["ATRAPAGEMAS", "BALÓN BRAWL", "SUPERVIVENCIA", "ATRACO", "NOQUEO", "ZONA RESTRINGIDA"];
function GameModes() { return <section className="relative overflow-hidden border-y border-border bg-secondary/40 px-5 py-28"><Decor /><div className="relative z-10 mx-auto max-w-5xl"><p className="text-center text-xs font-black uppercase text-primary">Elige tu batalla</p><h2 className="mt-2 text-center text-4xl font-black sm:text-6xl">MODOS DE JUEGO</h2><div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">{MODES.map((m, i) => <motion.div key={m} initial={{ opacity: 0, scale: .8, rotate: i % 2 ? 3 : -3 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} className="mode-tile"><span className="text-2xl">{["◆","⚽","★","▣","☠","◎"][i]}</span><b>{m}</b></motion.div>)}</div></div></section>; }

function LinksFinale() {
  const links = [{ label: "YouTube", sub: "Suscríbete a GAMETUIN", href: YOUTUBE_URL, icon: <YouTubeIcon />, cls: "bg-brand-youtube text-brand-youtube-foreground" }, { label: "TikTok", sub: "@izan29096", href: TIKTOK_URL, icon: <TikTokIcon />, cls: "bg-foreground text-background" }];
  return <section className="relative overflow-hidden px-5 py-28"><Decor /><div className="relative z-10 mx-auto max-w-md text-center"><img src={gametuinAvatar} alt="" className="mx-auto h-20 w-20 rounded-full border-4 border-primary object-cover" /><h2 className="mt-5 text-4xl font-black">ÚNETE A LA PARTIDA</h2><p className="mb-8 mt-2 text-sm text-muted-foreground">Todo mi contenido de Brawl Stars en un solo sitio.</p><nav className="flex flex-col gap-3">{links.map((l, i) => <motion.a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="link-card text-left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}><span className={`link-card__icon ${l.cls}`}>{l.icon}</span><span className="flex flex-1 flex-col"><b>{l.label}</b><small className="text-muted-foreground">{l.sub}</small></span><span aria-hidden="true">→</span></motion.a>)}</nav><footer className="mt-14 text-xs text-muted-foreground">© {new Date().getFullYear()} GAMETUIN · Contenido no oficial para fans</footer></div></section>;
}

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <main className="relative overflow-x-hidden"><ScrollProgressBar progress={progress} /><Hero /><section className="flex min-h-screen items-center justify-center px-6"><motion.h2 initial={{ opacity: 0, scale: .8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl text-center text-4xl font-black leading-tight sm:text-6xl">CONOCE A LOS <span className="text-primary">BRAWLERS</span><small className="mt-5 block text-base font-semibold text-muted-foreground">Ataques, súper, gadgets, habilidades estelares e hipercarga.</small></motion.h2></section>{BRAWLERS.map((b, i) => <BrawlerChapter key={b.name} brawler={b} index={i} />)}<GameModes /><LinksFinale /></main>;
}
