// ============================================================
// 🗺 COMUNIDADES PROYECTA — Datos de intervención
// Reemplaza con datos reales cuando estén disponibles.
// Coordenadas en formato [longitude, latitude] (GeoJSON estándar)
// ============================================================

export type Category =
  | "Trabajos"
  | "Operaciones"
  | "Intervenciones"
  | "Operativos";

export interface Photo {
  url: string;
  caption: string;
}

export interface Metric {
  label: string;
  value: string;
  icon: string; // Nombre del ícono de Lucide
}

export interface Community {
  id: string;
  name: string; // Nombre del lugar/sector
  region: string; // Región completa
  regionCode: string; // Nombre corto para display
  year: number; // Año de la intervención
  coordinates: [number, number]; // [lng, lat] — estándar GeoJSON
  category: Category;
  whatWasBuilt: string; // Qué se hizo/construyó
  summary: string; // Descripción del trabajo realizado
  photos: Photo[]; // Galería de fotos
  metrics: Metric[]; // Indicadores de impacto
  tags: string[]; // Etiquetas
}

// ============================================================
// DATOS DE COMUNIDADES — actualizar con información real
// ============================================================
export const communities: Community[] = [
  {
    id: "alto-hospicio",
    name: "Alto Hospicio",
    region: "Región de Tarapacá",
    regionCode: "Tarapacá",
    year: 2019,
    coordinates: [-70.1, -20.28],
    category: "Trabajos",
    whatWasBuilt: "Operativo de Salud Integral",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80",
        caption: "Atención médica general",
      },
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80",
        caption: "Jornada de salud preventiva",
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80",
        caption: "Equipo de voluntarios en terreno",
      },
    ],
    metrics: [
      { label: "Personas atendidas", value: "340+", icon: "Heart" },
      { label: "Voluntarios", value: "28", icon: "Users" },
      { label: "Días de operativo", value: "3", icon: "Calendar" },
      { label: "Especialidades médicas", value: "6", icon: "Stethoscope" },
    ],
    tags: ["Salud", "Operativo", "Norte Grande"],
  },

  {
    id: "calama",
    name: "Calama",
    region: "Región de Antofagasta",
    regionCode: "Antofagasta",
    year: 2020,
    coordinates: [-68.93, -22.46],
    category: "Operaciones",
    whatWasBuilt: "Talleres de Habilidades Digitales",
    summary:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80",
        caption: "Taller de computación",
      },
      {
        url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700&q=80",
        caption: "Sesión de trabajo grupal",
      },
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80",
        caption: "Certificación de participantes",
      },
    ],
    metrics: [
      { label: "Personas capacitadas", value: "120", icon: "GraduationCap" },
      { label: "Talleres realizados", value: "8", icon: "BookOpen" },
      { label: "Horas de formación", value: "64", icon: "Clock" },
      { label: "Tasa de completación", value: "94%", icon: "TrendingUp" },
    ],
    tags: ["Educación", "Digital", "Norte"],
  },

  {
    id: "ovalle",
    name: "Ovalle",
    region: "Región de Coquimbo",
    regionCode: "Coquimbo",
    year: 2021,
    coordinates: [-71.2, -30.6],
    category: "Intervenciones",
    whatWasBuilt: "Mejoramiento de Plaza Comunitaria",
    summary:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=700&q=80",
        caption: "Faena de construcción",
      },
      {
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80",
        caption: "Comunidad participando",
      },
      {
        url: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=700&q=80",
        caption: "Plaza terminada",
      },
    ],
    metrics: [
      { label: "M² intervenidos", value: "850", icon: "Maximize2" },
      { label: "Voluntarios", value: "45", icon: "Users" },
      { label: "Árboles plantados", value: "32", icon: "Trees" },
      { label: "Familias beneficiadas", value: "200+", icon: "Home" },
    ],
    tags: ["Infraestructura", "Espacio Público", "Norte Chico"],
  },

  {
    id: "quilpue",
    name: "Quilpué",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2021,
    coordinates: [-71.44, -33.05],
    category: "Operativos",
    whatWasBuilt: "Red de Apoyo Alimentario Comunitario",
    summary:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1593113630400-ea4288922559?w=700&q=80",
        caption: "Distribución de alimentos",
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80",
        caption: "Preparación de canastas",
      },
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=700&q=80",
        caption: "Familias atendidas",
      },
    ],
    metrics: [
      { label: "Canastas entregadas", value: "1.200", icon: "Package" },
      { label: "Familias", value: "380", icon: "Home" },
      { label: "Semanas activas", value: "12", icon: "Calendar" },
      { label: "Toneladas de alimentos", value: "4.8", icon: "Scale" },
    ],
    tags: ["Social", "Alimentación", "Zona Central"],
  },

  {
    id: "la-pintana",
    name: "La Pintana",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2022,
    coordinates: [-70.62, -33.58],
    category: "Trabajos",
    whatWasBuilt: "Módulo de Atención Preventiva",
    summary:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80",
        caption: "Control preventivo adultos",
      },
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80",
        caption: "Control de niños y niñas",
      },
      {
        url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=700&q=80",
        caption: "Charla de salud mental",
      },
    ],
    metrics: [
      { label: "Controles realizados", value: "520", icon: "Heart" },
      { label: "Niños atendidos", value: "140", icon: "Baby" },
      { label: "Derivaciones", value: "38", icon: "ArrowRight" },
      { label: "Voluntarios de salud", value: "22", icon: "Stethoscope" },
    ],
    tags: ["Salud", "Preventivo", "RM", "Infancia"],
  },

  {
    id: "el-bosque",
    name: "El Bosque",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2022,
    coordinates: [-70.67, -33.57],
    category: "Trabajos",
    whatWasBuilt: "Biblioteca y Centro Cultural Comunitario",
    summary:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&q=80",
        caption: "Inauguración de la biblioteca",
      },
      {
        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80",
        caption: "Actividades para niños",
      },
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80",
        caption: "Taller de lectura",
      },
    ],
    metrics: [
      { label: "Libros donados", value: "2.400", icon: "BookOpen" },
      { label: "Socios inscritos", value: "310", icon: "Users" },
      { label: "Actividades/mes", value: "8", icon: "Calendar" },
      { label: "M² habilitados", value: "220", icon: "Maximize2" },
    ],
    tags: ["Educación", "Cultura", "RM", "Lectura"],
  },

  {
    id: "talca",
    name: "Talca",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2020,
    coordinates: [-71.67, -35.43],
    category: "Trabajos",
    whatWasBuilt: "Operativo Integral Post-Emergencia",
    summary:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80",
        caption: "Trabajo comunitario conjunto",
      },
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=700&q=80",
        caption: "Entrega de kits de emergencia",
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80",
        caption: "Equipo de respuesta rápida",
      },
    ],
    metrics: [
      { label: "Familias asistidas", value: "280", icon: "Home" },
      { label: "Kits entregados", value: "280", icon: "Package" },
      { label: "Voluntarios movilizados", value: "60", icon: "Users" },
      { label: "Horas de trabajo", value: "480", icon: "Clock" },
    ],
    tags: ["Social", "Emergencia", "Maule", "Respuesta Rápida"],
  },

  {
    id: "concepcion",
    name: "Concepción",
    region: "Región del Biobío",
    regionCode: "Biobío",
    year: 2022,
    coordinates: [-73.05, -36.82],
    category: "Operaciones",
    whatWasBuilt: "Programa de Alfabetización Digital",
    summary:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700&q=80",
        caption: "Capacitación en tecnología",
      },
      {
        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80",
        caption: "Adultos mayores aprendiendo",
      },
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80",
        caption: "Clausura del programa",
      },
    ],
    metrics: [
      { label: "Adultos capacitados", value: "95", icon: "GraduationCap" },
      { label: "Módulos completados", value: "6", icon: "BookOpen" },
      { label: "Equipos donados", value: "12", icon: "Monitor" },
      { label: "Instructores", value: "8", icon: "Users" },
    ],
    tags: ["Educación", "Digital", "Biobío", "Adultos Mayores"],
  },

  {
    id: "temuco",
    name: "Temuco",
    region: "Región de La Araucanía",
    regionCode: "Araucanía",
    year: 2023,
    coordinates: [-72.59, -38.73],
    category: "Operaciones",
    whatWasBuilt: "Huerto Comunitario Intercultural",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae orci ultricies, auctor orci nec, pellentesque sapien. In hac habitasse platea dictumst. Morbi sollicitudin augue eget feugiat dapibus.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80",
        caption: "Preparación del terreno",
      },
      {
        url: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=700&q=80",
        caption: "Comunidad mapuche colaborando",
      },
      {
        url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=700&q=80",
        caption: "Primera cosecha comunitaria",
      },
    ],
    metrics: [
      { label: "M² de huerto", value: "400", icon: "Maximize2" },
      { label: "Especies plantadas", value: "28", icon: "Leaf" },
      { label: "Familias participantes", value: "45", icon: "Home" },
      { label: "Talleres de agroecología", value: "6", icon: "BookOpen" },
    ],
    tags: ["Medioambiente", "Interculturalidad", "Araucanía", "Huerto"],
  },

  {
    id: "valdivia",
    name: "Valdivia",
    region: "Región de Los Ríos",
    regionCode: "Los Ríos",
    year: 2022,
    coordinates: [-73.24, -39.81],
    category: "Operaciones",
    whatWasBuilt: "Campaña de Educación Ambiental y Limpieza de Riberas",
    summary:
      "Integer vehicula risus sit amet leo fringilla eleifend. Morbi nec ligula nec ex consectetur euismod. Aliquam erat volutpat. Nunc commodo lorem bibendum diam congue, in maximus felis rhoncus. Phasellus bibendum sapien et.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=700&q=80",
        caption: "Limpieza del río Calle-Calle",
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80",
        caption: "Voluntarios en faena",
      },
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80",
        caption: "Plantación de ribera",
      },
    ],
    metrics: [
      { label: "Kg de basura retirados", value: "1.800", icon: "Trash2" },
      { label: "Km de ribera", value: "4.2", icon: "MapPin" },
      { label: "Voluntarios", value: "80", icon: "Users" },
      { label: "Árboles plantados", value: "60", icon: "Trees" },
    ],
    tags: ["Medioambiente", "Ríos", "Los Ríos", "Limpieza"],
  },

  {
    id: "puerto-montt",
    name: "Puerto Montt",
    region: "Región de Los Lagos",
    regionCode: "Los Lagos",
    year: 2023,
    coordinates: [-72.93, -41.47],
    category: "Trabajos",
    whatWasBuilt: "Sede Social y Centro Deportivo Comunitario",
    summary:
      "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Nullam quis risus eget urna mollis ornare vel eu leo.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&q=80",
        caption: "Construcción de la sede",
      },
      {
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80",
        caption: "Inauguración comunitaria",
      },
      {
        url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700&q=80",
        caption: "Primera actividad deportiva",
      },
    ],
    metrics: [
      { label: "M² construidos", value: "320", icon: "Maximize2" },
      { label: "Vecinos beneficiados", value: "600+", icon: "Users" },
      { label: "Semanas de obra", value: "8", icon: "Calendar" },
      { label: "Voluntarios en obra", value: "50", icon: "Hammer" },
    ],
    tags: ["Infraestructura", "Deporte", "Los Lagos", "Sede Social"],
  },
];

// ============================================================
// HELPERS
// ============================================================
export const categoryColors: Record<Category, string> = {
  Trabajos: "#40D0F0", // cyan
  Operaciones: "#FFBB00", // yellow
  Intervenciones: "#1B9AB5", // teal
  Operativos: "#F57C00", // orange
};

export const categoryLabels: Record<Category, string> = {
  Trabajos: "Trabajos",
  Operaciones: "Operaciones",
  Intervenciones: "Intervenciones",
  Operativos: "Operativos",
};
