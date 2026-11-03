import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Loader, Navbar, Cursor } from "@/components/chrome";
import { Hero, About, Skills, Projects, Experience, Contact, Footer } from "@/components/sections";

const title = "E.Govinthan | Developer & Computer Science Engineer";
const description = "Portfolio of E.Govinthan — Computer Science Engineer, developer and group member of BugZen.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://example.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          { "@context": "https://schema.org", "@type": "Person", name: "E Govinthan", jobTitle: "Computer Science Engineer", email: "mailto:egovinthan3@gmail.com", alumniOf: "VRS College of Engineering and Technology", sameAs: ["https://github.com/AjithKumar2809", "https://www.linkedin.com/in/ajith-kumar-1a3343376"] },
          { "@context": "https://schema.org", "@type": "WebSite", name: "E Govinthan Portfolio" },
        ]),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!sessionStorage.getItem("loaded")) setLoading(true);
  }, []);
  const done = useCallback(() => { sessionStorage.setItem("loaded", "1"); setLoading(false); }, []);
  return (
    <div className="grain relative">
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
