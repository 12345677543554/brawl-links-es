import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
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

// Edita estas listas para actualizar enlaces, vídeos y datos del creador.
const SOCIAL_LINKS = {
  youtube: "https://m.youtube.com/@GAMETUIN?ra=m",
  tiktok: "https://www.tiktok.com/@izan29096",
};

const LATEST_CONTENT = [
  { title: "Clip de Brawl Stars en TikTok", date: "Publicado", platform: "TikTok", href: "https://vm.tiktok.com/ZGdQn8TA4/", accent: "tiktok", published: true },
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

function FavoriteLayer({ brawler, index, progress }: { brawler: (typeof FAVORITES)[number]; index: number; progress: MotionValue<number> }) {
  const sceneRanges = [
    { visibility: [0, .25, .32], opacity: [1, 1, 0], growth: [0, .28] },
    { visibility: [.28, .38, .62, .69], opacity: [0, 1, 1, 0], growth: [.28, .66] },
    { visibility: [.64, .76, 1], opacity: [0, 1, 1], growth: [.64, 1] },
  ];
  const range = sceneRanges[index];
  const opacity = useTransform(progress, range.visibility, range.opacity);
  const imageY = useTransform(progress, range.growth, [100, -18]);
  const imageScale = useTransform(progress, range.growth, [.48, 1.18]);
  const gadgetY = useTransform(progress, range.growth, [-22, 0]);
  const gadgetScale = useTransform(progress, range.growth, [.78, 1.04]);

  return <motion.article className={`favorite-scene__layer favorite-scene__layer--${index + 1} favorite-scene__layer--${brawler.position}`} style={{ opacity }}>
    <div className="favorite-scene__rays" />
    <motion.div className="favorite-scene__gadgets" style={{ y: gadgetY, scale: gadgetScale }}>
      <span className="favorite-scene__gadgets-label">Gadgets</span>
      <div>{brawler.gadgets.map((gadget) => <figure key={gadget.name}><img src={gadget.image} alt="" /><figcaption>{gadget.name}</figcaption></figure>)}</div>
    </motion.div>
    <div className="favorite-scene__copy"><span>{brawler.label} / 03</span><h4>{brawler.name}</h4><p>Brawler favorito de GAMETUIN</p></div>
    <motion.img className="favorite-scene__brawler" src={brawler.image} alt={`${brawler.name}, brawler favorito de GAMETUIN`} style={{ y: imageY, scale: imageScale }} />
  </motion.article>;
}

function ScrollFavorites() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <div ref={sectionRef} className="favorite-scroll">
    <div className="favorite-scroll__sticky">
      <div className="favorite-scroll__progress" aria-hidden="true"><motion.span style={{ scaleX: progressScale }} /></div>
      <div className="favorite-scroll__steps" aria-label="Nori, León y Cordelius son los brawlers favoritos de GAMETUIN">
        {FAVORITES.map((brawler, index) => <FavoriteLayer key={brawler.name} brawler={brawler} index={index} progress={scrollYProgress} />)}
      </div>
      <span className="favorite-scroll__hint">DESLIZA PARA DESCUBRIRLOS</span>
    </div>
  </div>;
}

function Index() {
  return <main className="site-shell">
    <div className="page-loader" aria-hidden="true"><div className="loader-mark"><Gamepad2 /></div></div>
    <section className="profile-hero">
      <div className="profile-hero__texture" style={{ backgroundImage: `url(${bgTexture})` }} />
      <Decor />
      <nav className="top-nav" aria-label="Navegación principal">
        <a href="#inicio" className="nav-brand"><span className="nav-brand__mark">G</span><b>GAMETUIN</b></a>
        <div className="top-nav__links"><a href="#contenido">Vídeos</a><a href="#brawl-stars">Brawl Stars</a></div>
        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="mini-cta"><Youtube className="h-4 w-4" /> YouTube</a>
      </nav>

      <div id="inicio" className="profile-hero__content">
        <motion.div initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .55 }} className="profile-avatar-wrap">
          <div className="profile-avatar-burst" /><img src={gametuinAvatar} alt="Avatar de GAMETUIN" className="profile-avatar" />
          <span className="online-dot" aria-label="Perfil activo" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .08 }} className="profile-copy">
          <div className="profile-name"><h1>GAMETUIN</h1><span className="verified" title="Creador verificado"><Check /></span></div>
          <p className="profile-role"><Gamepad2 /> Creador de contenido de Brawl Stars</p>
          <p className="profile-intro">¡Bienvenido a mi zona! Aquí encontrarás todas mis redes, vídeos y contenido de Brawl Stars.</p>
          <div className="profile-actions">
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="action-primary"><Youtube /> Ver YouTube</a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="action-secondary"><TikTokIcon /> @izan29096</a>
          </div>
        </motion.div>
      </div>
      <div className="hero-strip"><span><Trophy /> BRAWLERS</span><span><Play /> VÍDEOS</span><span><Sparkles /> JUGADAS</span></div>
    </section>

    <section className="content-band platforms-section">
      <div className="section-inner">
        <SectionHeading eyebrow="Sígueme" title="Todas mis redes" copy="No te pierdas ningún vídeo, clip o novedad." />
        <div className="platform-grid">
          <article className="platform-card platform-card--youtube"><span className="platform-icon"><Youtube /></span><div><h3>YouTube</h3><p>Vídeos, partidas y contenido largo de Brawl Stars.</p></div><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">Visitar <ArrowUpRight /></a></article>
          <article className="platform-card platform-card--tiktok"><span className="platform-icon"><TikTokIcon /></span><div><h3>TikTok</h3><p>Clips rápidos, jugadas y momentos de la comunidad.</p></div><a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer">Visitar <ArrowUpRight /></a></article>
        </div>
      </div>
    </section>

    <section id="contenido" className="content-band latest-section">
      <Decor />
      <div className="section-inner">
        <SectionHeading eyebrow="Último contenido" title="Nuevas jugadas en camino" copy="Los vídeos reales aparecerán aquí en cuanto GAMETUIN añada sus enlaces." />
        <div className="video-grid">{LATEST_CONTENT.map((video, index) => <motion.article key={video.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .08 }} className="video-card">
          <div className={`video-thumb video-thumb--${video.accent}`}><span className="video-thumb__number">0{index + 1}</span><div className="video-play"><Play /></div><span className="video-coming">PRÓXIMAMENTE</span></div>
          <div className="video-card__body"><span className="video-platform">{video.platform}</span><h3>{video.title}</h3><p><CalendarDays /> {video.date}</p><a href={video.href} target="_blank" rel="noopener noreferrer">Ir al canal <ChevronRight /></a></div>
        </motion.article>)}</div>
      </div>
    </section>

    <section id="brawl-stars" className="brawl-section">
      <Decor />
      <div className="section-inner">
        <div className="brawl-intro"><div><p className="section-kicker">Zona de combate</p><h2>Mi contenido de <span>Brawl Stars</span></h2><p>Partidas, consejos, retos, novedades y jugadas con mis brawlers favoritos.</p></div><div className="content-tags"><span>Gameplays</span><span>Consejos</span><span>Retos</span><span>Novedades</span></div></div>
        <div className="stats-row">{CREATOR_STATS.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        <div className="favorites-title"><div><p className="section-kicker">Mi equipo</p><h3>Brawlers favoritos</h3></div><span>Imágenes auténticas del juego</span></div>
        <ScrollFavorites />
        <div className="featured-callout"><span className="featured-callout__icon"><Play /></span><div><p className="section-kicker">Vídeos destacados</p><h3>Las mejores partidas estarán aquí</h3><p>Añade tus enlaces reales para convertir esta zona en tu escaparate de contenido.</p></div><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">Ver canal <ArrowUpRight /></a></div>
      </div>
    </section>

    <footer className="site-footer"><div className="site-footer__inner"><div className="footer-brand"><span>G</span><div><b>GAMETUIN</b><small>Creador de Brawl Stars</small></div></div><div className="footer-socials"><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube /></a><a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon /></a></div><div className="footer-legal"><span>© 2026 GAMETUIN</span><Link to="/politica-de-privacidad">Política de privacidad</Link><Link to="/aviso-legal">Aviso legal</Link></div></div></footer>
  </main>;
}
