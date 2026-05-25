import { ChevronDown, Heart, Users, ArrowRight } from 'lucide-react'
import { assets, content } from '../styles/theme/brand'

export default function Hero() {
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1B3A4B 0%, #1B5E7A 55%, #1B9AB5 100%)' }}
    >
      {/* ─── Background decorative elements ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blurred circle top-right */}
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #40D0F0 0%, transparent 70%)' }}
        />
        {/* Small circle bottom-left */}
        <div
          className="absolute bottom-20 -left-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FFBB00 0%, transparent 70%)' }}
        />
        {/* Diagonal grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating shapes */}
        <div
          className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-proyecta-yellow animate-float opacity-60"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-proyecta-cyan animate-float opacity-40"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-5 h-5 rounded-full bg-proyecta-orange animate-float opacity-50"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* ─── Main content ─── */}
      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                            bg-proyecta-cyan/20 border border-proyecta-cyan/30 text-proyecta-cyan
                            text-xs font-bold uppercase tracking-widest mb-8
                            animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-proyecta-cyan animate-pulse" />
              Voluntariado activo en Chile
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl text-white leading-tight mb-6
                         animate-fade-up"
              style={{ fontFamily: 'var(--font-display)', animationDelay: '100ms' }}
            >
              Construyendo
              <br />
              <span className="gradient-text">comunidad</span>
              <br />
              desde la acción
            </h1>

            {/* Subheading */}
            <p
              className="text-lg sm:text-xl text-white/75 max-w-lg leading-relaxed mb-10
                         animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              {content.org.description}
              {' '}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <button
                onClick={() => scrollToSection('#quienes-somos')}
                className="btn-primary text-base px-7 py-3.5"
              >
                Conócenos
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('#apoyanos')}
                className="btn-secondary text-base px-7 py-3.5"
              >
                <Heart size={18} />
                Apóyanos
              </button>
            </div>

            {/* Social proof mini stats */}
            <div
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 animate-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              {[
                { value: '1.200+', label: 'Personas ayudadas' },
                { value: '320+',   label: 'Voluntarios activos' },
                { value: '48',     label: 'Operativos' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-2xl font-black text-proyecta-cyan"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Logo / Illustration */}
          <div
            className="flex justify-center lg:justify-end animate-scale-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="relative">
              {/* Glow behind logo */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, #40D0F0 0%, transparent 70%)', transform: 'scale(1.5)' }}
              />
              {/* ================================================
                  🖼 LOGO HERO: Reemplaza con ilustración de Figma
                  ================================================ */}
              <img
                src={assets.logo}
                alt="Proyecta - Voluntariado"
                className="relative w-64 sm:w-80 lg:w-96 xl:w-[440px] h-auto object-contain
                           animate-float drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 40px rgba(64, 208, 240, 0.4))' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                      text-white/40 animate-bounce cursor-pointer"
           onClick={() => scrollToSection('#quienes-somos')}>
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <ChevronDown size={20} />
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 69.3C120 58.7 240 37.3 360 37.3C480 37.3 600 58.7 720 64C840 69.3 960 58.7 1080 48C1200 37.3 1320 26.7 1380 21.3L1440 16V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="white"
            className="dark:fill-[#0D1F2A]"
          />
        </svg>
      </div>
    </section>
  )
}
