import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

function Letter({ character, index, count, progress, highlighted }: { character: string; index: number; count: number; progress: MotionValue<number>; highlighted: boolean }) {
  const start = index / count * 0.75;
  const clipPath = useTransform(progress, [start, Math.min(start + 0.2, 1)], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return <motion.span aria-hidden="true" className={`scroll-title__letter${highlighted ? " scroll-title__letter--accent" : ""}`} style={{ clipPath }}>{character === " " ? "\u00a0" : character}</motion.span>;
}

export function ScrollTitle({ text, highlightFrom }: { text: string; highlightFrom?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 35%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <h2 ref={ref} className="scroll-title" aria-label={text}>
    {reduced ? text : [...text].map((character, index) => <Letter key={index} character={character} index={index} count={text.length} progress={scrollYProgress} highlighted={highlightFrom !== undefined && index >= highlightFrom} />)}
    <motion.span aria-hidden="true" className="scroll-title__line" style={reduced ? undefined : { scaleX: lineScale }} />
  </h2>;
}