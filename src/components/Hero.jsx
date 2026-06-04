import { Link } from "react-router-dom";
import { ChevronDown, Heart, ArrowRight } from "lucide-react";
import { content } from "../styles/theme/brand";

export default function Hero() {
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ─── FONDO: Imagen Gigante a Pantalla Completa ─── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/photos/epica.jpeg"
          alt="Voluntarios de Proyecta trabajando en equipo"
          className="w-full h-full object-cover object-center transform scale-105 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-[#0D1F2A]/30 mix-blend-multiply"></div>
        {/* Degradado para transición suave hacia la ola */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D1F2A]/30 to-[#0D1F2A]/90"></div>
      </div>

      {/* ─── CONTENIDO PRINCIPAL (Centrado) ─── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
        {/* Insignia / Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-proyecta-cyan animate-pulse" />
          Voluntariado activo en Chile
        </div> */}

        {/* Título Principal */}
        <h1
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 drop-shadow-2xl animate-fade-up"
          style={{ fontFamily: "var(--font-display)", animationDelay: "100ms" }}
        >
          Construyendo <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-proyecta-cyan to-proyecta-yellow drop-shadow-none">
            comunidad
          </span>{" "}
          <br className="hidden sm:block" />
          desde la acción
        </h1>

        {/* Subtítulo */}
        <p
          className="text-lg sm:text-2xl text-white/90 max-w-2xl leading-relaxed mb-12 drop-shadow-md animate-fade-up font-light"
          style={{ animationDelay: "200ms" }}
        >
          {content.org.description} Sumamos manos y voluntades para disminuir la
          pobreza multidimensional en sectores rurales de nuestro país.
        </p>

        {/* Botones de Acción (CTAs) */}
        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <button
            onClick={() => scrollToSection("#quienes-somos")}
            className="px-8 py-4 bg-proyecta-cyan text-proyecta-navy text-lg font-bold rounded-full hover:bg-white hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(64,208,240,0.4)] w-full sm:w-auto"
          >
            Conócenos
            <ArrowRight size={20} />
          </button>
          <Link
            to="/apoyanos"
            className="px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-full border border-white/30 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm w-full sm:w-auto"
          >
            <Heart size={20} className="text-proyecta-yellow" />
            Apóyanos
          </Link>
        </div>

        {/* Estadísticas en contenedor Glassmorphism */}
        <div
          className="mt-16 pt-8 px-8 pb-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 shadow-2xl animate-fade-up w-full max-w-3xl mx-auto"
          style={{ animationDelay: "400ms" }}
        >
          {[
            { value: "1.200+", label: "Personas ayudadas" },
            { value: "320+", label: "Voluntarios activos" },
            { value: "48", label: "Operativos" },
          ].map((s, index) => (
            <div
              key={s.label}
              className={`relative flex flex-col items-center ${index !== 2 ? 'sm:after:content-[""] sm:after:absolute sm:after:-right-8 sm:after:top-1/4 sm:after:h-1/2 sm:after:w-px sm:after:bg-white/20' : ""}`}
            >
              <div
                className="text-3xl lg:text-4xl font-black text-white drop-shadow-md"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-proyecta-cyan uppercase tracking-widest mt-2 font-bold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Indicador de Scroll ─── */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors animate-bounce cursor-pointer z-20"
        onClick={() => scrollToSection("#quienes-somos")}
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
          Explorar
        </span>
        <ChevronDown size={28} />
      </div>

      {/* ─── Ola de transición inferior ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto translate-y-1"
        >
          <path
            d="M0 80L60 69.3C120 58.7 240 37.3 360 37.3C480 37.3 600 58.7 720 64C840 69.3 960 58.7 1080 48C1200 37.3 1320 26.7 1380 21.3L1440 16V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="white"
            className="dark:fill-[#0D1F2A]"
          />
        </svg>
      </div>
    </section>
  );
}
