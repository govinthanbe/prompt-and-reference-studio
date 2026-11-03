import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.7, 0, 0.2, 1] as const;

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + i * 0.08, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="flex flex-col gap-4 border-t pt-10 md:flex-row md:items-end md:gap-12">
      <span className="eyebrow text-ember md:pb-4">{index} / {label}</span>
      <h2 className="display text-5xl sm:text-6xl md:text-8xl">
        <SplitText text={title} />
      </h2>
    </div>
  );
}

export function PillButton({ href, children, variant = "solid", download, onClick }: { href: string; children: ReactNode; variant?: "solid" | "ghost"; download?: boolean; onClick?: () => void }) {
  return (
    <Magnetic className="w-full sm:w-auto">
      <a
        href={href}
        download={download}
        onClick={onClick}
        data-cursor="hover"
        className={cn(
          "group flex w-full items-center justify-center gap-3 rounded-full px-9 py-5 eyebrow transition-all duration-500 sm:w-auto",
          variant === "solid"
            ? "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--glow-ember)]"
            : "border text-foreground hover:border-ember hover:text-ember",
        )}
      >
        {children}
      </a>
    </Magnetic>
  );
}
