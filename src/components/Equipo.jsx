import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { equiposData } from "../data/equipos";

export default function Equipo() {
  // Estado para controlar qué acordeón está abierto
  const [openSection, setOpenSection] = useState("jefes"); // Por defecto, el de Recursos está abierto

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-proyecta-surface min-h-screen transition-colors duration-300">
      {/* HERO SECTION: Huge 2026 Team Image */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="assets/equipos/completo.jpeg"
            alt="Equipo Proyecta 2026 en terreno"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-proyecta-navy/60 dark:bg-proyecta-surface/50 mix-blend-multiply"></div>

          {/* Bottom Gradient for Smooth Fading into the Page */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-proyecta-surface to-transparent"></div>
        </div>

        {/* Hero Content (Floating Title) */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 animate-on-scroll is-visible">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
            Nuestro Motor
          </span>
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Equipo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-proyecta-cyan to-proyecta-yellow drop-shadow-none">
              2026
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-sans max-w-2xl mx-auto drop-shadow-md">
            Conoce a los rostros detrás de Proyecta. Estudiantes apasionados de
            diversas carreras que dedican su tiempo y energía para transformar
            la realidad territorial de Chile.
          </p>
        </div>

        {/* Scroll Down Indicator */}
        {/* Cambiamos left-1/2 -translate-x-1/2 por left-0 w-full */}
        <div className="absolute bottom-8 left-0 w-full z-10 flex flex-col items-center animate-bounce">
          {/* Mantenemos el pl-[0.2em] para balancear el tracking visualmente */}
          <span className="text-proyecta-navy dark:text-white/60 text-[10px] uppercase tracking-[0.2em] pl-[0.2em] mb-2 font-bold text-center">
            Conócenos
          </span>
          <ChevronDown className="text-proyecta-cyan" size={28} />
        </div>
      </section>

      {/* 📋 ACCORDION SECTION */}
      <section className="py-16 sm:py-24 relative z-10">
        <div className="section-container">
          <div className="max-w-5xl mx-auto space-y-6">
            {equiposData.map((equipo) => {
              const isOpen = openSection === equipo.id;
              const Icon = equipo.icon;

              return (
                <div
                  key={equipo.id}
                  className={`card overflow-hidden transition-all duration-500 border ${isOpen ? "border-proyecta-cyan shadow-proyecta-lg dark:border-proyecta-cyan/50" : "border-transparent"}`}
                >
                  {/* Accordion Toggle Button */}
                  <button
                    onClick={() => toggleSection(equipo.id)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 transition-colors"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`p-4 rounded-2xl ${equipo.bgIcon} ${equipo.color}`}
                      >
                        <Icon size={28} strokeWidth={2} />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-proyecta-navy dark:text-white font-sans text-left">
                        {equipo.title}
                      </h2>
                    </div>
                    <ChevronDown
                      size={32}
                      className={`text-proyecta-navy/40 dark:text-white/40 transition-transform duration-500 ${isOpen ? "rotate-180 text-proyecta-teal dark:text-proyecta-cyan" : ""}`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 sm:p-8 pt-0 border-t border-gray-100 dark:border-white/10 mt-2">
                        {/* Adaptable Group Image Container */}
                        <div
                          className={`relative w-full rounded-[2rem] overflow-hidden shadow-lg mb-12 border border-black/5 dark:border-white/10 ${equipo.isVerticalGroupImage
                              ? "aspect-[2/3] sm:aspect-[2/3] max-h-[75vh]"
                              : "aspect-[3/2] sm:aspect-[3/2]"
                            }`}
                        >
                          <img
                            src={equipo.groupImage}
                            alt={`Equipo de ${equipo.title}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-proyecta-surface/90 via-proyecta-surface/40 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 w-full p-8 sm:p-10">
                            <h3 className="text-3xl font-bold text-white mb-3">
                              El Equipo de {equipo.title}
                            </h3>
                            <p className="text-white/80 max-w-2xl text-lg leading-relaxed shadow-sm">
                              {equipo.groupDescription}
                            </p>
                          </div>
                        </div>

                        {/* Individual Members Grid */}
                        {equipo.members.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {equipo.members.map((member, idx) => (
                              <div
                                key={idx}
                                className={`glass rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 border relative ${member.isMentor
                                    ? "border-proyecta-yellow/80 shadow-[0_0_20px_rgba(255,183,3,0.2)] dark:shadow-[0_0_20px_rgba(255,183,3,0.15)]"
                                    : "border-black/5 dark:border-white/10"
                                  }`}
                              >
                                {/* MENTOR TAG */}
                                {member.isMentor && (
                                  <div className="absolute top-0 left-0 bg-proyecta-yellow text-proyecta-navy font-black px-6 py-2 rounded-br-[2rem] z-20 text-xs uppercase tracking-widest shadow-lg">
                                    Mentor
                                  </div>
                                )}

                                {/* Huge Individual Image */}
                                {/* Cambiamos h-80 sm:h-96 por aspect-[3/4] para que sea proporcional */}
                                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800">
                                  <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  {/* Floating Year/Field Badge */}
                                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-proyecta-surface/90 backdrop-blur-sm text-proyecta-navy dark:text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                                      {member.year}
                                    </span>
                                    <span className="px-3 py-1 bg-proyecta-cyan text-proyecta-navy text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                                      {member.carrera}
                                    </span>
                                  </div>
                                </div>

                                {/* Member Information */}
                                <div className="p-6 flex flex-col flex-grow bg-white/50 dark:bg-transparent">
                                  <h4 className="text-2xl font-bold text-proyecta-navy dark:text-white mb-4 font-sans">
                                    {member.name}
                                  </h4>

                                  {member.funFact && (
                                    <div
                                      className={`mt-auto p-4 rounded-r-xl border-l-4 ${member.isMentor
                                          ? "bg-proyecta-yellow/20 dark:bg-proyecta-yellow/10 border-proyecta-yellow"
                                          : "bg-proyecta-cyan/10 dark:bg-proyecta-cyan/5 border-proyecta-cyan"
                                        }`}
                                    >
                                      <p
                                        className={`text-xs font-bold uppercase tracking-widest mb-1 ${member.isMentor
                                            ? "text-proyecta-orange dark:text-proyecta-yellow"
                                            : "text-proyecta-teal dark:text-proyecta-cyan"
                                          }`}
                                      >
                                        Dato Curioso
                                      </p>
                                      <p className="text-proyecta-navy/80 dark:text-white/70 text-sm italic">
                                        &ldquo;{member.funFact}&rdquo;
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Placeholder if no members have been loaded yet
                          <div className="text-center py-12 glass rounded-[2rem] border border-dashed border-proyecta-cyan/30">
                            <p className="text-proyecta-navy/50 dark:text-white/40 text-lg">
                              Miembros de {equipo.title} por anunciar...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
