import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import heroSmoke from "@/assets/hero-smoke.jpg";
import bugzenImg from "@/assets/bugzen.jpg";
import portraitImg from "@/assets/portrait.jpg.asset.json";
import { profile, stats, skills, projects } from "@/lib/profile";
import { Reveal, SplitText, SectionHeading, PillButton, Magnetic } from "./motion-kit";
import { ContactForm } from "./contact-form";

const wrap = "mx-auto max-w-7xl px-6 md:px-10";

export function Hero() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const px = useSpring(useTransform(mx, (v) => v * -30), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, (v) => v * -20), { stiffness: 60, damping: 20 });
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 600], [1, 0]);
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
      onMouseMove={(e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); }}
    >
      <motion.img src={heroSmoke} alt="" aria-hidden width={1600} height={1008} style={{ x: px, y: py }} className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover object-[75%_center] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      <motion.div style={{ opacity: fade }} className={`${wrap} relative w-full`}>
        <Reveal><p className="eyebrow max-w-xs leading-loose text-muted-foreground md:max-w-none">{profile.role}</p></Reveal>
        <h1 className="display mt-8 text-[18vw] uppercase md:text-[11rem]">
          <SplitText text="E Govinthan" delay={0.2} />
        </h1>
        <Reveal delay={0.6}>
          <p className="mt-10 max-w-xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Building intelligent products, modern web experiences and solutions that solve real problems.
          </p>
        </Reveal>
        <Reveal delay={0.8} className="mt-12 flex flex-col gap-4 sm:flex-row">
          <PillButton href="#projects">Explore My Work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></PillButton>
          <PillButton href={profile.resume} variant="ghost" download>Download Resume <Download className="h-4 w-4" /></PillButton>
        </Reveal>
      </motion.div>
      <a href="#about" aria-label="Scroll to about" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow text-[0.6rem] text-muted-foreground">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ArrowDown className="h-4 w-4 text-ember" /></motion.span>
      </a>
    </section>
  );
}

function Marquee() {
  const words = ["Developer", "Problem Solver", "AI Enthusiast", "Full-Stack", "Product Builder", "Creative Technologist"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y py-6" aria-hidden>
      <div className="flex w-max animate-marquee gap-12">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="display flex items-center gap-12 text-4xl uppercase md:text-6xl">
            {w}<span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <>
      <Marquee />
      <section id="about" className={`${wrap} py-28 md:py-40`}>
        <SectionHeading index="01" label="About" title="ABOUT ME" />
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal><p className="text-3xl leading-snug text-foreground md:text-5xl md:leading-tight">I'm E Govinthan, a Computer Science Engineering student and developer passionate about building practical technology products.</p></Reveal>
            <Reveal delay={0.1}><p className="mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground">I enjoy transforming ideas into interactive digital experiences and exploring AI, software development, cybersecurity and modern web technologies.</p></Reveal>
          </div>
          <Reveal delay={0.2} className="md:col-span-4">
            <h3 className="display text-4xl uppercase text-foreground md:text-5xl">E Govinthan</h3>
            <div className="relative mt-6 overflow-hidden rounded-sm border shadow-[var(--glow-ember)]">
              <img src={portraitImg.url} alt="Portrait of E Govinthan" loading="lazy" width={944} height={944} className="aspect-square w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
            <p className="eyebrow mt-10 text-ember">Currently pursuing</p>
            <p className="mt-4 text-xl text-foreground">B.E. Computer Science and Engineering</p>
            <p className="mt-1 text-muted-foreground">VRS College of Engineering and Technology</p>
            <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {["Software development", "AI", "Web development", "Problem solving", "Product building", "Cybersecurity"].map((t) => <li key={t}>/ {t}</li>)}
            </ul>
          </Reveal>
        </div>
        <div className="mt-24 grid grid-cols-2 border-t md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="border-b border-r p-6 md:p-8 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(4n)]:border-r-0">
              <p className="display text-5xl text-foreground md:text-7xl">{s.value}</p>
              <p className="eyebrow mt-4 text-[0.65rem] leading-relaxed text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function Skills() {
  return (
    <section id="skills" className={`${wrap} py-28 md:py-40`}>
      <SectionHeading index="02" label="Stack" title="TOOLS I BUILD WITH" />
      <div className="mt-16">
        {skills.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.05} className="group grid gap-4 border-b py-8 md:grid-cols-12 md:py-10">
            <p className="eyebrow text-muted-foreground transition-colors group-hover:text-ember md:col-span-3 md:pt-2">0{gi + 1} — {g.group}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-9">
              {g.items.map((s) => (
                <li key={s} className="display cursor-default text-3xl text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-foreground md:text-5xl">{s}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], reduce ? ["inset(0%)", "inset(0%)"] : ["inset(18% 10% 18% 10%)", "inset(0% 0% 0% 0%)"]);
  const features = ["AI Code Analysis", "AI Programming Tutor", "Coding Practice", "Daily Challenges", "Interactive Quizzes", "Gamification", "Achievements", "Leaderboards", "Battle Arena", "Project Learning", "Code Scanner", "AI-powered explanations"];
  return (
    <section id="projects" className="py-28 md:py-40">
      <div className={wrap}><SectionHeading index="03" label="Featured" title="SELECTED WORK" /></div>
      <div ref={ref} className={`${wrap} mt-16`}>
        <motion.a href={profile.bugzenDemo} data-cursor="view" style={{ clipPath: clip }} className="relative block aspect-[16/10] overflow-hidden rounded-sm md:aspect-[16/8]">
          <motion.img src={bugzenImg} alt="BugZen platform interface showing code editor, AI explanation and leaderboard" loading="lazy" width={1600} height={1008} style={{ y: imgY }} className="absolute inset-0 h-[116%] w-full -translate-y-[8%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <h3 className="display absolute bottom-4 left-4 text-[17vw] text-foreground md:bottom-8 md:left-8 md:text-[10rem]">BUGZEN</h3>
        </motion.a>
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow text-ember">AI-Powered Programming Learning Platform</p>
            <p className="mt-6 text-xl leading-relaxed text-foreground md:text-2xl">BugZen is an AI-powered programming learning platform designed to help students understand programming, debug code, practice concepts and improve their problem-solving skills through an interactive learning experience.</p>
            <p className="eyebrow mt-8 text-[0.7rem] text-muted-foreground">React • TypeScript • Tailwind CSS • Vite • Supabase • AI</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PillButton href={profile.bugzenDemo}>Live Demo <ArrowUpRight className="h-4 w-4" /></PillButton>
              <PillButton href={profile.bugzenRepo} variant="ghost">View GitHub <Github className="h-4 w-4" /></PillButton>
            </div>
          </Reveal>
          <ul className="grid grid-cols-2 gap-x-6 md:col-span-5">
            {features.map((f, i) => (
              <Reveal key={f} delay={i * 0.03} className="border-b py-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                <span className="mr-2 font-mono text-ember">{String(i + 1).padStart(2, "0")}</span>{f}
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="mt-32">
          <p className="eyebrow text-muted-foreground">More projects</p>
          <div className="mt-6 border-t">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <a href={p.demo} data-cursor="view" className="group grid items-center gap-4 border-b py-10 transition-colors hover:border-ember md:grid-cols-12">
                  <span className="font-mono text-sm text-ember md:col-span-1">0{i + 2}</span>
                  <h4 className="display text-4xl transition-transform duration-500 group-hover:translate-x-4 group-hover:text-foreground md:col-span-5 md:text-6xl">{p.name}</h4>
                  <div className="md:col-span-5">
                    <p className="text-muted-foreground">{p.desc}</p>
                    <p className="eyebrow mt-2 text-[0.65rem] text-muted-foreground">{p.tech} · GitHub · Live Demo</p>
                  </div>
                  <ArrowUpRight className="h-8 w-8 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-ember md:col-span-1 md:justify-self-end" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  const items = [
    { kind: "Experience", title: "Cyber Security Intern", org: "Redynox", time: "1 Month Internship", text: "A hands-on internship providing exposure to cybersecurity, core security concepts and practical learning in a professional environment — strengthening both technical understanding and professional development." },
    { kind: "Education", title: "Bachelor of Engineering — Computer Science and Engineering", org: "VRS College of Engineering and Technology", time: "Currently pursuing", text: "" },
  ];
  return (
    <section id="experience" className={`${wrap} py-28 md:py-40`}>
      <SectionHeading index="04" label="Journey" title="EXPERIENCE" />
      <ol className="relative mt-16 border-l md:ml-[25%]">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.1} className="relative pb-16 pl-8 md:pl-14">
            <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-ember shadow-[var(--glow-ember)]" />
            <li>
              <p className="eyebrow text-[0.65rem] text-ember">{it.kind} · {it.time}</p>
              <h3 className="display mt-4 text-3xl text-foreground md:text-5xl">{it.title}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{it.org}</p>
              {it.text && <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{it.text}</p>}
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-20 flex flex-col items-start justify-between gap-10 border-y py-16 md:flex-row md:items-end">
        <div>
          <h3 className="display text-5xl md:text-7xl">WANT TO KNOW MORE?</h3>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">Explore my complete professional journey, technical skills, projects and experience.</p>
        </div>
        <PillButton href={profile.resume} download>Download Resume <Download className="h-4 w-4" /></PillButton>
      </Reveal>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className={`${wrap} relative py-28 md:py-40`}>
      <div className="pointer-events-none absolute left-1/2 top-40 h-96 w-96 -translate-x-1/2 rounded-full bg-ember/10 blur-[120px]" />
      <p className="eyebrow text-ember">05 / Contact</p>
      <h2 className="display relative mt-8 text-[13vw] md:text-[9rem]"><SplitText text="LET'S BUILD SOMETHING GREAT." /></h2>
      <div className="relative mt-16 grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="text-xl text-muted-foreground">Have an idea, project or opportunity? Let's connect.</p>
          <a href={`mailto:${profile.email}`} className="link-underline mt-10 inline-block break-all text-2xl text-foreground md:text-3xl">{profile.email}</a>
          <div className="mt-10"><Socials /></div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7"><ContactForm /></Reveal>
      </div>
    </section>
  );
}

function Socials() {
  const links = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];
  return (
    <ul className="flex gap-3">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <Magnetic>
            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label} className="flex h-14 w-14 items-center justify-center rounded-full border transition-colors hover:border-ember hover:text-ember">
              <Icon className="h-5 w-5" />
            </a>
          </Magnetic>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className={`${wrap} flex flex-col gap-10 border-t py-14 md:flex-row md:items-center md:justify-between`}>
      <div>
        <p className="eyebrow font-bold text-foreground">{profile.name}</p>
        <p className="mt-2 text-sm text-muted-foreground">{profile.role}</p>
        <p className="mt-6 text-xs text-muted-foreground">© 2026 GOVINTHAN. All rights reserved.</p>
      </div>
      <div className="flex items-center gap-6">
        <Socials />
        <Magnetic>
          <a href="#home" aria-label="Back to top" className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
