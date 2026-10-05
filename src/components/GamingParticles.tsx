import { useEffect, useRef } from "react";

export function GamingParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const count = mobile ? 8 : 24;
    const particles = Array.from({ length: count }, (_, i) => ({ x: (i * 0.61803398875) % 1, y: (i * 0.38196601125) % 1, size: 2 + i % 3, kind: i % 5 }));
    let width = 0, height = 0, frame = 0, last = window.scrollY, velocity = 0, lastTime = 0;
    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    const onScroll = () => { velocity = Math.min(14, Math.abs(window.scrollY - last) * .08); last = window.scrollY; };
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (time - lastTime < (mobile ? 50 : 33) || document.hidden) return;
      lastTime = time;
      context.clearRect(0, 0, width, height);
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--chart-3").trim();
      context.globalAlpha = .24;
      for (const p of particles) {
        p.y += (.00024 + velocity * .00012) * (mobile ? .5 : 1);
        if (p.y > 1) p.y = 0;
        const x = p.x * width, y = p.y * height, s = p.size;
        if (p.kind === 0) { context.fillRect(x-s, y, s*3, s); context.fillRect(x, y-s, s, s*3); }
        else if (p.kind === 1) { context.strokeRect(x, y, s*4, s*2); context.fillRect(x+s, y+s, s, s); context.fillRect(x+s*3, y+s, s, s); }
        else context.fillRect(x, y, s, s);
      }
      velocity *= .88;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <canvas ref={ref} className="arena-bg__particles" aria-hidden="true" />;
}