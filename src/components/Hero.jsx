import { Link } from "react-router-dom";
import { ChevronDown, Heart, ArrowRight } from "lucide-react";
import { content } from "../styles/theme/brand";

export default function Hero() {
  const scrollToSection = (id) => {
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToQuienesSomos = () => {
    const section = document.getElementById("quienes-somos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // "smooth" hace que el deslizamiento sea suave
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ─── FONDO: Imagen Gigante a Pantalla Completa ─── */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}assets/photos/epica.jpeg`}
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
          {content.org.description}
        </p>

        {/* Botones de Acción (CTAs) */}
        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <button
            onClick={scrollToQuienesSomos}
            className="btn-primary px-8 py-4 text-lg w-full sm:w-auto"
          >
            Conócenos <ArrowRight size={20} />
          </button>
          <Link
            to="/apoyanos"
            className="btn-secondary px-8 py-4 text-lg bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white w-full sm:w-auto"
          >
            <Heart size={20} className="text-proyecta-yellow" />
            Apóyanos
          </Link>
        </div>
      </div>

      {/* ─── Indicador de Scroll ─── */}
      {/* Scroll Down Indicator */}
      {/* Cambiamos left-1/2 -translate-x-1/2 por left-0 w-full */}
      <div className="absolute bottom-8 left-0 w-full z-10 flex flex-col items-center animate-bounce">
        {/* Mantenemos el pl-[0.2em] para balancear el tracking visualmente */}
        <span className="text-proyecta-navy dark:text-white/60 text-[10px] uppercase tracking-[0.2em] pl-[0.2em] mb-2 font-bold text-center">
          Explorar
        </span>
        <ChevronDown className="text-proyecta-cyan" size={28} />
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
