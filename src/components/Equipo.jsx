import React, { useState } from "react";
import {
  ChevronDown,
  Star,
  Megaphone,
  Coins,
  BookOpen,
  Package,
  Hammer,
  TrendingUp,
  Globe,
  Palette,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";

// Datos del equipo estructurados.
// Reemplaza las URLs de Unsplash con las fotos reales de tu equipo.
const equiposData = [
  {
    id: "jefes",
    title: "Jefes Generales",
    icon: Star,
    color: "text-proyecta-yellow",
    bgIcon: "bg-proyecta-yellow/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/jefes/20260417_134004.jpg`,
    groupDescription:
      "Los encargados de guiar la visión 2026, coordinar a todas las áreas y asegurar que el espíritu de Proyecta se mantenga vivo en cada decisión.",
    members: [],
  },
  {
    id: "difusion",
    title: "Difusión",
    icon: Megaphone,
    color: "text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/10",
    groupDescription:
      "La voz de Proyecta. Encargados de comunicar nuestro impacto, manejar las redes sociales y conectar con nuevos voluntarios y la comunidad.",
    members: [
    ],
  },
  {
    id: "financiamiento",
    title: "Financiamiento",
    icon: Coins,
    color: "text-proyecta-orange",
    bgIcon: "bg-proyecta-orange/10",
    groupDescription:
      "El motor económico. Buscan auspicios, organizan eventos de recaudación y gestionan los fondos para hacer posibles los proyectos.",
    members: [
    ],
  },
  {
    id: "historia",
    title: "Historia y Legado",
    icon: BookOpen,
    color: "text-proyecta-teal",
    bgIcon: "bg-proyecta-teal/10",
    groupDescription:
      "Guardianes de nuestras raíces. Documentan el trabajo en terreno y aseguran que la cultura de Proyecta se transmita de generación en generación.",
    members: [],
  },
  {
    id: "recursos",
    title: "Recursos",
    icon: Package,
    color: "text-proyecta-yellow",
    bgIcon: "bg-proyecta-yellow/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/recursos/recursos.jpeg`,
    groupDescription:
      "Los adictos al fideo y al excel. Les mantenemos las watas llenas a los voluntarios en terreno. La comision mas importante de todas. Sin nosotros se mueren de hambre.",
    members: [
      {
        name: "Pancito",
        carrera: "LICD",
        year: "3er Año",
        funFact: "El que programo esta pagina jeje.",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/pancito.jpeg`,
      },
      {
        name: "Momo",
        carrera: "Pedagogia basica",
        year: "3er Año",
        funFact: "Las siglas de su nombre son 'M.E.A.R'.",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/momo.jpeg`,
      },
      {
        name: "Conyshi",
        carrera: "Ingenieria Ambiental",
        year: "4to Año",
        funFact: "No me acuerdo :(.",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/conyshi.jpeg`,
      },
      {
        name: "Carozzi",
        carrera: "Ingenieria Comercial",
        year: "2do Año",
        funFact: "Tampoco me acuerdo",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/carozzi.jpeg`,
      },
      {
        name: "Naxo",
        carrera: "Ingenieria Civil",
        year: "5to Año",
        funFact: "Tampoco me acuerdo",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/naxo.jpeg`,
        isMentor: true,
      },
    ],
  },
  {
    id: "diseno",
    title: "Diseño y Construcción",
    icon: Hammer,
    color: "text-proyecta-sky",
    bgIcon: "bg-proyecta-sky/10",
    groupDescription:
      "Planifican y ejecutan la infraestructura en terreno. Desde la planimetría hasta clavar el último clavo en la comunidad.",
    members: [

    ],
  },
  {
    id: "resultados",
    title: "Resultados e Impacto",
    icon: TrendingUp,
    color: "text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/10",
    groupDescription:
      "Miden nuestro avance. Recopilan datos, encuestan comunidades y evalúan si estamos cumpliendo nuestros objetivos de reducir la pobreza multidimensional.",
    members: [],
  },
  {
    id: "redes",
    title: "Redes y Contactos",
    icon: Globe,
    color: "text-proyecta-orange",
    bgIcon: "bg-proyecta-orange/10",
    groupDescription:
      "Construyen puentes. Mantienen relaciones con municipalidades, otras fundaciones y actores clave para el desarrollo territorial.",
    members: [],
  },
  {
    id: "talleres",
    title: "Talleres",
    icon: Palette,
    color: "text-proyecta-teal",
    bgIcon: "bg-proyecta-teal/10",
    groupDescription:
      "Diseñan instancias educativas y recreativas para fomentar la asociatividad y el aprendizaje en las comunidades rurales.",
    members: [],
  },
  {
    id: "formacion",
    title: "Formación",
    icon: GraduationCap,
    color: "text-proyecta-yellow",
    bgIcon: "bg-proyecta-yellow/10",

    groupDescription:
      "A cargo del frente interno: capacitar a nuestros voluntarios para que sean verdaderos agentes de cambio social.",
    members: [],
  },
  {
    id: "servicio",
    title: "Servicio",
    icon: HeartHandshake,
    color: "text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/10",
    groupDescription:
      "El corazón del terreno. Se encargan de la alimentación, el bienestar y el cuidado espiritual/emocional de todo el equipo durante los operativos.",
    members: [],
  },
];

export default function Equipo() {
  // Estado para controlar qué acordeón está abierto
  const [openSection, setOpenSection] = useState("recursos"); // Por defecto, el de Recursos está abierto

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-[#0D1F2A] min-h-screen transition-colors duration-300">
      {/* HERO SECTION: Imagen gigante del Equipo 2026 */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src="assets/equipos/equipo.jpeg"
            alt="Equipo Proyecta 2026 en terreno"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay oscuro para que se lea el texto sobre cualquier foto */}
          <div className="absolute inset-0 bg-proyecta-navy/60 dark:bg-[#0D1F2A]/70 mix-blend-multiply"></div>

          {/* Degradado inferior para fusionarse suavemente con la página */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-[#0D1F2A] to-transparent"></div>
        </div>

        {/* Contenido del Hero (Título flotante) */}
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

        {/* Indicador de Scroll hacia abajo */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
          <span className="text-proyecta-navy dark:text-white/60 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">
            Conócenos
          </span>
          <ChevronDown className="text-proyecta-cyan" size={28} />
        </div>
      </section>

      {/* 📋 SECCIÓN DE ACORDEONES */}
      <section className="py-16 sm:py-24 relative z-10">
        <div className="section-container">
          <div className="max-w-5xl mx-auto space-y-6">
            {equiposData.map((equipo) => {
              const isOpen = openSection === equipo.id;
              const Icon = equipo.icon;

              return (
                <div
                  key={equipo.id}
                  className={`card dark:card-dark overflow-hidden transition-all duration-500 border ${isOpen ? "border-proyecta-cyan shadow-proyecta-lg dark:border-proyecta-cyan/50" : "border-transparent"}`}
                >
                  {/* Botón del Acordeón */}
                  <button
                    onClick={() => toggleSection(equipo.id)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 hover:bg-proyecta-lightBg/50 dark:hover:bg-white/5 transition-colors"
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
                      className={`text-proyecta-navy/40 dark:text-white/40 transition-transform duration-500 ${isOpen ? "rotate-180 text-proyecta-cyan dark:text-proyecta-cyan" : ""}`}
                    />
                  </button>

                  {/* Contenido Desplegable */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 sm:p-8 pt-0 border-t border-gray-100 dark:border-white/10 mt-2">
                        {/* Imagen Grupal */}
                        <div className="relative w-full h-[300px] sm:h-[450px] rounded-[2rem] overflow-hidden shadow-lg mb-12 group border border-black/5 dark:border-white/10">
                          <img
                            src={equipo.groupImage}
                            alt={`Equipo de ${equipo.title}`}
                            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F2A]/90 via-[#0D1F2A]/40 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 w-full p-8 sm:p-10">
                            <h3 className="text-3xl font-bold text-white mb-3">
                              El Equipo de {equipo.title}
                            </h3>
                            <p className="text-white/80 max-w-2xl text-lg leading-relaxed shadow-sm">
                              {equipo.groupDescription}
                            </p>
                          </div>
                        </div>

                        {/* Grilla de Miembros Individuales */}
                        {equipo.members.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {equipo.members.map((member, idx) => (
                              <div
                                key={idx}
                                className={`glass rounded-[2rem] overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-500 border relative ${
                                  member.isMentor
                                    ? "border-proyecta-yellow/80 shadow-[0_0_20px_rgba(255,183,3,0.2)] dark:shadow-[0_0_20px_rgba(255,183,3,0.15)]"
                                    : "border-black/5 dark:border-white/10"
                                }`}
                              >
                                {/* ETIQUETA DE MENTOR */}
                                {member.isMentor && (
                                  <div className="absolute top-0 left-0 bg-proyecta-yellow text-proyecta-navy font-black px-6 py-2 rounded-br-[2rem] z-20 text-xs uppercase tracking-widest shadow-lg">
                                    Mentor
                                  </div>
                                )}

                                {/* Imagen Individual Gigante */}
                                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                  <img
                                    src={member.image}
                                    alt={member.name}
                                    className={`w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 ${
                                      member.isMentor
                                        ? "grayscale-0"
                                        : "grayscale-[20%] group-hover:grayscale-0"
                                    }`}
                                  />
                                  {/* Insignia Año/Carrera Flotante */}
                                  <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-[#0D1F2A]/90 backdrop-blur-sm text-proyecta-navy dark:text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                                      {member.year}
                                    </span>
                                    <span className="px-3 py-1 bg-proyecta-cyan text-proyecta-navy text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                                      {member.carrera}
                                    </span>
                                  </div>
                                </div>

                                {/* Información del Miembro */}
                                <div className="p-6 flex flex-col flex-grow bg-white/50 dark:bg-transparent">
                                  <h4 className="text-2xl font-bold text-proyecta-navy dark:text-white mb-4 font-sans">
                                    {member.name}
                                  </h4>

                                  {/* Dato Curioso - Destacado en caja */}
                                  <div
                                    className={`mt-auto p-4 rounded-r-xl border-l-4 ${
                                      member.isMentor
                                        ? "bg-proyecta-yellow/20 dark:bg-proyecta-yellow/10 border-proyecta-yellow"
                                        : "bg-proyecta-cyan/10 dark:bg-proyecta-cyan/5 border-proyecta-cyan"
                                    }`}
                                  >
                                    <p
                                      className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                                        member.isMentor
                                          ? "text-proyecta-yellow"
                                          : "text-proyecta-cyan"
                                      }`}
                                    >
                                      Dato Curioso
                                    </p>
                                    <p className="text-proyecta-navy/80 dark:text-white/70 text-sm italic">
                                      "{member.funFact}"
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          // Placeholder si aún no hay miembros cargados en el array
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
