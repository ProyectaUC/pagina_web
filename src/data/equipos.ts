import {
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
export const equiposData = [
  {
    id: "jefes",
    title: "Jefes Generales",
    icon: Star, // Recuerda que debes tener los iconos importados
    color: "text-proyecta-orange dark:text-proyecta-yellow",
    bgIcon: "bg-proyecta-yellow/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/jefes/jefes.jpg`,
    isVerticalGroupImage: true,
    groupDescription:
      "Los encargados de guiar la visión 2026, coordinar a todas las áreas y asegurar que el espíritu de Proyecta se mantenga vivo en cada decisión.",
    members: [
      {
        name: "Marta",
        carrera: "Medicina",
        image: `${import.meta.env.BASE_URL}assets/equipos/jefes/marta.jpg`,
      },
      {
        name: "Mimi",
        carrera: "Veterinaria",
        image: `${import.meta.env.BASE_URL}assets/equipos/jefes/mimi.jpg`,
      },
      {
        name: "Pinky",
        carrera: "Ingeniería y Física",
        image: `${import.meta.env.BASE_URL}assets/equipos/jefes/pinky.jpg`,
      },
    ],
  },
  {
    id: "difusion",
    title: "Difusión",
    icon: Megaphone,
    color: "text-proyecta-teal dark:text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/difusion/difu.jpg`,
    isVerticalGroupImage: true,
    groupDescription:
      "La voz de Proyecta. Encargados de comunicar nuestro impacto, manejar las redes sociales y conectar con nuevos voluntarios y la comunidad.",
    members: [
      {
        name: "Anto",
        carrera: "Derecho",
        image: `${import.meta.env.BASE_URL}assets/equipos/difusion/anto.jpg`,
      },
      {
        name: "Bambi",
        carrera: "Pedagogía",
        image: `${import.meta.env.BASE_URL}assets/equipos/difusion/bambi.jpg`,
      },
      {
        name: "Rebe",
        carrera: "Ingeniería Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/difusion/rebe.jpg`,
      },
    ],
  },
  {
    id: "financiamiento",
    title: "Financiamiento",
    icon: Coins,
    color: "text-proyecta-orange",
    bgIcon: "bg-proyecta-orange/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/financiamiento/finan.jpg`,
    isVerticalGroupImage: true,
    groupDescription:
      "El motor económico. Buscan auspicios, organizan eventos de recaudación y gestionan los fondos para hacer posibles los proyectos.",
    members: [
      {
        name: "Joao",
        carrera: "Ingeniería Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/financiamiento/joao.jpg`,
      },
      {
        name: "Maca",
        carrera: "Ingeniería Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/financiamiento/maca.jpg`,
      },
      {
        name: "Pipe",
        carrera: "Ingeniería Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/financiamiento/pipe.jpg`,
      },
      {
        name: "Yoshi",
        carrera: "Ingeniería Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/financiamiento/yoshi.jpg`,
      },
    ],
  },
  {
    id: "equipo",
    title: "Equipo",
    icon: BookOpen,
    color: "text-proyecta-teal",
    bgIcon: "bg-proyecta-teal/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/equipo/equipo.jpg`,
    groupDescription:
      "Los que se encargan de que la cultura de Proyecta se mantenga viva.",
    members: [
      {
        name: "Fer",
        carrera: "Ingenieria Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/equipo/fer.jpg`,
      },
      {
        name: "Zazu",
        carrera: "Pedagogía",
        image: `${import.meta.env.BASE_URL}assets/equipos/equipo/zazu.jpg`,
      },
      {
        name: "Pollo",
        carrera: "Ingenieria Comercial",
        image: `${import.meta.env.BASE_URL}assets/equipos/equipo/pollo.jpg`,
      },
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
    members: [
      {
        name: "Max",
        carrera: "Ciencia Política y Sociología",
        image: `${import.meta.env.BASE_URL}assets/equipos/historia_y_legado/max.jpg`,
      },
    ],
  },
  {
    id: "recursos",
    title: "Recursos",
    icon: Package,
    color: "text-proyecta-orange dark:text-proyecta-yellow",
    bgIcon: "bg-proyecta-yellow/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/recursos/recursos.jpeg`,
    isVerticalGroupImage: false,
    groupDescription:
      "Los adictos al fideo y al excel. Les mantenemos las watas llenas a los voluntarios en terreno. La comision mas importante de todas. Sin nosotros se mueren de hambre.",
    members: [
      {
        name: "Pancito",
        carrera: "LICD",
        funFact: "El que programó esta página jeje.",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/pancito.jpeg`,
      },
      {
        name: "Momo",
        carrera: "Pedagogía",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/momo.jpeg`,
      },
      {
        name: "Conyshi",
        carrera: "Ingeniería en Recursos Naturales",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/conyshi.jpeg`,
      },
      {
        name: "Carozzi",
        carrera: "Ingeniería Comercial",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/carozzi.jpeg`,
      },
      {
        name: "Naxo",
        carrera: "Ingeniería Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/recursos/naxo.jpeg`,
        isMentor: true,
      },
    ],
  },
  {
    id: "diseno",
    title: "Diseño y Construcción",
    icon: Hammer,
    color: "text-proyecta-teal dark:text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/diseño_y_construccion/dyc.jpg`,
    isVerticalGroupImage: true,
    groupDescription: "",
    members: [
      {
        name: "Fefe",
        carrera: "Construcción Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/diseño_y_construccion/fefe.jpg`,
      },
      {
        name: "Walala",
        carrera: "Construcción Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/diseño_y_construccion/walala.jpg`,
      },
    ],
  },
  {
    id: "formacion",
    title: "Formación",
    icon: GraduationCap,
    color: "text-proyecta-teal",
    bgIcon: "bg-proyecta-teal/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/formacion/formacion.jpg`,
    isVerticalGroupImage: true,
    groupDescription: "",
    members: [
      {
        name: "Berni",
        carrera: "Terapia Ocupacional",
        image: `${import.meta.env.BASE_URL}assets/equipos/formacion/berni.jpg`,
      },
      {
        name: "Maura",
        carrera: "College para Derecho",
        image: `${import.meta.env.BASE_URL}assets/equipos/formacion/maura.jpg`,
      },
      {
        name: "Pitu",
        carrera: "Psicología",
        image: `${import.meta.env.BASE_URL}assets/equipos/formacion/pitu.jpg`,
      },
    ],
  },
  {
    id: "redes",
    title: "Redes y Contactos",
    icon: Globe,
    color: "text-proyecta-orange",
    bgIcon: "bg-proyecta-orange/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/redes_y_contactos/ryc.jpg`,
    isVerticalGroupImage: true,
    groupDescription: "",
    members: [
      {
        name: "Camilu",
        carrera: "Medicina",
        image: `${import.meta.env.BASE_URL}assets/equipos/redes_y_contactos/camilu.jpg`,
      },
      {
        name: "Sofi",
        carrera: "Ingeniería en Recursos Naturales",
        image: `${import.meta.env.BASE_URL}assets/equipos/redes_y_contactos/maruchan.jpg`,
      },
    ],
  },
  {
    id: "resultados",
    title: "Resultados e Impacto",
    icon: TrendingUp,
    color: "text-proyecta-orange dark:text-proyecta-yellow",
    bgIcon: "bg-proyecta-yellow/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/resultados_e_impacto/rei.jpg`,
    isVerticalGroupImage: true,
    groupDescription: "",
    members: [
      {
        name: "Cami",
        carrera: "Trabajo Social",
        image: `${import.meta.env.BASE_URL}assets/equipos/resultados_e_impacto/cami.jpg`,
      },
      {
        name: "Rorro",
        carrera: "Ingeniería Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/resultados_e_impacto/rorro.jpg`,
      },
      {
        name: "Tomi",
        carrera: "Ingeniería Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/resultados_e_impacto/tomi.jpg`,
      },
    ],
  },
  {
    id: "servicio",
    title: "Servicio",
    icon: HeartHandshake,
    color: "text-proyecta-teal",
    bgIcon: "bg-proyecta-teal/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/servicio/servicio.jpg`,
    isVerticalGroupImage: false,
    groupDescription: "",
    members: [
      {
        name: "Alex",
        carrera: "Construcción Civil",
        image: `${import.meta.env.BASE_URL}assets/equipos/servicio/alex.jpg`,
      },
      {
        name: "Gabo",
        carrera: "Física",
        image: `${import.meta.env.BASE_URL}assets/equipos/servicio/gabo.jpg`,
      },
      {
        name: "Danii",
        carrera: "Enfermería",
        image: `${import.meta.env.BASE_URL}assets/equipos/servicio/perdon.jpg`,
      },
      {
        name: "Tata",
        carrera: "College para Ingeniería",
        image: `${import.meta.env.BASE_URL}assets/equipos/servicio/tata.jpg`,
      },
    ],
  },
  {
    id: "talleres",
    title: "Talleres",
    icon: Palette,
    color: "text-proyecta-teal dark:text-proyecta-cyan",
    bgIcon: "bg-proyecta-cyan/10",
    groupImage: `${import.meta.env.BASE_URL}assets/equipos/talleres/talleres.jpg`,
    isVerticalGroupImage: true,
    groupDescription: "",
    members: [
      {
        name: "Eli",
        carrera: "Ingeniería Comercial",
        image: `${import.meta.env.BASE_URL}assets/equipos/talleres/eli.jpg`,
      },
      {
        name: "Reni",
        carrera: "Terapia Ocupacional",
        image: `${import.meta.env.BASE_URL}assets/equipos/talleres/reni.jpg`,
      },
      {
        name: "Sopita",
        carrera: "College de Derecho",
        image: `${import.meta.env.BASE_URL}assets/equipos/talleres/sopita.jpg`,
      },
    ],
  },
];
