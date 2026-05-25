import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { assets, content } from '../styles/theme/brand'
import { useDarkMode } from '../hooks/useAnimations'

const navLinks = [
  { label: 'Quiénes Somos', href: '#quienes-somos' },
  { label: 'Impacto',       href: '#impacto' },
  { label: 'Programas',     href: '#programas' },
  { label: 'Apóyanos',      href: '#apoyanos' },
  { label: 'Contacto',      href: '#contacto' },
]

export default function Navbar() {
  const [isOpen, setIsOpen]         = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [isDark, setIsDark]         = useDarkMode()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-proyecta-navy/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNavClick('#inicio') }}
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
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            {/* Fallback text logo */}
            <span
              className="hidden items-center gap-2 text-proyecta-cyan font-display text-2xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {content.org.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-white/90 hover:text-proyecta-cyan text-sm font-semibold
                             transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-white/70 hover:text-proyecta-cyan hover:bg-white/10
                         transition-all duration-200"
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA button */}
            <button
              onClick={() => handleNavClick('#apoyanos')}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Apóyanos
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-white/70 hover:text-proyecta-cyan"
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
                      transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-8'}`}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-white/90 hover:text-proyecta-cyan text-2xl font-bold py-3 px-8
                         transition-colors duration-200 font-sans"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#apoyanos')}
            className="btn-primary mt-4 text-base px-8 py-3"
          >
            Apóyanos
          </button>
        </div>
      </div>
    </>
  )
}
