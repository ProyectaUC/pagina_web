import React from "react";
import {
  Target,
  Eye,
  HeartHandshake,
  Users,
  Zap,
  Link as LinkIcon,
  Sprout,
  UserPlus,
  Home,
} from "lucide-react";
import { useInView } from "../hooks/useAnimations";

// Principios con Imágenes y Lorem Ipsum agregados
const principios = [
  {
    icon: HeartHandshake,
    label: "Respeto",
    color: "text-proyecta-cyan",
    image: `${import.meta.env.BASE_URL}assets/photos/yoshi.jpeg`,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
  },
  {
    icon: Users,
    label: "Inclusión",
    color: "text-proyecta-yellow",
    image: `${import.meta.env.BASE_URL}assets/photos/yoshi.jpeg`,
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
  {
    icon: Zap,
    label: "Empoderamiento",
    color: "text-proyecta-orange",
    image: `${import.meta.env.BASE_URL}assets/photos/yoshi.jpeg`,
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.",
  },
  {
    icon: LinkIcon,
    label: "Asociatividad",
    color: "text-proyecta-teal",
    image: `${import.meta.env.BASE_URL}assets/photos/yoshi.jpeg`,
    text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui.",
  },
  {
    icon: Sprout,
    label: "Agentes de Cambio",
    color: "text-proyecta-sky",
    image: `${import.meta.env.BASE_URL}assets/photos/yoshi.jpeg`,
    text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi.",
  },
];

export default function QuienesSomos() {
  const [ref, isVisible] = useInView();

  return (
    <section
      id="quienes-somos"
      className="py-24 bg-white dark:bg-[#0D1F2A] overflow-hidden transition-colors duration-300"
      ref={ref}
    >
      <div className="section-container">
        {/* 1. SECCIÓN: ¿QUÉ ES PROYECTA? */}
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500">
              <img
                src={`${import.meta.env.BASE_URL}assets/photos/yoshi.jpeg`}
                alt="Voluntarios de Proyecta trabajando en equipo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-proyecta-navy/20 mix-blend-multiply"></div>
            </div>
            <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-white dark:bg-[#122530] p-6 rounded-3xl shadow-xl border border-proyecta-cyan/20">
              <p className="text-proyecta-teal font-bold text-sm uppercase tracking-widest mb-1">
                Fundación
              </p>
              <p className="stat-number text-5xl">2005</p>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col items-start text-left mt-8 lg:mt-0">
            <span className="section-tag mb-4">Nuestra Esencia</span>
            <h2 className="section-title mb-6 leading-tight">
              Construyendo <br />
              <span className="gradient-text">comunidad</span> desde la acción
            </h2>
            <span className="decorative-line mb-6" />
            <div className="space-y-4 text-proyecta-navy/80 dark:text-white/70 text-lg leading-relaxed">
              <p>
                Nacimos el año 2005 en la Pontificia Universidad Católica de
                Chile, con el sueño de estudiantes de Ingeniería y Diseño de{" "}
                <strong>disminuir la pobreza multidimensional</strong>{" "}
                fortaleciendo el tejido social en sectores rurales.
              </p>
              <p>
                No solo construimos infraestructura; trabajamos <em>junto</em> a
                las comunidades. A través de talleres y la revalorización de
                espacios, buscamos generar puntos de encuentro que fortalezcan
                las redes de apoyo, el liderazgo y la organización comunitaria
                local.
              </p>
            </div>
          </div>
        </div>

        {/* 2. SECCIÓN: MISIÓN Y VISIÓN */}
        <div className="space-y-24 mb-32">
          {/* Misión */}
          <div
            className={`flex flex-col md:flex-row items-center gap-10 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="md:w-5/12 order-2 md:order-1 glass p-8 sm:p-12 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <Target size={120} className="text-proyecta-cyan" />
              </div>
              <div className="inline-flex p-3 rounded-2xl bg-proyecta-cyan/10 mb-6">
                <Target
                  className="text-proyecta-cyan"
                  size={28}
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-3xl font-black text-proyecta-navy dark:text-white mb-4 font-display">
                Nuestra Misión
              </h3>
              <p className="text-proyecta-navy/80 dark:text-white/70 leading-relaxed relative z-10 text-lg">
                Disminuir la pobreza multidimensional en Chile mediante el{" "}
                <strong>fortalecimiento de la cohesión comunitaria</strong> en
                sectores rurales. Buscamos potenciar la asociatividad, creando
                lazos de confianza y cooperación voluntaria para conseguir
                objetivos comunes y el bienestar general.
              </p>
            </div>
            <div className="md:w-7/12 order-1 md:order-2 h-[350px] w-full rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={`${import.meta.env.BASE_URL}assets/photos/yoshi.jpeg`}
                alt="Comunidad unida"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Visión */}
          <div
            className={`flex flex-col md:flex-row items-center gap-10 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <div className="md:w-7/12 h-[350px] w-full rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={`${import.meta.env.BASE_URL}assets/photos/yoshi.jpeg`}
                alt="Mirando al futuro"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-5/12 glass p-8 sm:p-12 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <Eye size={120} className="text-proyecta-yellow" />
              </div>
              <div className="inline-flex p-3 rounded-2xl bg-proyecta-yellow/10 mb-6">
                <Eye
                  className="text-proyecta-yellow"
                  size={28}
                  strokeWidth={2.5}
                />
              </div>
              <h3 className="text-3xl font-black text-proyecta-navy dark:text-white mb-4 font-display">
                Nuestra Visión
              </h3>
              <p className="text-proyecta-navy/80 dark:text-white/70 leading-relaxed relative z-10 text-lg">
                Visualizamos un Chile donde la pobreza multidimensional no
                limite las oportunidades; una sociedad cohesionada donde las
                comunidades cuenten con la autonomía necesaria para ser{" "}
                <strong>protagonistas de su propio desarrollo</strong>, guiadas
                por una cultura de confianza y liderazgo que perdure en el
                tiempo.
              </p>
            </div>
          </div>
        </div>

        {/* 3. SECCIÓN: OBJETIVOS */}
        <div
          className={`mb-32 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="text-center mb-16">
            <span className="section-tag mb-4">Nuestro Propósito</span>
            <h2 className="section-title mt-4">
              Impacto en <span className="text-proyecta-cyan">Dos Frentes</span>
            </h2>
            <span className="decorative-line mx-auto" />
            <p className="max-w-2xl mx-auto text-lg text-proyecta-navy/70 dark:text-white/70">
              Generamos instancias para promover redes y oportunidades, operando
              bajo dos pilares fundamentales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card dark:card-dark p-8 sm:p-10 border-t-4 border-t-proyecta-teal">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-proyecta-teal/10 text-proyecta-teal">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-2xl font-bold text-proyecta-navy dark:text-white font-sans">
                  Para nuestros Voluntarios
                </h3>
              </div>
              <ul className="space-y-4 text-proyecta-navy/80 dark:text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-cyan font-bold">✓</span>{" "}
                  Interiorizar los principios y valores del proyecto.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-cyan font-bold">✓</span>{" "}
                  Desarrollar aptitudes de liderazgo valórico y agente de cambio
                  social.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-cyan font-bold">✓</span>{" "}
                  Potenciar el autoconocimiento y el compromiso por el otro.
                </li>
              </ul>
            </div>

            <div className="card dark:card-dark p-8 sm:p-10 border-t-4 border-t-proyecta-yellow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-proyecta-yellow/10 text-proyecta-yellow">
                  <Home size={32} />
                </div>
                <h3 className="text-2xl font-bold text-proyecta-navy dark:text-white font-sans">
                  Para las Comunidades
                </h3>
              </div>
              <ul className="space-y-4 text-proyecta-navy/80 dark:text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-yellow font-bold">✓</span>{" "}
                  Potenciar la asociatividad, el empoderamiento y liderazgo
                  individual.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-yellow font-bold">✓</span>{" "}
                  Fortalecer las redes de comunicación, confianza y lazos de
                  cooperación.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-yellow font-bold">✓</span>{" "}
                  Entregar infraestructura para aumentar la participación en
                  actividades conjuntas.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. SECCIÓN: PRINCIPIOS / PILARES (Ahora con Imágenes) */}
        <div
          className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div
            className="rounded-[3rem] p-8 sm:p-16 relative shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1B3A4B 0%, #1B5E7A 100%)",
            }}
          >
            {/* Efecto de fondo sutil del contenedor */}
            <div className="absolute inset-0 bg-[url('/assets/photos/yoshi.jpeg')] opacity-[0.03] mix-blend-overlay bg-cover bg-center rounded-[3rem]"></div>

            <div className="relative z-10 text-center mb-16">
              <h3 className="text-3xl sm:text-4xl text-white font-display mb-4">
                Nuestros Pilares
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg">
                Cinco principios que orientan nuestro desarrollo y nos llaman a
                priorizar el bienestar de la comunidad por sobre intereses
                personales.
              </p>
            </div>

            {/* Contenedor flexible para alinear dinámicamente las tarjetas (3 arriba, 2 centradas abajo en Desktop) */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 relative z-10">
              {principios.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    // Tamaños dinámicos: 100% en móvil, 50% en tablet, 33.3% en escritorio
                    className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] glass flex flex-col rounded-[2rem] overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-white/10"
                  >
                    {/* Imagen Header */}
                    <div className="relative h-48 overflow-hidden w-full">
                      <img
                        src={p.image}
                        alt={p.label}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      {/* Overlay oscuro sobre la imagen que se desvanece al hacer hover */}
                      <div className="absolute inset-0 bg-proyecta-navy/40 group-hover:bg-proyecta-navy/10 transition-colors duration-500"></div>
                    </div>

                    {/* Contenedor Flotante del Ícono */}
                    <div className="relative -mt-8 ml-6 z-20">
                      <div className="inline-flex p-3 rounded-2xl bg-[#0D1F2A] shadow-lg border border-white/10">
                        <Icon size={24} className={p.color} strokeWidth={2} />
                      </div>
                    </div>

                    {/* Textos */}
                    <div className="p-6 pt-4 flex-grow flex flex-col">
                      <h4 className="text-xl font-bold text-white mb-3 font-sans">
                        {p.label}
                      </h4>
                      <p className="text-white/70 text-sm leading-relaxed flex-grow">
                        {p.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 text-center relative z-10">
              <p className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/40 uppercase tracking-widest font-mono">
                Extraído de Estatutos Proyecta 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
