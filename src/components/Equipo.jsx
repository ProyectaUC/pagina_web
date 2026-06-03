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
    groupImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    groupDescription:
      "Los encargados de guiar la visión 2026, coordinar a todas las áreas y asegurar que el espíritu de Proyecta se mantenga vivo en cada decisión.",
    members: [
      {
        name: "Valentina Rojas",
        carrera: "Ingeniería Civil",
        year: "5to Año",
        funFact:
          "Tiene una colección de más de 40 tazones de diferentes lugares.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
      },
      {
        name: "Matías Silva",
        carrera: "Diseño",
        year: "4to Año",
        funFact: "Puede armar un cubo Rubik en menos de 30 segundos.",
        image:
          "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80",
      },
    ],
  },
  {
    id: "difusion",
    title: "Difusión",
    icon: Megaphone,
    color: "text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/10",
    groupImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    groupDescription:
      "La voz de Proyecta. Encargados de comunicar nuestro impacto, manejar las redes sociales y conectar con nuevos voluntarios y la comunidad.",
    members: [
      {
        name: "Camila Soto",
        carrera: "Periodismo",
        year: "3er Año",
        funFact: "Ha visto la serie 'The Office' 7 veces completas.",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
      },
    ],
  },
  {
    id: "financiamiento",
    title: "Financiamiento",
    icon: Coins,
    color: "text-proyecta-orange",
    bgIcon: "bg-proyecta-orange/10",
    groupImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    groupDescription:
      "El motor económico. Buscan auspicios, organizan eventos de recaudación y gestionan los fondos para hacer posibles los proyectos.",
    members: [
      {
        name: "Lucas Mendoza",
        carrera: "Ingeniería Comercial",
        year: "4to Año",
        funFact: "Hace el mejor asado del equipo (comprobado empíricamente).",
        image:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80",
      },
    ],
  },
  {
    id: "historia",
    title: "Historia y Legado",
    icon: BookOpen,
    color: "text-proyecta-teal",
    bgIcon: "bg-proyecta-teal/10",
    groupImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=1200&q=80",
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
    groupImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    groupDescription:
      "Los magos de la logística. Consiguen, almacenan y distribuyen todos los materiales necesarios para que los operativos sean un éxito.",
    members: [],
  },
  {
    id: "diseno",
    title: "Diseño y Construcción",
    icon: Hammer,
    color: "text-proyecta-sky",
    bgIcon: "bg-proyecta-sky/10",
    groupImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    groupDescription:
      "Planifican y ejecutan la infraestructura en terreno. Desde la planimetría hasta clavar el último clavo en la comunidad.",
    members: [
      {
        name: "Sofía Vergara",
        carrera: "Arquitectura",
        year: "5to Año",
        funFact: "Su gata se llama 'AutoCAD'.",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
      },
    ],
  },
  {
    id: "resultados",
    title: "Resultados e Impacto",
    icon: TrendingUp,
    color: "text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/10",
    groupImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
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
    groupImage:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&q=80",
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
    groupImage:
      "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=1200&q=80",
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
    groupImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
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
    groupImage:
      "https://images.unsplash.com/photo-1593113630400-ea4288922559?w=1200&q=80",
    groupDescription:
      "El corazón del terreno. Se encargan de la alimentación, el bienestar y el cuidado espiritual/emocional de todo el equipo durante los operativos.",
    members: [],
  },
];

export default function Equipo() {
  // Estado para controlar qué acordeón está abierto (por defecto Jefes Generales)
  const [openSection, setOpenSection] = useState("jefes");

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0D1F2A] min-h-screen transition-colors duration-300">
      <div className="section-container">
        {/* Cabecera de la Página */}
        <div className="text-center mb-16 animate-on-scroll is-visible">
          <span className="section-tag mb-4">Nuestro Motor</span>
          <h1 className="section-title mt-4">
            Equipo <span className="gradient-text">2026</span>
          </h1>
          <span className="decorative-line mx-auto" />
          <p className="max-w-3xl mx-auto text-lg text-proyecta-navy/70 dark:text-white/70">
            Conoce a los rostros detrás de Proyecta. Estudiantes apasionados de
            diversas carreras que dedican su tiempo y energía para transformar
            la realidad territorial de Chile.
          </p>
        </div>

        {/* Lista de Acordeones */}
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
                      <div className="relative w-full h-[300px] sm:h-[450px] rounded-[2rem] overflow-hidden shadow-lg mb-12 group">
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
                              className="glass rounded-[2rem] overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-500 border border-black/5 dark:border-white/10"
                            >
                              {/* Imagen Individual Gigante */}
                              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transform scale-100 group-hover:scale-105 transition-all duration-700"
                                />
                                {/* Insignia Año/Carrera Flotante */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
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
                                <div className="mt-auto bg-proyecta-yellow/10 dark:bg-proyecta-yellow/5 border-l-4 border-proyecta-yellow p-4 rounded-r-xl">
                                  <p className="text-xs font-bold text-proyecta-yellow uppercase tracking-widest mb-1">
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
  );
}
