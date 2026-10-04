import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight, CalendarDays, Check, ChevronRight, Gamepad2, Play, Sparkles, Trophy, Youtube } from "lucide-react";
import gametuinAvatar from "@/assets/gametuin-avatar.png";
import bgTexture from "@/assets/bg-texture.png";
import nori from "@/assets/brawl/nori-official.png.asset.json";
import leon from "@/assets/brawl/leon-model.png.asset.json";
import cordelius from "@/assets/brawl/cordelius-model.png.asset.json";
import noriGadget1 from "@/assets/brawl/nori-gadget-1.png.asset.json";
import noriGadget2 from "@/assets/brawl/nori-gadget-2.png.asset.json";
import leonGadget1 from "@/assets/brawl/leon-gadget-1.png.asset.json";
import leonGadget2 from "@/assets/brawl/leon-gadget-2.png.asset.json";
import cordeliusGadget1 from "@/assets/brawl/cordelius-gadget-1.png.asset.json";
import cordeliusGadget2 from "@/assets/brawl/cordelius-gadget-2.png.asset.json";
import directoPortada from "@/assets/directo-portada.jpeg.asset.json";
import fame0 from "@/assets/brawl/fame-0.png.asset.json";
import fame1 from "@/assets/brawl/fame-1.png.asset.json";
import fame2 from "@/assets/brawl/fame-2.png.asset.json";
import fame3 from "@/assets/brawl/fame-3.png.asset.json";
import fame4 from "@/assets/brawl/fame-4.png.asset.json";
import fame5 from "@/assets/brawl/fame-5.png.asset.json";
import fame6 from "@/assets/brawl/fame-6.png.asset.json";

// Edita estas listas para actualizar enlaces, vídeos y datos del creador.
const SOCIAL_LINKS = {
  youtube: "https://m.youtube.com/@GAMETUIN?ra=m",
  tiktok: "https://www.tiktok.com/@izan29096",
};

const LATEST_CONTENT = [
  { title: "Siguiente directo a las 4 de la tarde (hora española)", date: "Ya disponible en mi canal", platform: "TikTok", href: "https://vm.tiktok.com/ZGdQn8TA4/", accent: "tiktok", published: true, cover: directoPortada.url as string },
  { title: "Próximo vídeo de GAMETUIN", date: "Muy pronto", platform: "YouTube", href: SOCIAL_LINKS.youtube, accent: "youtube", published: false },
  { title: "Más jugadas y novedades", date: "Muy pronto", platform: "GAMETUIN", href: SOCIAL_LINKS.youtube, accent: "brawl", published: false },
];

const CREATOR_STATS = [
  { value: "—", label: "Vídeos publicados" },
  { value: "3", label: "Brawlers favoritos" },
  { value: "2", label: "Plataformas" },
];

const FAVORITES = [
  { name: "Nori", image: nori.url, label: "01", position: "left", gadgets: [{ name: "Merienda de makis", image: noriGadget1.url }, { name: "Pesca de arrastre", image: noriGadget2.url }] },
  { name: "León", image: leon.url, label: "02", position: "right", gadgets: [{ name: "Proyector clonador", image: leonGadget1.url }, { name: "Piruleta furtiva", image: leonGadget2.url }] },
  { name: "Cordelius", image: cordelius.url, label: "03", position: "center", gadgets: [{ name: "Replantar", image: cordeliusGadget1.url }, { name: "Champiñón venenoso", image: cordeliusGadget2.url }] },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GAMETUIN | Creador de contenido de Brawl Stars" },
      { name: "description", content: "Redes, vídeos y contenido de Brawl Stars de GAMETUIN en español. Encuentra YouTube, TikTok, brawlers favoritos y novedades." },
      { property: "og:title", content: "GAMETUIN | Brawl Stars en español" },
      { property: "og:description", content: "Descubre las redes, vídeos y contenido de Brawl Stars de GAMETUIN." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "GAMETUIN", description: "Creador de contenido de Brawl Stars", sameAs: [SOCIAL_LINKS.youtube, SOCIAL_LINKS.tiktok] }),
    }],
  }),
  component: Index,
});



function TikTokIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M16.6 5.8a4.8 4.8 0 0 1-3.9-4.3H9.6v12.4a2.9 2.9 0 1 1-2.1-2.8V7.9a6 6 0 1 0 5.2 6V9.3a7.8 7.8 0 0 0 4.5 1.4V7.6a4.8 4.8 0 0 1-.6-1.8z" /></svg>;
}

function Decor() {
  return <div className="page-decor" aria-hidden="true"><span>★</span><span>✦</span><span>✚</span><span>◆</span></div>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="section-heading"><p className="section-kicker">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div>;
}

const UNIVERSE_ORBS = [
  { img: nori.url, x: -300, y: -150 }, { img: cordelius.url, x: 300, y: -120 },
  { img: noriGadget1.url, x: -340, y: 120 }, { img: leonGadget1.url, x: 330, y: 150 },
  { img: cordeliusGadget1.url, x: -160, y: 230 }, { img: leonGadget2.url, x: 170, y: -240 },
];
const UNIVERSE_CARDS = [
  { t: "Atrapagemas", d: "Consigue 10 gemas" }, { t: "Balón Brawl", d: "Marca 2 goles" },
  { t: "Supervivencia", d: "El último en pie" }, { t: "Atraco", d: "Revienta la caja" },
];

function UniverseOrb({ orb, i, p }: { orb: (typeof UNIVERSE_ORBS)[number]; i: number; p: MotionValue<number> }) {
  const s = typeof window !== "undefined" && window.innerWidth < 768 ? .5 : 1;
  const x = useTransform(p, [.25, .55, .9], [0, orb.x * s, orb.x * s * .4]);
  const y = useTransform(p, [.25, .55, .9], [0, orb.y * s, orb.y * s * .4]);
  const opacity = useTransform(p, [.25 + i * .02, .4, .82, .95], [0, 1, 1, 0]);
  const rotate = useTransform(p, [.25, 1], [0, i % 2 ? 25 : -25]);
  return <motion.div className="universe__orb" style={{ x, y, opacity, rotate }}><img src={orb.img} alt="" loading="lazy" /></motion.div>;
}

function UniverseCard({ c, i, p }: { c: (typeof UNIVERSE_CARDS)[number]; i: number; p: MotionValue<number> }) {
  const start = .5 + i * .04;
  const opacity = useTransform(p, [start, start + .08, .86, .95], [0, 1, 1, 0]);
  const y = useTransform(p, [start, start + .08], [50, 0]);
  return <motion.div className="universe__card" style={{ opacity, y }}><b>{c.t}</b><span>{c.d}</span></motion.div>;
}

function BrawlUniverse() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(p, [0, .2, .45, .7, 1], [.3, .7, 1, 1.25, .6]);
  const coreOpacity = useTransform(p, [0, .08, .92, 1], [0, 1, 1, .3]);
  const ringRotate = useTransform(p, [0, 1], [0, 270]);
  const headOpacity = useTransform(p, [0, .06, .3, .4], [0, 1, 1, 0]);
  const headY = useTransform(p, [0, .4], [30, -60]);
  const head2Opacity = useTransform(p, [.42, .5, .88, .96], [0, 1, 1, 0]);
  return <section ref={ref} className="universe" aria-label="El universo de Brawl Stars">
    <div className="universe__sticky">
      <motion.div className="universe__head" style={{ opacity: headOpacity, y: headY }}><p className="section-kicker">Entra en la arena</p><h2>El universo de Brawl Stars</h2><p>Brawlers, gadgets y modos de juego: todo lo que hace especial al juego que protagoniza mi contenido.</p></motion.div>
      <motion.div className="universe__head" style={{ opacity: head2Opacity }}><p className="section-kicker">Modos de juego</p><h2>Cada partida, una historia</h2></motion.div>
      <motion.div className="universe__core" style={{ scale, opacity: coreOpacity }}>
        <div className="universe__glow" /><motion.div className="universe__ring" style={{ rotate: ringRotate }} />
        {UNIVERSE_ORBS.map((o, i) => <UniverseOrb key={i} orb={o} i={i} p={p} />)}
        <img src={leon.url} alt="León, brawler de Brawl Stars" />
      </motion.div>
      <div className="universe__cards">{UNIVERSE_CARDS.map((c, i) => <UniverseCard key={c.t} c={c} i={i} p={p} />)}</div>
    </div>
  </section>;
}

function HeroLetter({ ch, i, n, p }: { ch: string; i: number; n: number; p: MotionValue<number> }) {
  const off = i - (n - 1) / 2;
  const y = useTransform(p, [0, .7], [0, (i % 2 ? -1 : 1) * 90]);
  const x = useTransform(p, [0, .7], [0, off * 34]);
  const rotate = useTransform(p, [0, .7], [0, off * 9]);
  const scale = useTransform(p, [0, .7], [1, 1 + (i % 3) * .25]);
  const opacity = useTransform(p, [.25 + i * .03, .75], [1, 0]);
  return <motion.span aria-hidden="true" className="hero-letter" style={{ x, y, rotate, scale, opacity }}>{ch}</motion.span>;
}

function SectionDots() {
  const { scrollYProgress } = useScroll();
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <div className="section-rail" aria-hidden="true"><motion.span style={{ height: h }} /></div>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

function GalleryWord({ word, index, progress }: { word: string; index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index * .035, index * .035 + .14], [.3, 1]);
  const y = useTransform(progress, [index * .035, index * .035 + .14], [18, 0]);
  return <motion.span style={{ opacity, y }} className="gallery-word">{word}</motion.span>;
}

function HorizontalGallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6667%"]);
  const title = "Mis brawlers favoritos".split(" ");
  return <section ref={ref} className="gallery" aria-label="Galería de brawlers favoritos">
    <div className="gallery__sticky">
      <div className="gallery__header"><p className="section-kicker">Mi equipo / 03</p><h2>{title.map((word, i) => <GalleryWord key={i} word={word} index={i} progress={scrollYProgress} />)}</h2></div>
      <motion.div className="gallery__track" style={{ x }}>
        {FAVORITES.map((brawler, i) => <GalleryPanel key={brawler.name} brawler={brawler} index={i} progress={scrollYProgress} />)}
      </motion.div>
      <div className="gallery__progress" aria-hidden="true"><motion.span style={{ scaleX: scrollYProgress }} /></div>
    </div>
  </section>;
}

function GalleryPanel({ brawler, index, progress }: { brawler: (typeof FAVORITES)[number]; index: number; progress: MotionValue<number> }) {
  const center = index / 2;
  const scale = useTransform(progress, [center - .5, center, center + .5], [.78, 1, .78]);
  const imageY = useTransform(progress, [center - .5, center + .5], [50, -50]);
  const copyX = useTransform(progress, [center - .5, center + .5], [36, -36]);
  return <article className={`gallery__panel gallery__panel--${index + 1}`}>
    <div className="gallery__rays" aria-hidden="true" />
    <motion.img src={brawler.image} alt={brawler.name} loading="lazy" className="gallery__image" style={{ scale, y: imageY }} />
    <motion.div className="gallery__copy" style={{ x: copyX }}><span>{brawler.label} / 03</span><h3>{brawler.name}</h3><p>Brawler favorito de GAMETUIN</p></motion.div>
  </article>;
}

// Datos del sistema de Fama (verificados con guías actualizadas del juego).
const FAMA_TIERS = [
  { name: "Fama Mundial", image: fame0.url, color: "#4da3ff", copy: "La primera escala de Fama: el punto de partida de tu progreso global en el juego." },
  { name: "Fama Lunar", image: fame1.url, color: "#b7c5ff", copy: "Inspirada en la Luna, con tonos plateados y azules nocturnos." },
  { name: "Fama Marciana", image: fame2.url, color: "#ff7a4d", copy: "El planeta rojo: tonos carmesí y cobrizos para veteranos." },
  { name: "Fama Saturniana", image: fame3.url, color: "#4de0c4", copy: "Anillos planetarios en tonos turquesa y verde azulado." },
  { name: "Fama Solar", image: fame4.url, color: "#ffc93d", copy: "Resplandor dorado ardiente y pura energía solar." },
  { name: "Fama Meteórica", image: fame5.url, color: "#b98cff", copy: "Púrpura cósmico y destellos de meteorito. Muy exclusiva." },
  { name: "Fama Alienígena", image: fame6.url, color: "#7dffb2", copy: "El rango más alto y exclusivo: solo para los más dedicados." },
];

const FAMA_REWARDS = [
  { level: "Nivel I", reward: "Fondo de tarjeta de batalla" },
  { level: "Nivel II", reward: "Icono de jugador exclusivo" },
  { level: "Nivel III", reward: "Pin temático de esa Fama" },
];

function FamaSection() {
  return <section id="famas" className="content-band fama-section" aria-label="Sistema de Fama de Brawl Stars">
    <Decor />
    <div className="section-inner">
      <SectionHeading eyebrow="Brawl Stars" title="Sistema de Fama" copy="El máximo prestigio para quienes ya lo han desbloqueado casi todo en el juego." />
      <div className="fama-intro">
        <article className="fama-info">
          <h3><Sparkles /> ¿Qué son las Famas?</h3>
          <p>Las Famas son el sistema de progresión de Brawl Stars que te permite avanzar en diferentes categorías, conseguir recompensas y lucir tu veteranía delante de otros jugadores.</p>
        </article>
        <article className="fama-info">
          <h3><Gamepad2 /> Famas Mundiales</h3>
          <p>La Fama Mundial es la primera escala: está ligada a tu progresión global y muestra tu nivel dentro del sistema de Fama en tu perfil de jugador.</p>
        </article>
        <article className="fama-info">
          <h3><Trophy /> Créditos y Fama</h3>
          <p>Al tener todos los brawlers, los créditos que consigues (Brawl Pass, Camino de Trofeos, Premios Starr…) se invierten automáticamente en subir tu Fama. Si llega un brawler nuevo, los créditos vuelven a desbloquearlo primero y después siguen alimentando tu Fama.</p>
        </article>
      </div>
      <div className="fama-grid">
        {FAMA_TIERS.map((tier) => <article key={tier.name} className="fama-card" style={{ "--fama-color": tier.color } as CSSProperties}>
          <span className="fama-card__icon"><span className="fama-coin">{[0, 1, 2, 3, 4, 5].map((l) => <img key={l} src={tier.image} alt={l === 5 ? `Icono oficial de ${tier.name}` : ""} aria-hidden={l === 5 ? undefined : true} loading="lazy" className="fama-coin__layer" style={{ "--l": l } as CSSProperties} />)}<span className="fama-coin__shine" aria-hidden="true" /></span></span>
          <h3>{tier.name}</h3>
          <p>{tier.copy}</p>
          <span className="fama-card__levels">3 niveles · I · II · III</span>
        </article>)}
      </div>
      <div className="fama-rewards">
        {FAMA_REWARDS.map((item) => <div key={item.level} className="fama-reward"><b>{item.level}</b><span>{item.reward}</span></div>)}
      </div>
    </div>
  </section>;
}

function useScrollFallback() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()") || !("IntersectionObserver" in window)) return;
    const els = document.querySelectorAll(".section-heading, .platform-card, .brawl-intro, .stats-row > div, .featured-callout, .favorites-title, .fama-info, .fama-card, .fama-reward, .site-footer__inner");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle("sd-in", e.isIntersecting)), { threshold: .15 });
    els.forEach((el) => { el.classList.add("sd-io"); io.observe(el); });
    return () => io.disconnect();
  }, []);
}

function Index() {
  useScrollFallback();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const texY = useTransform(hp, [0, 1], ["0%", "35%"]);
  const texScale = useTransform(hp, [0, 1], [1, 1.35]);
  const avatarScale = useTransform(hp, [0, .8], [1, 1.6]);
  const avatarY = useTransform(hp, [0, .8], [0, 120]);
  const avatarOp = useTransform(hp, [.4, .85], [1, 0]);
  const copyY = useTransform(hp, [0, 1], [0, -80]);
  const heroClip = useTransform(hp, [.3, 1], ["inset(0% 0% 0% 0% round 0px)", "inset(6% 4% 10% 4% round 48px)"]);
  return <main className="site-shell">
    <ScrollProgress />
    <SectionDots />
    <div className="arena-bg" aria-hidden="true"><div className="arena-bg__stars" /><div className="arena-bg__floor" /><span className="arena-bg__shape">★</span><span className="arena-bg__shape">✦</span><span className="arena-bg__shape">◆</span></div>
    <div className="page-loader" aria-hidden="true"><div className="loader-mark"><Gamepad2 /></div></div>
    <motion.section ref={heroRef} className="profile-hero" style={{ clipPath: heroClip }}>
      <motion.div className="profile-hero__texture" style={{ backgroundImage: `url(${bgTexture})`, y: texY, scale: texScale }} />
      <Decor />
      <nav className="top-nav" aria-label="Navegación principal">
        <a href="#inicio" className="nav-brand"><span className="nav-brand__mark">G</span><b>GAMETUIN</b></a>
        <div className="top-nav__links"><a href="#contenido">Vídeos</a><a href="#brawl-stars">Brawl Stars</a></div>
        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="mini-cta"><Youtube className="h-4 w-4" /> YouTube</a>
      </nav>

      <div id="inicio" className="profile-hero__content">
        <motion.div initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .55 }} className="profile-avatar-wrap"><motion.div style={{ scale: avatarScale, y: avatarY, opacity: avatarOp }} className="profile-avatar-motion">
          <div className="profile-avatar-burst" /><img src={gametuinAvatar} alt="Avatar de GAMETUIN" className="profile-avatar" />
          <span className="online-dot" aria-label="Perfil activo" />
        </motion.div></motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .08 }} className="profile-copy"><motion.div style={{ y: copyY }}>
          <div className="profile-name"><h1 aria-label="GAMETUIN">{"GAMETUIN".split("").map((c, i) => <HeroLetter key={i} ch={c} i={i} n={8} p={hp} />)}</h1><span className="verified" title="Creador verificado"><Check /></span></div>
          <p className="profile-role"><Gamepad2 /> Creador de contenido de Brawl Stars</p>
          <p className="profile-intro">¡Bienvenido a mi zona! Aquí encontrarás todas mis redes, vídeos y contenido de Brawl Stars.</p>
          <div className="profile-actions">
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="action-primary"><Youtube /> Ver YouTube</a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="action-secondary"><TikTokIcon /> @izan29096</a>
          </div>
        </motion.div></motion.div>
      </div>
      <div className="hero-strip"><span><Trophy /> BRAWLERS</span><span><Play /> VÍDEOS</span><span><Sparkles /> JUGADAS</span></div>
    </motion.section>

    <BrawlUniverse />

    <section className="content-band platforms-section">
      <div className="section-inner">
        <SectionHeading eyebrow="Sígueme" title="Todas mis redes" copy="No te pierdas ningún vídeo, clip o novedad." />
        <div className="platform-grid">
          <article className="platform-card platform-card--youtube"><span className="platform-icon"><Youtube /></span><div><h3>YouTube</h3><p>Vídeos, partidas y contenido largo de Brawl Stars.</p></div><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">Visitar <ArrowUpRight /></a></article>
          <article className="platform-card platform-card--tiktok"><span className="platform-icon"><TikTokIcon /></span><div><h3>TikTok</h3><p>Clips rápidos, jugadas y momentos de la comunidad.</p></div><a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer">Visitar <ArrowUpRight /></a></article>
        </div>
      </div>
    </section>

    <HorizontalGallery />

    <section id="contenido" className="content-band latest-section">
      <Decor />
      <div className="section-inner">
        <SectionHeading eyebrow="Último contenido" title="Nuevas jugadas en camino" copy="Los vídeos reales aparecerán aquí en cuanto GAMETUIN añada sus enlaces." />
        <div className="video-grid">{LATEST_CONTENT.map((video, index) => <motion.article key={video.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .08 }} className="video-card">
          <div className={`video-thumb video-thumb--${video.accent}${video.published ? " video-thumb--published" : ""}`}>{video.cover ? <img src={video.cover} alt="" className="video-thumb__cover" loading="lazy" /> : null}<span className="video-thumb__number">0{index + 1}</span><a href={video.href} target="_blank" rel="noopener noreferrer" className="video-play video-play--ghost" aria-label={`Ver "${video.title}"`}><Play /></a><span className="video-coming">{video.published ? "DISPONIBLE" : "PRÓXIMAMENTE"}</span></div>
          <div className="video-card__body"><span className="video-platform">{video.platform}</span><h3>{video.title}</h3><p><CalendarDays /> {video.date}</p><a href={video.href} target="_blank" rel="noopener noreferrer">Ir al canal <ChevronRight /></a></div>
        </motion.article>)}</div>
      </div>
    </section>

    <section id="brawl-stars" className="brawl-section">
      <Decor />
      <div className="section-inner">
        <div className="brawl-intro"><div><p className="section-kicker">Zona de combate</p><h2>Mi contenido de <span>Brawl Stars</span></h2><p>Partidas, consejos, retos, novedades y jugadas con mis brawlers favoritos.</p></div><div className="content-tags"><span>Gameplays</span><span>Consejos</span><span>Retos</span><span>Novedades</span></div></div>
        <div className="stats-row">{CREATOR_STATS.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        <div className="featured-callout"><span className="featured-callout__icon"><Play /></span><div><p className="section-kicker">Vídeos destacados</p><h3>Las mejores partidas estarán aquí</h3><p>Añade tus enlaces reales para convertir esta zona en tu escaparate de contenido.</p></div><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">Ver canal <ArrowUpRight /></a></div>
      </div>
    </section>

    <FamaSection />

    <footer className="site-footer"><div className="site-footer__inner"><div className="footer-brand"><span>G</span><div><b>GAMETUIN</b><small>Creador de Brawl Stars</small></div></div><div className="footer-socials"><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube /></a><a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon /></a></div><div className="footer-legal"><span>© 2026 GAMETUIN</span><Link to="/politica-de-privacidad">Política de privacidad</Link><Link to="/aviso-legal">Aviso legal</Link></div></div></footer>
  </main>;
}
