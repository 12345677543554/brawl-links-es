import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Gamepad2, Play, Sparkles } from "lucide-react";
import { ScrollTitle } from "./ScrollTitle";

const CHAPTERS = [
  { label: "01 / El juego", title: "Brawl Stars", copy: "Partidas, retos y jugadas con mis brawlers favoritos: Nori, León y Cordelius.", Icon: Gamepad2 },
  { label: "02 / El contenido", title: "Vídeos y directos", copy: "Comparto mis vídeos en YouTube y los clips y directos en TikTok.", Icon: Play },
  { label: "03 / Mi zona", title: "GAMETUIN", copy: "Un lugar para encontrar mis redes y seguir todo lo que voy compartiendo.", Icon: Sparkles },
];

const block = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const, staggerChildren: 0.15 } } };
const child = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

export function StreamerStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const controllerX = useTransform(scrollYProgress, [0, 1], ["-15%", "75%"]);
  const controllerY = useTransform(scrollYProgress, [0, 1], ["-10%", "90%"]);
  return <section ref={ref} className="streamer-story" aria-label="Mi historia como streamer">
    <motion.div className="streamer-story__background" style={reduced ? {} : { y: backgroundY }} aria-hidden="true" />
    <motion.div className="streamer-story__controller" style={reduced ? {} : { x: controllerX, y: controllerY }} aria-hidden="true"><Gamepad2 strokeWidth={1.5} /></motion.div>
    <div className="streamer-story__rail" aria-hidden="true"><motion.span style={reduced ? {} : { scaleY: scrollYProgress }} /></div>
    <div className="section-inner streamer-story__inner">
      <p className="section-kicker">GAMETUIN / Mi recorrido</p>
      <ScrollTitle text="Mi historia como streamer" />
      <div className="streamer-story__chapters">
        {CHAPTERS.map(({ label, title, copy, Icon }) => <motion.article key={label} className="streamer-story__chapter" variants={block} initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.span variants={child} className="streamer-story__symbol"><Icon aria-hidden="true" /></motion.span>
          <motion.p variants={child} className="streamer-story__label">{label}</motion.p>
          <motion.h3 variants={child}>{title}</motion.h3>
          <motion.p variants={child} className="streamer-story__copy">{copy}</motion.p>
        </motion.article>)}
      </div>
    </div>
  </section>;
}