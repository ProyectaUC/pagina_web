// ============================================================
// 🗺 COMUNIDADES PROYECTA — Datos de intervención
// ============================================================
// Fuente: mapa "Lemas y lugares" (operaciones de Trabajos, 2006-2026)
// y archivo de lemas históricos de Proyecta.
//
// IMPORTANTE — lo que falta y lo que se eliminó:
// - Solo existen datos reales para la categoría "Trabajos" (este mapa).
//   Las categorías "Operaciones", "Intervenciones" y "Operativos" no
//   tienen información todavía: se elimina toda la data de ejemplo
//   (Calama, La Pintana, El Bosque, Talca, etc.) que era ficticia/Lorem
//   Ipsum, para no mezclar datos reales con datos de relleno.
// - Se eliminan los campos que no existen como información real:
//   whatWasBuilt, summary, photos y metrics ya no se completan con
//   contenido inventado. Se deja "lema" (el dato real que sí tenemos)
//   y se quitan photos/metrics hasta tener material real que cargar.
// - Coordenadas: corresponden al centro de la comuna (no del caserío
//   específico), verificadas contra fuentes geográficas de comunas de
//   Chile. Donde el lugar del mapa junta dos comunas (ej. "Cunco -
//   Melipeuco"), se usaron las coordenadas de la primera nombrada.
// - Discrepancia detectada y NO resuelta arbitrariamente: el mapa marca
//   "Sagrada Familia, 2021", pero el archivo de lemas registra
//   "Verano 2012 — Sagrada Familia". Se dejó el año 2021 (el que viene
//   del mapa, fuente más reciente/específica de ubicación), y se anota
//   en `tags` con "revisar-año" para que el equipo lo confirme.
// - "Coltauco, 2025" y "Empedrado, 2026" aparecen en el mapa pero no
//   tienen lema registrado en el archivo de lemas (que termina en
//   Romeral 2024). Se dejaron sin lema (campo undefined) en vez de
//   inventar uno.
// - "María Pinto, 2007" tampoco tiene lema correspondiente en el
//   archivo de lemas (el lema de Verano 2007 es de Chiloé, y el de
//   Otoño 2007 es de Los Rulos/Chorombo, no de María Pinto). Se dejó
//   sin lema por la misma razón.
// ============================================================

export type Category = "Trabajos" | "Operaciones" | "Intervenciones" | "Operativos";

export interface Photo {
  url: string;
  caption?: string;
}
export interface Community {
  id: string;
  name: string; // Nombre del lugar/sector, tal como aparece en el mapa
  region: string; // Región completa
  regionCode: string; // Nombre corto para display
  year: number; // Año de la intervención
  coordinates: [number, number]; // [lng, lat] — estándar GeoJSON
  category: Category;
  photos?: Photo[]; // Lista de URLs de fotos (cuando existan)
  construcciones?: string; // Lo que se construyó (cuando existe registro)
  lema?: string; // Lema de la operación (cuando existe registro)
  tags: string[];
}

// ============================================================
// DATOS DE COMUNIDADES — Trabajos (único dato real disponible)
// Ordenados cronológicamente, tal como en el archivo de lemas.
// ============================================================
export const communities: Community[] = [
  {
    id: "cunco-melipeuco-2006",
    name: "Cunco - Melipeuco",
    region: "Región de la Araucanía",
    regionCode: "Araucanía",
    year: 2006,
    coordinates: [-72.0387, -38.9264],
    category: "Trabajos",
    lema: "Construyendo desde adentro",
    tags: ["Araucanía", "Verano"],
  },
  {
    id: "litueche-la-estrella-2006",
    name: "Litueche - La Estrella",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2006,
    coordinates: [-71.7278, -34.1189],
    category: "Trabajos",
    lema: "Construyendo desde adentro",
    tags: ["O'Higgins", "Otoño"],
  },
  {
    id: "chiloe-2007",
    name: "Chiloé",
    region: "Región de Los Lagos",
    regionCode: "Los Lagos",
    year: 2007,
    coordinates: [-73.8166, -41.8791],
    category: "Trabajos",
    lema: "Que no se necesiten tus palabras, que baste con tu ejemplo",
    tags: ["Los Lagos", "Verano"],
  },
  {
    id: "maria-pinto-2007",
    name: "María Pinto",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2007,
    coordinates: [-71.1342, -33.5327],
    category: "Trabajos",
    // Sin lema registrado en el archivo de lemas para esta fecha/lugar.
    tags: ["Metropolitana"],
  },
  {
    id: "mariquina-lanco-2008",
    name: "Mariquina - Lanco",
    region: "Región de Los Ríos",
    regionCode: "Los Ríos",
    year: 2008,
    coordinates: [-73.0236, -39.5275],
    category: "Trabajos",
    lema: "No puedo parar de trabajar. Tendré toda la eternidad para descansar",
    tags: ["Los Ríos", "Verano"],
  },
  {
    id: "quillota-2008",
    name: "Quillota",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2008,
    coordinates: [-71.2536, -32.8849],
    category: "Trabajos",
    lema: "Hacer las cosas ordinarias con un amor extraordinario",
    tags: ["Valparaíso", "Otoño"],
  },
  {
    id: "llanquihue-2009",
    name: "Llanquihue",
    region: "Región de Los Lagos",
    regionCode: "Los Lagos",
    year: 2009,
    coordinates: [-73.0245, -41.2518],
    category: "Trabajos",
    lema: "Vive para Servir: El Servicio es Amor en Acción",
    tags: ["Los Lagos", "Verano"],
  },
  {
    id: "rancagua-2009",
    name: "Rancagua",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2009,
    coordinates: [-70.7310, -34.1732],
    category: "Trabajos",
    lema: "En tus manos está actuar, en tus corazón las ansias de servir",
    tags: ["O'Higgins", "Otoño"],
  },
  {
    id: "panguipulli-2010",
    name: "Panguipulli",
    region: "Región de Los Ríos",
    regionCode: "Los Ríos",
    year: 2010,
    coordinates: [-72.3276, -39.6443],
    category: "Trabajos",
    lema: "Hagamos de nuestras posibilidades las oportunidades de otros",
    tags: ["Los Ríos", "Verano"],
  },
  {
    id: "buin-2010",
    name: "Buin",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2010,
    coordinates: [-70.7464, -33.7303],
    category: "Trabajos",
    lema: "Construyendo espíritus, para volver a soñar",
    tags: ["Metropolitana", "Otoño"],
  },
  {
    id: "futrono-2011",
    name: "Futrono",
    region: "Región de Los Ríos",
    regionCode: "Los Ríos",
    year: 2011,
    coordinates: [-72.3806, -40.1295],
    category: "Trabajos",
    lema: "En tus palabras está alegrar y en tu entregar poder transformar",
    tags: ["Los Ríos", "Verano"],
  },
  {
    id: "lampa-2011",
    name: "Lampa",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2011,
    coordinates: [-70.8720, -33.2883],
    category: "Trabajos",
    lema: "Trabajar es servir, servir es vivir y vivir es amar",
    tags: ["Metropolitana", "Otoño"],
  },
  {
    id: "sagrada-familia-2021",
    name: "Sagrada Familia",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2021,
    coordinates: [-71.4083, -35.0400],
    category: "Trabajos",
    lema: "Que en tu sonrisa se dibuje la alegría de servir",
    // El mapa indica año 2021; el archivo de lemas registra "Verano 2012"
    // para Sagrada Familia. Discrepancia sin resolver, queda marcada.
    tags: ["Maule", "revisar-año"],
  },
  {
    id: "mataquito-2012",
    name: "Mataquito",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2012,
    coordinates: [-72.0000, -34.9830],
    category: "Trabajos",
    lema: "Que en tu sonrisa se dibuje la alegría de servir",
    // Nota: el lema de "Otoño 2012" en el archivo corresponde a Mataquito;
    // el de "Verano 2012" corresponde a Sagrada Familia (ver arriba).
    // El sector de Mataquito (cerca del río del mismo nombre) pertenece a
    // la comuna de Licantén; se usaron las coordenadas del centro de
    // Licantén como referencia más cercana al sector real.
    tags: ["Maule", "Otoño"],
  },
  {
    id: "rauco-hualane-2013",
    name: "Rauco - Hualañé",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2013,
    coordinates: [-71.3878, -34.9299],
    category: "Trabajos",
    lema: "Que servicio despierte tu voluntad de actuar",
    tags: ["Maule", "Verano"],
  },
  {
    id: "pichidegua-2013",
    name: "Pichidegua",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2013,
    coordinates: [-71.3020, -34.3693],
    category: "Trabajos",
    lema: "A veces basta un simple gesto para despertar un sueño",
    tags: ["O'Higgins", "Otoño"],
  },
  {
    id: "san-fabian-de-alico-2014",
    name: "San Fabián de Alico",
    region: "Región de Ñuble",
    regionCode: "Ñuble",
    year: 2014,
    coordinates: [-71.4820, -36.5657],
    category: "Trabajos",
    lema: "Entreguémonos por completo para alcanzar un sueño",
    tags: ["Ñuble", "Verano"],
  },
  {
    id: "san-jose-de-maipo-2014",
    name: "San José de Maipo",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2014,
    coordinates: [-70.3314, -33.6404],
    category: "Trabajos",
    lema: "Despertemos en comunidad nuestra inquietud de servir",
    tags: ["Metropolitana", "Otoño"],
  },
  {
    id: "coihueco-2015",
    name: "Coihueco",
    region: "Región de Ñuble",
    regionCode: "Ñuble",
    year: 2015,
    coordinates: [-71.7899, -36.6849],
    category: "Trabajos",
    lema: "Que el servicio del día a día transforme nuestros sueños en sonrisas",
    tags: ["Ñuble", "Verano"],
  },
  {
    id: "san-esteban-2015",
    name: "San Esteban",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2015,
    coordinates: [-70.5808, -32.8050],
    category: "Trabajos",
    lema: "Que nuestras acciones llenen corazones",
    tags: ["Valparaíso", "Otoño"],
  },
  {
    id: "longavi-2016",
    name: "Longaví",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2016,
    coordinates: [-71.6977, -35.9783],
    category: "Trabajos",
    lema: "Permítete ser feliz haciendo felices a los demás",
    tags: ["Maule", "Verano"],
  },
  {
    id: "til-til-2016",
    name: "Til Til",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2016,
    coordinates: [-70.9243, -33.0806],
    category: "Trabajos",
    lema: "Que la alegría en tu entrega refleje el sueño de un cambio",
    tags: ["Metropolitana", "Invierno"],
  },
  {
    id: "retiro-2017",
    name: "Retiro",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2017,
    coordinates: [-71.7794, -36.0426],
    category: "Trabajos",
    lema: "Comprométete a servir en aquello que te apasiona",
    tags: ["Maule", "Verano"],
  },
  {
    id: "lolol-2017",
    name: "Lolol",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2017,
    coordinates: [-71.5889, -34.7361],
    category: "Trabajos",
    lema: "Construyamos lazos para dejar como huella una sonrisa",
    tags: ["O'Higgins", "Invierno"],
  },
  {
    id: "curepto-2018",
    name: "Curepto",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2018,
    coordinates: [-71.9943, -35.1066],
    category: "Trabajos",
    lema: "Vivamos sembrando amor desde lo sencillo",
    tags: ["Maule", "Verano"],
  },
  {
    id: "catemu-2018",
    name: "Catemu",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2018,
    coordinates: [-70.9572, -32.7704],
    category: "Trabajos",
    lema: "Impulsemos sus sueños compartiendo en comunidad",
    tags: ["Valparaíso", "Invierno"],
  },
  {
    id: "el-carmen-2019",
    name: "El Carmen",
    region: "Región de Ñuble",
    regionCode: "Ñuble",
    year: 2019,
    coordinates: [-71.7692, -37.6982],
    category: "Trabajos",
    lema: "Empapémonos de servicio y alegría, para darle sentido a nuestra vida",
    tags: ["Ñuble", "Verano"],
  },
  {
    id: "villa-alegre-2020",
    name: "Villa Alegre",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2020,
    coordinates: [-71.7419, -35.6650],
    category: "Trabajos",
    lema: "Vivamos contagiando felicidad, siendo auténticos con los demás",
    tags: ["Maule", "Verano"],
  },
  {
    id: "el-monte-2021",
    name: "El Monte",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2021,
    coordinates: [-71.0118, -33.6936],
    category: "Trabajos",
    lema: "Actuemos en comunidad despertando las ganas de entregar",
    tags: ["Metropolitana", "Verano"],
  },
  {
    id: "rio-claro-2022",
    name: "Rio Claro",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2022,
    coordinates: [-71.2885, -35.2458],
    category: "Trabajos",
    lema: "Fortalezcamos nuestros lazos potenciando la vida en comunidad",
    tags: ["Maule", "Verano"],
  },
  {
    id: "chepica-2022",
    name: "Chepica",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2022,
    coordinates: [-71.2828, -34.7328],
    category: "Trabajos",
    lema: "Entreguemos lo mejor de nosotros para convertirnos en motor de cambio",
    tags: ["O'Higgins", "Invierno"],
  },
  {
    id: "malloa-2023",
    name: "Malloa",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2023,
    coordinates: [-70.9271, -34.4487],
    category: "Trabajos",
    lema: "Valoremos el poder que tienen nuestros lazos para crecer con alegría en comunidad",
    tags: ["O'Higgins", "Verano"],
  },
  {
    id: "hijuelas-2023",
    name: "Hijuelas",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2023,
    coordinates: [-71.1259, -32.8213],
    category: "Trabajos",
    lema: "Con nuestros pasos constantes, hacemos un cambio importante",
    tags: ["Valparaíso", "Invierno"],
  },
  {
    id: "romeral-2024",
    name: "Romeral",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2024,
    coordinates: [-71.0961, -34.9631],
    category: "Trabajos",
    lema: "Fomentemos el servicio y la alegría, estando siempre en sintonía",
    tags: ["Maule", "Verano"],
  },
  {
    id: "coltauco-2025",
    name: "Coltauco",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2025,
    coordinates: [-71.0988, -34.3107],
    category: "Trabajos",
    // Sin lema registrado: el archivo de lemas termina en Romeral 2024.
    tags: ["O'Higgins"],
  },
  {
    id: "empedrado-2026",
    name: "Empedrado",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2026,
    coordinates: [-72.2742, -35.6342],
    category: "Trabajos",
    // Sin lema registrado: el archivo de lemas termina en Romeral 2024.
    tags: ["Maule"],
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