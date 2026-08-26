import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import QuienesSomosHome from "../components/QuienesSomosHome";
import Impacto from "../components/Impacto";
import MetaFinan from "../components/MetaFinan";
import { usePageMeta } from "../hooks/usePageMeta";

export default function HomePage() {
  usePageMeta();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <QuienesSomosHome />
      <Impacto/>
      <MetaFinan />
    </>
  );
}
