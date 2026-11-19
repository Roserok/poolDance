import { useEffect, useRef } from "react";

export default function PoleRail() {
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const page = document.documentElement;
      const distance = page.scrollHeight - page.clientHeight;
      const progress = distance > 0 ? Math.max(0, Math.min(window.scrollY / distance, 1)) : 0;
      element.style.setProperty("--pole-progress", String(progress));
    };

    const scheduleUpdate = () => {
      if (!motion.matches && !frame) frame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    motion.addEventListener("change", scheduleUpdate);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(element);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      motion.removeEventListener("change", scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="site-pole" ref={rail} aria-hidden="true">
      <div className="pole-rider">
        <span className="pole-rider-mark">
          <span className="brand-symbol symbol-fairy" />
        </span>
      </div>
    </div>
  );
}
