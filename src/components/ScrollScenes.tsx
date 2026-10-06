import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import nori from "@/assets/brawl/nori-official.png.asset.json";
import leon from "@/assets/brawl/leon-model.png.asset.json";
import cordelius from "@/assets/brawl/cordelius-model.png.asset.json";

const WORDS = ["JUEGA", "GRABA", "COMPARTE", "GAMETUIN"];

function Word({ text, i, p }: { text: string; i: number; p: MotionValue<number> }) {
  const n = WORDS.length, s = i / n, e = (i + 1) / n;
  const opacity = useTransform(p, [s, s + .06, e - .06, e], [0, 1, 1, i === n - 1 ? 1 : 0]);
  const scale = useTransform(p, [s, e], [.6, i === n - 1 ? 1.1 : 1.6]);
  const rotateX = useTransform(p, [s, s + .08], [70, 0]);
  const filter = useTransform(p, [s, s + .06, e - .06, e], ["blur(14px)", "blur(0px)", "blur(0px)", i === n - 1 ? "blur(0px)" : "blur(14px)"]);
  return <motion.span className="scenes-word" style={{ opacity, scale, rotateX, filter }}>{text}</motion.span>;
}

const STEPS = [
  { t: "Elige brawler", c: "Nori, León o Cordelius." },
  { t: "Entra en partida", c: "Cada modo, una estrategia." },
  { t: "Graba la jugada", c: "Los mejores momentos." },
  { t: "Súbelo al canal", c: "YouTube y TikTok." },
];

function Step({ i, p, t, c }: { i: number; p: MotionValue<number>; t: string; c: string }) {
  const s = .1 + i * .2;
  const opacity = useTransform(p, [s, s + .1], [0, 1]);
  const x = useTransform(p, [s, s + .15], [i % 2 ? 160 : -160, 0]);
  const rotate = useTransform(p, [s, s + .15], [i % 2 ? 8 : -8, 0]);
  return <motion.div className="scenes-step" style={{ opacity, x, rotate }}><b>0{i + 1}</b><h3>{t}</h3><p>{c}</p></motion.div>;
}

export function ScrollScenes() {
  const reduced = useReducedMotion();
  const textRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: tp } = useScroll({ target: textRef, offset: ["start start", "end end"] });
  const { scrollYProgress: ip } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const { scrollYProgress: sp } = useScroll({ target: stickyRef, offset: ["start start", "end end"] });
  const bg = useTransform(tp, [0, 1], ["color-mix(in oklab, var(--background) 92%, var(--chart-3))", "color-mix(in oklab, var(--background) 80%, var(--primary))"]);
  const y1 = useTransform(ip, [0, 1], [180, -180]);
  const y2 = useTransform(ip, [0, 1], [-60, 60]);
  const y3 = useTransform(ip, [0, 1], [260, -260]);
  const zoom = useTransform(ip, [0, .5, 1], [.75, 1.1, .85]);
  const rot = useTransform(ip, [0, 1], [-12, 12]);
  const clip = useTransform(ip, [0, .4], ["inset(40% 40% 40% 40% round 2rem)", "inset(0% 0% 0% 0% round 2rem)"]);
  const line = useTransform(sp, [0, 1], [0, 1]);
  const ring = useTransform(sp, [0, 1], [0, 360]);

  if (reduced) return <section className="scenes-static" aria-label="Juega, graba, comparte">
    <h2>JUEGA · GRABA · COMPARTE · GAMETUIN</h2>
    <div className="scenes-steps">{STEPS.map((s, i) => <div key={s.t} className="scenes-step"><b>0{i + 1}</b><h3>{s.t}</h3><p>{s.c}</p></div>)}</div>
  </section>;

  return <>
    <motion.section ref={textRef} className="scenes-text" style={{ background: bg }} aria-label="Juega, graba, comparte">
      <div className="scenes-sticky"><div className="scenes-words">{WORDS.map((w, i) => <Word key={w} text={w} i={i} p={tp} />)}</div></div>
    </motion.section>

    <section ref={imgRef} className="scenes-parallax" aria-label="Brawlers en profundidad">
      <motion.div className="scenes-frame" style={{ clipPath: clip }}>
        <motion.img src={nori.url} alt="Nori" loading="lazy" className="scenes-img scenes-img--a" style={{ y: y1, rotate: rot }} />
        <motion.img src={leon.url} alt="León" loading="lazy" className="scenes-img scenes-img--b" style={{ y: y2, scale: zoom }} />
        <motion.img src={cordelius.url} alt="Cordelius" loading="lazy" className="scenes-img scenes-img--c" style={{ y: y3, rotate: useTransform(rot, (r) => -r) }} />
      </motion.div>
    </section>

    <section ref={stickyRef} className="scenes-steps-wrap" aria-label="Cómo nace un vídeo">
      <div className="scenes-sticky">
        <motion.svg className="scenes-ring" viewBox="0 0 100 100" style={{ rotate: ring }} aria-hidden="true"><motion.circle cx="50" cy="50" r="46" style={{ pathLength: line }} /></motion.svg>
        <h2 className="scenes-steps-title">Cómo nace un vídeo</h2>
        <div className="scenes-steps">{STEPS.map((s, i) => <Step key={s.t} i={i} p={sp} {...s} />)}</div>
        <div className="scenes-bar"><motion.span style={{ scaleX: line }} /></div>
      </div>
    </section>
  </>;
}
