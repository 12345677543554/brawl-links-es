import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import noriG1 from "@/assets/brawl/nori-gadget-1.png.asset.json";
import noriG2 from "@/assets/brawl/nori-gadget-2.png.asset.json";
import leonG1 from "@/assets/brawl/leon-gadget-1.png.asset.json";
import leonG2 from "@/assets/brawl/leon-gadget-2.png.asset.json";
import cordG1 from "@/assets/brawl/cordelius-gadget-1.png.asset.json";
import cordG2 from "@/assets/brawl/cordelius-gadget-2.png.asset.json";
import nori from "@/assets/brawl/nori-official.png.asset.json";
import leon from "@/assets/brawl/leon-model.png.asset.json";
import cordelius from "@/assets/brawl/cordelius-model.png.asset.json";

const GADGETS = [
  { img: noriG1.url, who: "Nori", n: "Gadget 1" }, { img: noriG2.url, who: "Nori", n: "Gadget 2" },
  { img: leonG1.url, who: "León", n: "Gadget 1" }, { img: leonG2.url, who: "León", n: "Gadget 2" },
  { img: cordG1.url, who: "Cordelius", n: "Gadget 1" }, { img: cordG2.url, who: "Cordelius", n: "Gadget 2" },
];

function GadgetRail() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0, 1], ["5%", "-75%"]);
  const spin = useTransform(p, [0, 1], [0, 720]);
  return <section ref={ref} className={`xs-gadgets${reduced ? " xs-gadgets--static" : ""}`} aria-label="Arsenal de gadgets">
    <div className="xs-sticky">
      <p className="section-kicker">Arsenal</p>
      <h2 className="xs-title">Gadgets de mis favoritos</h2>
      <motion.div className="xs-track" style={reduced ? {} : { x }}>
        {GADGETS.map((g) => <article key={g.img} className="xs-gadget">
          <motion.img src={g.img} alt={`${g.who} ${g.n}`} loading="lazy" style={reduced ? {} : { rotate: spin }} />
          <b>{g.who}</b><small>{g.n}</small>
        </article>)}
      </motion.div>
      <div className="scenes-bar"><motion.span style={{ scaleX: p }} /></div>
    </div>
  </section>;
}

const COUNT = ["3", "2", "1", "¡BRAWL!"];
function CountWord({ t, i, p }: { t: string; i: number; p: MotionValue<number> }) {
  const s = i / COUNT.length, e = (i + 1) / COUNT.length, last = i === COUNT.length - 1;
  const opacity = useTransform(p, [s, s + .02, e - .02, e], [0, 1, 1, last ? 1 : 0]);
  const scale = useTransform(p, [s, e], [3, last ? 1 : .4]);
  const rotate = useTransform(p, [s, e], [last ? -10 : 20, 0]);
  return <motion.span className={`xs-count-word${last ? " xs-count-word--go" : ""}`} style={{ opacity, scale, rotate }}>{t}</motion.span>;
}

function Countdown() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const ring = useTransform(p, [0, 1], [0, 1]);
  if (reduced) return <section className="xs-count-static" aria-label="Cuenta atrás"><h2>3 · 2 · 1 · ¡BRAWL!</h2></section>;
  return <motion.section ref={ref} className="xs-count" aria-label="Cuenta atrás">
    <div className="xs-sticky xs-sticky--center">
      <svg className="xs-count-ring" viewBox="0 0 100 100" aria-hidden="true"><motion.circle cx="50" cy="50" r="45" style={{ pathLength: ring }} /></svg>
      {COUNT.map((t, i) => <CountWord key={t} t={t} i={i} p={p} />)}
    </div>
  </motion.section>;
}

function Squad() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const l = useTransform(p, [0, .5], ["-60%", "0%"]);
  const r = useTransform(p, [0, .5], ["60%", "0%"]);
  const c = useTransform(p, [0, .5, 1], [.5, 1.1, .9]);
  const word = useTransform(p, [0, 1], ["20%", "-40%"]);
  return <section ref={ref} className="xs-squad" aria-label="Mi equipo">
    <motion.span className="xs-squad-word" style={reduced ? {} : { x: word }} aria-hidden="true">EQUIPO · EQUIPO · EQUIPO</motion.span>
    <div className="xs-squad-row">
      <motion.img src={nori.url} alt="Nori" loading="lazy" style={reduced ? {} : { x: l }} />
      <motion.img src={cordelius.url} alt="Cordelius" loading="lazy" className="xs-squad-mid" style={reduced ? {} : { scale: c }} />
      <motion.img src={leon.url} alt="León" loading="lazy" style={reduced ? {} : { x: r }} />
    </div>
    <h2 className="xs-title">Mi trío de confianza</h2>
  </section>;
}

function Community({ youtube, tiktok }: { youtube: string; tiktok: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clip = useTransform(p, [0, 1], ["circle(8% at 50% 50%)", "circle(75% at 50% 50%)"]);
  const y = useTransform(p, [0, 1], [80, 0]);
  return <section ref={ref} className="xs-community" aria-label="Únete a la comunidad">
    <motion.div className="xs-community-card" style={reduced ? {} : { clipPath: clip }}>
      <motion.div style={reduced ? {} : { y }}>
        <p className="section-kicker">Comunidad</p>
        <h2 className="xs-title">Únete a la banda GAMETUIN</h2>
        <p>Suscríbete y sígueme para no perderte ninguna partida.</p>
        <div className="xs-community-actions">
          <a href={youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </motion.div>
    </motion.div>
  </section>;
}

export function ExtraSections({ youtube, tiktok }: { youtube: string; tiktok: string }) {
  return <><Squad /><GadgetRail /><Countdown /><Community youtube={youtube} tiktok={tiktok} /></>;
}
