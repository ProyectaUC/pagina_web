import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { assets, content } from "../styles/theme/brand";
import { useDarkMode } from "../hooks/useAnimations";
import Button from "./ui/Button";

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Quiénes Somos", to: "/quienes-somos" },
  { label: "Trabajos", to: "/trabajos" },
  { label: "Equipo", to: "/equipo" },
  { label: "Apóyanos", to: "/apoyanos" },
];

const PRIMARY_CTA = { label: "Únete", to: "/unete" };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useDarkMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled
            ? "bg-white/90 dark:bg-proyecta-navy/95 shadow-lg py-3"
            : "bg-white/75 dark:bg-proyecta-navy/80 py-5"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group"
          >
            {/* ================================================
                🖼 LOGO: Reemplaza assets.logo con SVG de Figma
                ================================================ */}
            <img
              src={assets.logo}
              alt={content.org.name}
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback text logo */}
            <span
              className="hidden items-center gap-2 text-proyecta-teal dark:text-proyecta-cyan font-display text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content.org.name}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg hover:bg-proyecta-navy/5 dark:hover:bg-white/5 ${
                      isActive
                        ? "text-proyecta-teal dark:text-proyecta-cyan"
                        : "text-proyecta-navy/80 dark:text-white/90 hover:text-proyecta-teal dark:hover:text-proyecta-cyan"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-proyecta-navy/70 dark:text-white/70 hover:text-proyecta-teal dark:hover:text-proyecta-cyan hover:bg-proyecta-navy/5 dark:hover:bg-white/10
                         transition-all duration-200"
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA button */}
            <Button to={PRIMARY_CTA.to} size="sm">
              {PRIMARY_CTA.label}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-proyecta-navy/70 dark:text-white/70 hover:text-proyecta-teal dark:hover:text-proyecta-cyan"
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-proyecta-navy dark:text-white hover:bg-proyecta-navy/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Menú"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-proyecta-navy/95 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
        {/* Menu content */}
        <div
          className={`relative flex flex-col justify-center items-center h-full gap-2
                      transition-transform duration-300 ${isOpen ? "translate-y-0" : "-translate-y-8"}`}
        >
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-bold py-3 px-8 transition-colors duration-200 font-sans ${
                  isActive
                    ? "text-proyecta-cyan"
                    : "text-white/90 hover:text-proyecta-cyan"
                }`
              }
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
          <Button
            to={PRIMARY_CTA.to}
            onClick={() => setIsOpen(false)}
            className="mt-4"
          >
            {PRIMARY_CTA.label}
          </Button>
        </div>
      </div>
    </>
  );
}
