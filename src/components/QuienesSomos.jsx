import React, { useState, useRef, useCallback, memo } from "react";
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
  Hammer,
  BookOpen,
  Smile
} from "lucide-react";
import { useInView } from "../hooks/useAnimations";

// SECCIÓN IMAGEN 4 REESTRUCTURADA: Los 3 Verdaderos Pilares de Proyecta con imágenes de background
const pilaresAccion = [
  {
    icon: Hammer,
    title: "Construcción",
    color: "text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/20",
    image: `${import.meta.env.BASE_URL}assets/photos/construyendo.jpg`,
    description: "Construcciones realizadas por los voluntarios en espacios comunes del sector rural intervenido. Tienen por objetivo brindar un espacio físico en el que la comunidad pueda reunirse y realizar sus actividades, dando paso a fortalecer sus lazos y su sentido de unión."
  },
  {
    icon: Smile,
    title: "Talleres",
    color: "text-proyecta-yellow",
    bgIcon: "bg-proyecta-yellow/20",
    image: `${import.meta.env.BASE_URL}assets/photos/comunidad.jpg`,
    description: "Instancias de aprendizaje o distensión que los voluntarios realizan con la comunidad. Tienen por objetivo ser un punto de encuentro para las personas del lugar, de manera que a través de estas instancias la comunidad pueda formar lazos y reforzar su sentido de unión."
  },
  {
    icon: BookOpen,
    title: "Formación",
    color: "text-proyecta-teal",
    bgIcon: "bg-proyecta-teal/20",
    image: `${import.meta.env.BASE_URL}assets/photos/saludo.JPG`,
    description: "Espacio de reflexión que permite al voluntario meditar y analizar lo vivido en los trabajos, en contraposición a sus vidas, sus valores y sus metas. Como fin último, se busca inculcar en los voluntarios una vocación de servicio, de manera que en el futuro sean profesionales con conciencia social."
  }
];

// SECCIÓN IMAGEN 5 REFORMADA: Principios Fundacionales
const principiosValores = [
  {
    icon: HeartHandshake,
    label: "Respeto",
    color: "text-proyecta-cyan",
    image: `${import.meta.env.BASE_URL}assets/photos/construyendo.jpg`,
    text: "Reconocemos el valor intrínseco, la historia y la identidad de cada comunidad rural, trabajando de igual a igual.",
  },
  {
    icon: Users,
    label: "Inclusión",
    color: "text-proyecta-yellow",
    image: `${import.meta.env.BASE_URL}assets/photos/awada.jpeg`,
    text: "Construimos espacios donde cada vecino y vecina cuenta, promoviendo la participación activa sin distinciones.",
  },
  {
    icon: Zap,
    label: "Empoderamiento",
    color: "text-proyecta-orange",
    image: `${import.meta.env.BASE_URL}assets/photos/dos_torres.JPG`,
    text: "Fomentamos el liderazgo individual y colectivo para que las comunidades sean autónomas en su crecimiento.",
  },
  {
    icon: LinkIcon,
    label: "Asociatividad",
    color: "text-proyecta-teal",
    image: `${import.meta.env.BASE_URL}assets/photos/escopeta.jpeg`,
    text: "Unimos voluntades no remuneradas bajo lazos de mutua confianza y cooperación para alcanzar metas comunes.",
  },
  {
    icon: Sprout,
    label: "Agentes de Cambio",
    color: "text-proyecta-sky",
    image: `${import.meta.env.BASE_URL}assets/photos/epica.jpeg`,
    text: "Inculcamos una actitud de servicio permanente que inspire a nuestros voluntarios a ser profesionales con conciencia social.",
  },
];

export default function QuienesSomos() {
  const [ref, isVisible] = useInView();

  return (
    <section
      id="quienes-somos"
      className="pt-32 pb-24 bg-white dark:bg-[#0D1F2A] overflow-hidden transition-colors duration-300"
      ref={ref}
    >
      <div className="section-container">
        
        {/* 1. SECCIÓN: ¿QUÉ ES PROYECTA? */}
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Imagen de Esencia */}
          <div className="lg:w-1/2 relative w-full">
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500">
              <img
                src={`${import.meta.env.BASE_URL}assets/photos/blanco_y_negro.JPG`}
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

          {/* Textos de Esencia */}
          <div className="lg:w-1/2 flex flex-col items-start text-left mt-8 lg:mt-0">
            <span className="section-tag mb-4">Nuestra Esencia</span>
            <h2 className="section-title mb-6 leading-tight">
              Construyendo <br />
              <span className="gradient-text">comunidad</span> desde la acción
            </h2>
            <span className="decorative-line mb-6" />
            <div className="space-y-4 text-proyecta-navy/80 dark:text-white/70 text-lg leading-relaxed">
              <p>
                Proyecta es un voluntariado nacido el año 2005 en la Pontificia Universidad Católica de Chile, impulsado desde las facultades de Ingeniería y Diseño, que busca{" "}
                <strong className="text-proyecta-navy dark:text-white font-bold">disminuir la pobreza multidimensional</strong> fortaleciendo de raíz el tejido social y la asociatividad en comunidades rurales de nuestro país.
              </p>
              <p>
                No nos limitamos a construir infraestructura; trabajamos <em>junto</em> a las familias rurales, generando espacios genuinos de encuentro, participación activa y colaboración que robustecen de manera duradera las redes de apoyo local, la confianza colectiva y el liderazgo vecinal.
              </p>
            </div>
          </div>
        </div>

        {/* 2. SECCIÓN: MISIÓN Y VISIÓN */}
        <div className="space-y-24 mb-32">
          {/* Misión */}
          <div
            className={`flex flex-col md:flex-row items-center gap-10 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="md:w-5/12 order-2 md:order-1 glass p-8 sm:p-12 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <Target size={120} className="text-proyecta-cyan" />
              </div>
              <div className="inline-flex p-3 rounded-2xl bg-proyecta-cyan/10 mb-6">
                <Target className="text-proyecta-cyan" size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-black text-proyecta-navy dark:text-white mb-4 font-display">
                Nuestra Misión
              </h3>
              <p className="text-proyecta-navy/80 dark:text-white/70 leading-relaxed relative z-10 text-lg">
                Disminuir la pobreza multidimensional en Chile mediante el{" "}
                <strong>fortalecimiento de la cohesión comunitaria</strong> en sectores rurales. Buscamos potenciar la asociatividad, entendida como una organización voluntaria, basada en lazos estables de confianza y cooperación para conseguir objetivos comunes y el bienestar general.
              </p>
            </div>
            <div className="md:w-7/12 order-1 md:order-2 h-[350px] w-full rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={`${import.meta.env.BASE_URL}assets/photos/comunidad.jpg`}
                alt="Comunidad unida en Proyecta"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Visión */}
          <div
            className={`flex flex-col md:flex-row items-center gap-10 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="md:w-7/12 h-[350px] w-full rounded-[2rem] overflow-hidden shadow-lg">
              <img
                src={`${import.meta.env.BASE_URL}assets/photos/saludo.JPG`}
                alt="Voluntarios mirando hacia el futuro rural"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-5/12 glass p-8 sm:p-12 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <Eye size={120} className="text-proyecta-yellow" />
              </div>
              <div className="inline-flex p-3 rounded-2xl bg-proyecta-yellow/10 mb-6">
                <Eye className="text-proyecta-yellow" size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-black text-proyecta-navy dark:text-white mb-4 font-display">
                Nuestra Visión
              </h3>
              <p className="text-proyecta-navy/80 dark:text-white/70 leading-relaxed relative z-10 text-lg">
                Deseamos vivir en un Chile donde la cohesión social y la participación activa sean el eje del bienestar. Visualizamos comunidades rurales dotadas de la autonomía y las redes de apoyo necesarias para ser{" "}
                <strong>protagonistas autónomas de su propio desarrollo</strong> y crecimiento sostenible a lo largo del tiempo.
              </p>
            </div>
          </div>
        </div>

        {/* 3. SECCIÓN: OBJETIVOS EN DOS FRENTES */}
        <div
          className={`mb-32 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center mb-16">
            <span className="section-tag mb-4">Nuestro Propósito</span>
            <h2 className="section-title mt-4">
              Objetivos Globales en <span className="text-proyecta-cyan">Dos Frentes</span>
            </h2>
            <span className="decorative-line mx-auto" />
            <p className="max-w-2xl mx-auto text-lg text-proyecta-navy/70 dark:text-white/70 mt-4">
              Impulsamos oportunidades y expectativas de crecimiento operando de forma simultánea en la comunidad y en nuestro equipo humano.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Frente Comunidades */}
            <div className="card dark:card-dark p-8 sm:p-10 border-t-4 border-t-proyecta-yellow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-proyecta-yellow/10 text-proyecta-yellow">
                  <Home size={32} />
                </div>
                <h3 className="text-2xl font-bold text-proyecta-navy dark:text-white">
                  Para las Comunidades
                </h3>
              </div>
              <ul className="space-y-4 text-proyecta-navy/80 dark:text-white/70 text-base">
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-yellow font-bold text-lg">✓</span>{" "}
                  Potenciar la asociatividad, fomentando el empoderamiento y liderazgo individual vecinal.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-yellow font-bold text-lg">✓</span>{" "}
                  Fortalecer de forma orgánica las redes de comunicación interna, vecindad y confianza recíproca.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-yellow font-bold text-lg">✓</span>{" "}
                  Entregar infraestructura comunitaria útil que incremente los índices de participación local.
                </li>
              </ul>
            </div>

            {/* Frente Voluntarios */}
            <div className="card dark:card-dark p-8 sm:p-10 border-t-4 border-t-proyecta-teal">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-proyecta-teal/10 text-proyecta-teal">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-2xl font-bold text-proyecta-navy dark:text-white">
                  Para nuestros Voluntarios
                </h3>
              </div>
              <ul className="space-y-4 text-proyecta-navy/80 dark:text-white/70 text-base">
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-cyan font-bold text-lg">✓</span>{" "}
                  Interiorizar de manera profunda los principios éticos y solidarios que promueve el proyecto.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-cyan font-bold text-lg">✓</span>{" "}
                  Desarrollar aptitudes críticas de liderazgo valórico y catalizadores de cambio social.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-proyecta-cyan font-bold text-lg">✓</span>{" "}
                  Potenciar la autoconformación reflexiva, la empatía constructiva y el sentido de comunidad.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. SECCIÓN MODIFICADA: LOS 3 PILARES OPERACIONALES (MÁS GRANDES Y FIX DE ESQUINAS) */}
<div
  className={`mb-32 transition-all duration-1000 delay-450 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
  }`}
>
  <div className="text-center mb-16">
    <span className="section-tag mb-4">Metodología de Trabajo</span>
    <h2 className="section-title mt-4">Nuestros Pilares de Acción</h2>
    <span className="decorative-line mx-auto" />
    <p className="max-w-2xl mx-auto text-lg text-proyecta-navy/70 dark:text-white/70 mt-4">
      Conectamos el trabajo de los voluntarios con las metas de la comunidad mediante tres ejes prácticos y formativos.
    </p>
  </div>

  {/* Grid con mayor separación para dar aire a tarjetas más grandes */}
  <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
    {pilaresAccion.map((pilar, index) => {
      const IconComponent = pilar.icon;
      return (
        <div 
          key={index} 
          // Aumentamos altura mínima (min-h-[480px] a lg:min-h-[540px]), padding (p-10 a lg:p-12) 
          // e implementamos 'isolate' para prevenir el bug visual en el renderizado
          className="relative min-h-[480px] lg:min-h-[540px] rounded-[2.5rem] overflow-hidden isolate group shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 flex flex-col justify-end p-10 lg:p-12"
        >
          {/* Background Image: Añadido rounded-[2.5rem] interno para forzar al motor gráfico a respetar los bordes */}
          <img 
            src={pilar.image} 
            alt={pilar.title} 
            className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          {/* Capa de degradado oscuro controlado para asegurar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B151E]/95 via-[#0B151E]/75 to-transparent group-hover:via-[#0B151E]/85 transition-all duration-300 rounded-[2.5rem]"></div>

          {/* Contenido con textos más grandes y jerarquizados */}
          <div className="relative z-10 flex flex-col h-full justify-between pt-12">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3.5 rounded-2xl bg-white/10 text-white backdrop-blur-md shadow-inner">
                <IconComponent size={28} strokeWidth={2.2} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-white font-display tracking-wide">
                {pilar.title}
              </h3>
            </div>
            {/* Escalado el texto a text-base (antes text-sm) para mejorar impacto visual y lectura */}
            <p className="text-white/90 text-base leading-relaxed antialiased font-medium">
              {pilar.description}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</div>

        {/* 5. SECCIÓN REESTRUCTURADA: PRINCIPIOS FUNDACIONALES (INTEGRADOS AL FLUJO ORIGINAL) */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center mb-16">
            <span className="section-tag mb-4">Marco Estatutario</span>
            <h2 className="section-title mt-4">Principios Fundacionales</h2>
            <span className="decorative-line mx-auto" />
            <p className="max-w-2xl mx-auto text-lg text-proyecta-navy/70 dark:text-white/70 mt-4">
              Cinco directrices sustentadas en nuestros estatutos oficiales que guían de manera íntegra cada intervención social y humana de Proyecta.
            </p>
          </div>

          {/* Cuadrícula adaptable integrada al background nativo de la app */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {principiosValores.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.label}
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] card dark:card-dark flex flex-col rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-card border border-proyecta-navy/5 dark:border-white/5 bg-white dark:bg-[#122530]"
                >
                  {/* Imagen superior */}
                  <div className="relative h-48 overflow-hidden w-full">
                    <img
                      src={p.image}
                      alt={p.label}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-proyecta-navy/30 group-hover:bg-proyecta-navy/10 transition-colors duration-500"></div>
                  </div>

                  {/* Inserto flotante adaptado para fondos claros/oscuros */}
                  <div className="relative -mt-8 ml-6 z-20">
                    <div className="inline-flex p-3 rounded-2xl bg-white dark:bg-[#0D1F2A] shadow-md border border-proyecta-navy/5 dark:border-white/10">
                      <Icon size={24} className={p.color} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Contenido descriptivo adaptable */}
                  <div className="p-6 pt-4 flex-grow flex flex-col">
                    <h4 className="text-xl font-bold text-proyecta-navy dark:text-white mb-2 font-display">
                      {p.label}
                    </h4>
                    <p className="text-proyecta-navy/70 dark:text-white/70 text-sm leading-relaxed flex-grow">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="inline-block px-4 py-1.5 rounded-full bg-proyecta-navy/5 dark:bg-white/5 border border-proyecta-navy/10 dark:border-white/10 text-xs text-proyecta-navy/50 dark:text-white/40 uppercase tracking-widest font-mono">
              Información extraída de forma textual de los Estatutos Proyecta 2026
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}