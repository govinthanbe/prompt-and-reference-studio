import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

export const sections = ["home", "about", "skills", "projects", "experience", "contact"];

export function Loader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setP((v) => {
      if (v >= 100) { clearInterval(t); setTimeout(onDone, 300); return 100; }
      return v + 4;
    }), 40);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-background"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
    >
      <motion.p initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1.4 }} className="eyebrow text-lg text-foreground">
        {profile.short}
      </motion.p>
      <div className="mt-8 h-px w-48 bg-border">
        <div className="h-px bg-ember transition-[width] duration-75" style={{ width: `${p}%` }} />
      </div>
      <span className="eyebrow mt-4 text-muted-foreground">{String(p).padStart(3, "0")}</span>
    </motion.div>
  );
}

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => { const el = document.getElementById(s); if (el) obs.observe(el); });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled && "bg-background/70 backdrop-blur-xl")}>
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#home" className="eyebrow text-base font-bold tracking-[0.3em] text-foreground">{profile.short}</a>
        <ul className="hidden gap-8 md:flex">
          {sections.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className={cn("eyebrow link-underline text-[0.7rem] transition-colors", active === s ? "text-ember" : "text-muted-foreground hover:text-foreground")} aria-current={active === s ? "true" : undefined}>
                {s}
              </a>
            </li>
          ))}
        </ul>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-14 w-14 items-center justify-center rounded-full border md:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }} className="fixed inset-0 top-24 bg-background px-6 md:hidden">
            <ul className="flex flex-col gap-2 pt-8">
              {sections.map((s, i) => (
                <motion.li key={s} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <a href={`#${s}`} onClick={() => setOpen(false)} className={cn("display block py-2 text-5xl uppercase", active === s && "text-ember")}>
                    {s}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35 }), sy = useSpring(y, { stiffness: 400, damping: 35 });
  const [mode, setMode] = useState<"" | "hover" | "view">("");
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = (e.target as HTMLElement).closest("[data-cursor], a, button, input, textarea");
      setMode(t ? ((t.getAttribute("data-cursor") as "view") === "view" ? "view" : "hover") : "");
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); document.body.classList.remove("has-cursor"); };
  }, [x, y]);
  if (!enabled) return null;
  const size = mode === "view" ? 88 : mode === "hover" ? 48 : 10;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[80]">
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn("flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full", mode === "view" ? "bg-primary" : mode === "hover" ? "border border-foreground/60" : "bg-foreground")}
      >
        {mode === "view" && <span className="eyebrow text-[0.65rem] tracking-[0.2em] text-primary-foreground">View</span>}
      </motion.div>
    </motion.div>
  );
}
