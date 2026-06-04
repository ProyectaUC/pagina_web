import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import QuienesSomosHome from "../components/QuienesSomosHome";
import Impacto from "../components/Impacto";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <QuienesSomosHome variant="full" />
      <Impacto variant="full" />
    </>
  );
}
