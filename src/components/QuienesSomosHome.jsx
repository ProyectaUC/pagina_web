import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye } from "lucide-react";
import { useInView } from "../hooks/useAnimations";

export default function QuienesSomosHome() {
  const [ref, isVisible] = useInView();

  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden bg-white dark:bg-[#0D1F2A] transition-colors duration-300"
      ref={ref}
    >
      {/* Elementos decorativos de fondo para mantener la estética del Hero */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-proyecta-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-proyecta-yellow/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="section-container relative z-10">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* COLUMNA IZQUIERDA: Imagen y Badge */}
          <div className="relative order-2 lg:order-1">
            {/* Resplandor trasero de la imagen */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-proyecta-cyan/20 to-proyecta-teal/10 blur-2xl rounded-[3rem] opacity-60 z-0 hidden sm:block"></div>

            <div className="relative z-10 w-full h-[400px] sm:h-[550px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 group">
              <img
                src="/assets/photos/yoshi.jpeg"
                alt="Voluntarios de Proyecta trabajando en equipo"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 bg-proyecta-navy/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700"></div>
            </div>

            {/* Tarjeta Flotante (Año de Fundación) */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 z-20 bg-white/90 dark:bg-[#122530]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-proyecta-cyan/20 animate-float">
              <p className="text-proyecta-teal dark:text-proyecta-cyan font-bold text-xs sm:text-sm uppercase tracking-widest mb-1">
                Fundación
              </p>
              <p
                className="text-4xl sm:text-5xl font-black text-proyecta-navy dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                2005
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: Textos y CTA */}
          <div className="flex flex-col items-start text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-proyecta-cyan/10 border border-proyecta-cyan/20 text-proyecta-cyan text-xs font-bold uppercase tracking-widest mb-6">
              Nuestra Esencia
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-proyecta-navy dark:text-white leading-[1.1] mb-6">
              Construyendo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-proyecta-cyan to-proyecta-teal">
                comunidad
              </span>
            </h2>

            <div className="space-y-4 text-proyecta-navy/70 dark:text-white/70 text-lg leading-relaxed mb-8 font-light">
              <p>
                Nacimos en la Pontificia Universidad Católica de Chile con el
                sueño de{" "}
                <strong className="text-proyecta-navy dark:text-white font-bold">
                  disminuir la pobreza multidimensional
                </strong>{" "}
                fortaleciendo el tejido social en sectores rurales de nuestro
                país.
              </p>
              <p>
                No solo construimos infraestructura; trabajamos <em>junto</em> a
                las comunidades para generar puntos de encuentro que fortalezcan
                el liderazgo y la organización local.
              </p>
            </div>

            {/* Mini-Grid de Misión y Visión resumidas */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10 w-full">
              <div className="glass p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-proyecta-cyan/5 dark:bg-proyecta-cyan/5">
                <Target size={24} className="text-proyecta-cyan mb-3" />
                <h4 className="text-proyecta-navy dark:text-white font-bold mb-1">
                  Misión
                </h4>
                <p className="text-sm text-proyecta-navy/70 dark:text-white/60 leading-relaxed">
                  Fortalecer la cohesión comunitaria y potenciar la
                  asociatividad en sectores rurales.
                </p>
              </div>
              <div className="glass p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-proyecta-yellow/5 dark:bg-proyecta-yellow/5">
                <Eye size={24} className="text-proyecta-yellow mb-3" />
                <h4 className="text-proyecta-navy dark:text-white font-bold mb-1">
                  Visión
                </h4>
                <p className="text-sm text-proyecta-navy/70 dark:text-white/60 leading-relaxed">
                  Comunidades autónomas, protagonistas de su propio desarrollo y
                  bienestar.
                </p>
              </div>
            </div>

            {/* Botón CTA (Call to Action) */}
            <Link
              to="/quienes-somos"
              className="px-8 py-4 bg-proyecta-cyan text-proyecta-navy text-base sm:text-lg font-bold rounded-full hover:bg-proyecta-teal hover:text-white hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(64,208,240,0.3)] hover:shadow-[0_0_25px_rgba(32,185,214,0.4)] w-full sm:w-auto"
            >
              Conoce más sobre nosotros
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
