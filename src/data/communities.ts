// ============================================================
// 🗺 COMUNIDADES PROYECTA — Datos de intervención
// ============================================================
// Fuente: mapa "Lemas y lugares" (operaciones de Trabajos, 2006-2026)
// y "Versiones y contactos Proyecta UC" (planilla con jefes generales
// por operación, la misma fuente que el mapa de "archivo de lemas
// históricos" citado más abajo — confirma y en dos casos corrige lo que
// había).
//
// IMPORTANTE — lo que falta y lo que se eliminó:
// - La categoría ahora es la temporada real de cada operación (Verano /
//   Otoño / Invierno), tomada de la planilla de versiones. Antes el
//   campo `category` estaba fijo en "Trabajos" para las 36 entradas
//   reales (con "Operaciones"/"Intervenciones"/"Operativos" como tipos
//   sin datos) — la temporada ya vivía parcialmente en `tags`, pero no
//   como campo propio ni con color en el mapa.
// - `jefesGenerales`: nombres (sin correo ni teléfono — esos datos son
//   personales y están en la planilla interna, no en el sitio público)
//   de quienes lideraron cada operación, según la planilla. No hay
//   coincidencia en la planilla para "María Pinto, 2007" (ver nota en
//   esa entrada), así que ese campo queda sin dato ahí.
// - Se eliminan los campos que no existen como información real:
//   whatWasBuilt, summary y metrics no se completan con contenido
//   inventado. Se deja "lema" (el dato real que sí tenemos) y se
//   quitan metrics hasta tener material real que cargar.
// - Coordenadas: corresponden al centro de la comuna (no del caserío
//   específico), verificadas contra fuentes geográficas de comunas de
//   Chile. Donde el lugar del mapa junta dos comunas (ej. "Cunco -
//   Melipeuco"), se usaron las coordenadas de la primera nombrada.
// - Corrección (antes marcada "revisar-año", ahora resuelta): el mapa
//   marcaba "Sagrada Familia, 2021", pero tanto el archivo de lemas
//   como la planilla de versiones registran "Verano 2012 — Sagrada
//   Familia", con jefes generales asociados a ese año. Además, el lema
//   que estaba puesto para esta entrada ("Que en tu sonrisa...") es en
//   realidad el de Mataquito (Otoño 2012) — quedó duplicado por error.
//   Se corrige año, id y lema usando la planilla como fuente.
// - "Coltauco, 2025" y "Empedrado, 2026" no tenían lema porque el
//   archivo de lemas anterior terminaba en Romeral 2024. La planilla de
//   versiones sí llega hasta 2027 y trae ambos lemas — se completan
//   desde ahí.
// - "María Pinto, 2007" sigue sin lema (no está en ninguna de las dos
//   fuentes para ese lugar/año) y ahora tampoco tiene una temporada
//   confirmada: la planilla solo registra dos operaciones en 2007
//   (Verano en Chiloé, Otoño en Los Rulos/Chorombo — un lugar distinto,
//   sin entrada propia todavía en este mapa). Se asigna "Otoño" por
//   descarte (es la única temporada de 2007 sin otra entrada asociada)
//   y se marca `revisar-temporada` para que el equipo lo confirme, en
//   vez de inventar certeza que no hay.
// ============================================================

export type Category = "Verano" | "Otoño" | "Invierno";

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
  category: Category; // Temporada real de la operación
  photos?: Photo[]; // Lista de URLs de fotos (cuando existan)
  construcciones?: string; // Lo que se construyó (cuando existe registro)
  lema?: string; // Lema de la operación (cuando existe registro)
  jefesGenerales?: string[]; // Nombres de quienes lideraron la operación
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
    category: "Verano",
    lema: "Construyendo desde adentro",
    jefesGenerales: ["Diego Ulloa", "Fernanda Cruz", "Gustavo Alcalde"],
    tags: ["Araucanía", "Verano"],
  },
  {
    id: "litueche-la-estrella-2006",
    name: "Litueche - La Estrella",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2006,
    coordinates: [-71.7278, -34.1189],
    category: "Otoño",
    lema: "Construyendo desde adentro",
    jefesGenerales: ["Guillermo Acuña", "Vero Guarda"],
    tags: ["O'Higgins", "Otoño"],
  },
  {
    id: "chiloe-2007",
    name: "Chiloé",
    region: "Región de Los Lagos",
    regionCode: "Los Lagos",
    year: 2007,
    coordinates: [-73.8166, -41.8791],
    category: "Verano",
    lema: "Que no se necesiten tus palabras, que baste con tu ejemplo",
    jefesGenerales: ["Jorge Ramírez", "Pau Toledo", "Jose Leniz"],
    tags: ["Los Lagos", "Verano"],
  },
  {
    id: "maria-pinto-2007",
    name: "María Pinto",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2007,
    coordinates: [-71.1342, -33.5327],
    // Sin coincidencia en la planilla de versiones para este lugar/año
    // (ver nota al inicio del archivo) — temporada asignada por
    // descarte, no confirmada.
    category: "Otoño",
    // Sin lema registrado en ninguna de las dos fuentes para esta fecha/lugar.
    tags: ["Metropolitana", "revisar-temporada"],
  },
  {
    id: "mariquina-lanco-2008",
    name: "Mariquina - Lanco",
    region: "Región de Los Ríos",
    regionCode: "Los Ríos",
    year: 2008,
    coordinates: [-73.0236, -39.5275],
    category: "Verano",
    lema: "No puedo parar de trabajar. Tendré toda la eternidad para descansar",
    jefesGenerales: ["Mercedes Rico", "Santiago Brunet", "Valentina Schwerter"],
    tags: ["Los Ríos", "Verano"],
  },
  {
    id: "quillota-2008",
    name: "Quillota",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2008,
    coordinates: [-71.2536, -32.8849],
    category: "Otoño",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Quillota 2008/Quillota 2008/18Ou6yyadPA7IBIG10u8HEat_TAJbvcQK.jpg`,
      },
    ],
    lema: "Hacer las cosas ordinarias con un amor extraordinario",
    jefesGenerales: ["Carlos Kulenkampff", "Alejandra Parragué", "Gustavo Oviedo"],
    tags: ["Valparaíso", "Otoño"],
  },
  {
    id: "llanquihue-2009",
    name: "Llanquihue",
    region: "Región de Los Lagos",
    regionCode: "Los Lagos",
    year: 2009,
    coordinates: [-73.0245, -41.2518],
    category: "Verano",
    photos: [
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Llanquihue 2009/Llanquihue 2009/Proyecta_2009_1.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Llanquihue 2009/Llanquihue 2009/Proyecta_2009_2.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Llanquihue 2009/Llanquihue 2009/Proyecta_2009_3.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Llanquihue 2009/Llanquihue 2009/Proyecta_2009_4.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Llanquihue 2009/Llanquihue 2009/Proyecta_2009_5.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Llanquihue 2009/Llanquihue 2009/Proyecta_2009_6.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Llanquihue 2009/Llanquihue 2009/Proyecta_2009_7.jpg` },
    ],
    lema: "Vive para Servir: El Servicio es Amor en Acción",
    jefesGenerales: ["Emilia Carrillo", "Jorge Budinich", "Carlos Feres"],
    tags: ["Los Lagos", "Verano"],
  },
  {
    id: "rancagua-2009",
    name: "Rancagua",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2009,
    coordinates: [-70.731, -34.1732],
    category: "Otoño",
    lema: "En tus manos está actuar, en tus corazón las ansias de servir",
    jefesGenerales: ["Nicole Avila", "Matias Navarro", "Manuel Salazar"],
    tags: ["O'Higgins", "Otoño"],
  },
  {
    id: "panguipulli-2010",
    name: "Panguipulli",
    region: "Región de Los Ríos",
    regionCode: "Los Ríos",
    year: 2010,
    coordinates: [-72.3276, -39.6443],
    category: "Verano",
    lema: "Hagamos de nuestras posibilidades las oportunidades de otros",
    jefesGenerales: ["Sole Ovalle", "Cris Torres", "German Rodriguez"],
    tags: ["Los Ríos", "Verano"],
  },
  {
    id: "buin-2010",
    name: "Buin",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2010,
    coordinates: [-70.7464, -33.7303],
    category: "Otoño",
    photos: [
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/Buin-Proyecta-Uc.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1181.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1187.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1226.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1256.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1341.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1368.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1499.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1508.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1522.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1680.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1681.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1702.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1721.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Buin 2010/Buin 2010/DSCF1731.jpg` },
    ],
    lema: "Construyendo espíritus, para volver a soñar",
    jefesGenerales: ["Maria Jose Urrutia", "Cristián Schalper", "Ignacio Ulloa"],
    tags: ["Metropolitana", "Otoño"],
  },
  {
    id: "futrono-2011",
    name: "Futrono",
    region: "Región de Los Ríos",
    regionCode: "Los Ríos",
    year: 2011,
    coordinates: [-72.3806, -40.1295],
    category: "Verano",
    lema: "En tus palabras está alegrar y en tu entregar poder transformar",
    jefesGenerales: ["Andrea Poblete", "Tomás Marza", "Eduardo Toro"],
    tags: ["Los Ríos", "Verano"],
  },
  {
    id: "lampa-2011",
    name: "Lampa",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2011,
    coordinates: [-70.872, -33.2883],
    category: "Otoño",
    photos: [
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Lampa 2011/Lampa 2011/IMG_1873.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Lampa 2011/Lampa 2011/IMG_1874.jpeg` },
    ],
    lema: "Trabajar es servir, servir es vivir y vivir es amar",
    jefesGenerales: ["Isidora Navarro", "Cristóbal Bisso", "José Francisco Guarda"],
    tags: ["Metropolitana", "Otoño"],
  },
  {
    id: "sagrada-familia-2012",
    name: "Sagrada Familia",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2012,
    coordinates: [-71.4083, -35.04],
    category: "Verano",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Sagrada familia 2012/Sagrada familia 2012/e3b32dc4-cb80-48d2-8297-c268abca09e8.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Sagrada familia 2012/Sagrada familia 2012/e87258bb-b717-4985-b051-8964dc59438a.jpg`,
      },
    ],
    // Antes decía "2021" con el lema de Mataquito (Otoño 2012) puesto
    // por error. Corregido con la planilla de versiones: es "Verano
    // 2012", con su propio lema.
    lema: "Que nuestra energía se haga entrega y nuestro cansancio recompensa",
    jefesGenerales: ["Natalia Bugedo", "Gabriel De la Maza", "Álvaro Leguía"],
    tags: ["Maule", "Verano"],
  },
  {
    id: "mataquito-2012",
    name: "Mataquito",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2012,
    coordinates: [-72.0, -34.983],
    category: "Otoño",
    lema: "Que en tu sonrisa se dibuje la alegría de servir",
    jefesGenerales: ["Luz María Vicuña", "Pablo Faundez", "Bernardo Stegmaier"],
    // Nota: el sector de Mataquito (cerca del río del mismo nombre)
    // pertenece a la comuna de Licantén; se usaron las coordenadas del
    // centro de Licantén como referencia más cercana al sector real.
    tags: ["Maule", "Otoño"],
  },
  {
    id: "rauco-hualane-2013",
    name: "Rauco - Hualañé",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2013,
    coordinates: [-71.3878, -34.9299],
    category: "Verano",
    lema: "Que servicio despierte tu voluntad de actuar",
    jefesGenerales: ["María Jesus Sepulveda", "Benjamin Maluenda", "Felipe Huerta"],
    tags: ["Maule", "Verano"],
  },
  {
    id: "pichidegua-2013",
    name: "Pichidegua",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2013,
    coordinates: [-71.302, -34.3693],
    category: "Otoño",
    photos: [
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Pichidegua 2013/Pichidegua 2013/471495595.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Pichidegua 2013/Pichidegua 2013/554782401.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Pichidegua 2013/Pichidegua 2013/557292092.jpg` },
    ],
    lema: "A veces basta un simple gesto para despertar un sueño",
    jefesGenerales: ["Josefa Lucas", "Felipe Ananias", "Gonzalo Carcamo"],
    tags: ["O'Higgins", "Otoño"],
  },
  {
    id: "san-fabian-de-alico-2014",
    name: "San Fabián de Alico",
    region: "Región de Ñuble",
    regionCode: "Ñuble",
    year: 2014,
    coordinates: [-71.482, -36.5657],
    category: "Verano",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/San fabián 2014/San fabián 2014/b82ef189-5240-4fc4-bc8c-c6cda5b0ae4c.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/San fabián 2014/San fabián 2014/bd13e9d8-5c48-4e3e-99a4-a3826f6b153c.jpg`,
      },
    ],
    lema: "Entreguémonos por completo para alcanzar un sueño",
    jefesGenerales: ["Claudia Aravena", "Rocio Gonzalez", "Jose Ignacio Alamos"],
    tags: ["Ñuble", "Verano"],
  },
  {
    id: "san-jose-de-maipo-2014",
    name: "San José de Maipo",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2014,
    coordinates: [-70.3314, -33.6404],
    category: "Otoño",
    lema: "Despertemos en comunidad nuestra inquietud de servir",
    jefesGenerales: ["Constanza Kappes", "Sebastian Herbach", "Raul Ponce"],
    tags: ["Metropolitana", "Otoño"],
  },
  {
    id: "coihueco-2015",
    name: "Coihueco",
    region: "Región de Ñuble",
    regionCode: "Ñuble",
    year: 2015,
    coordinates: [-71.7899, -36.6849],
    category: "Verano",
    lema: "Que el servicio del día a día transforme nuestros sueños en sonrisas",
    jefesGenerales: ["Gabriela Oviedo", "Sebastian Corthon", "Guillermo Moreno"],
    tags: ["Ñuble", "Verano"],
  },
  {
    id: "san-esteban-2015",
    name: "San Esteban",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2015,
    coordinates: [-70.5808, -32.805],
    category: "Otoño",
    photos: [],
    construcciones:
      "Mejoramiento de la plaza y construcción de juegos infantiles",
    lema: "Que nuestras acciones llenen corazones",
    jefesGenerales: ["Consuelo Gonzalez", "Carlos Barros", "José Pablo Montégu"],
    tags: ["Valparaíso", "Otoño"],
  },
  {
    id: "longavi-2016",
    name: "Longaví",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2016,
    coordinates: [-71.6977, -35.9783],
    category: "Verano",
    lema: "Permítete ser feliz haciendo felices a los demás",
    jefesGenerales: ["Paulina Matte", "Julian Espinoza", "Patricio Zavala"],
    tags: ["Maule", "Verano"],
  },
  {
    id: "til-til-2016",
    name: "Til Til",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2016,
    coordinates: [-70.9243, -33.0806],
    category: "Invierno",
    lema: "Que la alegría en tu entrega refleje el sueño de un cambio",
    jefesGenerales: ["Catalina Ortuzar", "Felipe Letelier", "Alexis Suarez"],
    tags: ["Metropolitana", "Invierno"],
  },
  {
    id: "retiro-2017",
    name: "Retiro",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2017,
    coordinates: [-71.7794, -36.0426],
    category: "Verano",
    photos: [
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_01.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_02.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_03.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_04.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_05.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_06.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_07.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_08.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_09.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_10.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_11.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_12.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_13.jpg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Retiro 2017/Retiro 2017/retiro_14.jpg` },
    ],
    lema: "Comprométete a servir en aquello que te apasiona",
    jefesGenerales: ["Alexandra Allel", "Francisca Giraldez", "Jorge Sepulveda"],
    tags: ["Maule", "Verano"],
  },
  {
    id: "lolol-2017",
    name: "Lolol",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2017,
    coordinates: [-71.5889, -34.7361],
    category: "Invierno",
    lema: "Construyamos lazos para dejar como huella una sonrisa",
    jefesGenerales: ["Vanessa Espinosa", "Constanza Gutierrez", "Eduardo Chomalí"],
    tags: ["O'Higgins", "Invierno"],
  },
  {
    id: "curepto-2018",
    name: "Curepto",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2018,
    coordinates: [-71.9943, -35.1066],
    category: "Verano",
    lema: "Vivamos sembrando amor desde lo sencillo",
    jefesGenerales: ["Rosario Veas", "Christian Escobar", "Felipe Morales"],
    tags: ["Maule", "Verano"],
  },
  {
    id: "catemu-2018",
    name: "Catemu",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2018,
    coordinates: [-70.9572, -32.7704],
    category: "Invierno",
    lema: "Impulsemos sus sueños compartiendo en comunidad",
    jefesGenerales: ["Igancio Soto", "Diego Carvajal", "Mariavictoria Enberg"],
    tags: ["Valparaíso", "Invierno"],
  },
  {
    id: "el-carmen-2019",
    name: "El Carmen",
    region: "Región de Ñuble",
    regionCode: "Ñuble",
    year: 2019,
    coordinates: [-71.7692, -37.6982],
    category: "Verano",
    photos: [
      { url: `${import.meta.env.BASE_URL}assets/comunidades/El Carmen 2019/El Carmen 2019/WA0052_1.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/El Carmen 2019/El Carmen 2019/WA0053_1.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/El Carmen 2019/El Carmen 2019/WA0053_2.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/El Carmen 2019/El Carmen 2019/WA0053_3.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/El Carmen 2019/El Carmen 2019/WA0053_4.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/El Carmen 2019/El Carmen 2019/WA0053_main.jpeg` },
    ],
    lema: "Empapémonos de servicio y alegría, para darle sentido a nuestra vida",
    jefesGenerales: ["Viviana Retamal", "Esperanza Rodríguez", "Claudio Scheihing"],
    tags: ["Ñuble", "Verano"],
  },
  {
    id: "villa-alegre-2020",
    name: "Villa Alegre",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2020,
    coordinates: [-71.7419, -35.665],
    category: "Verano",
    lema: "Vivamos contagiando felicidad, siendo auténticos con los demás",
    jefesGenerales: ["Maria Jose Chiu", "Pía López", "Felipe Poblete"],
    tags: ["Maule", "Verano"],
  },
  {
    id: "el-monte-2021",
    name: "El Monte",
    region: "Región Metropolitana",
    regionCode: "Metropolitana",
    year: 2021,
    coordinates: [-71.0118, -33.6936],
    category: "Verano",
    lema: "Actuemos en comunidad despertando las ganas de entregar",
    jefesGenerales: ["Verner Codoceo", "Catalina Galleguillos", "Catalina Navarrete"],
    tags: ["Metropolitana", "Verano"],
  },
  {
    id: "rio-claro-2022",
    name: "Rio Claro",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2022,
    coordinates: [-71.2885, -35.2458],
    category: "Verano",
    photos: [
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_01.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_02.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_03.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_04.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_05.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_06.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_07.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_08.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_09.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_10.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_11.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_12.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_13.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_14.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_15.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_16.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_17.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_18.jpeg` },
      { url: `${import.meta.env.BASE_URL}assets/comunidades/Rio Claro 2022/Rio Claro 2022/rc_19.jpeg` },
    ],
    lema: "Fortalezcamos nuestros lazos potenciando la vida en comunidad",
    jefesGenerales: ["Matías Navarrete", "Fernanda Goldfarb", "Javiera Cavassa"],
    tags: ["Maule", "Verano"],
  },
  {
    id: "chepica-2022",
    name: "Chepica",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2022,
    coordinates: [-71.2828, -34.7328],
    category: "Invierno",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Chepica 2022/Chepica 2022/1e202623-c13e-48cb-8796-f31aa4a2d92a.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Chepica 2022/Chepica 2022/9b37ce09-950d-4ef1-9049-9e09b56b4c4e.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Chepica 2022/Chepica 2022/763c9101-d4a1-4b67-8404-d815a766bfd3.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Chepica 2022/Chepica 2022/32832828-3654-4f69-85ef-3afa25c867fc.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Chepica 2022/Chepica 2022/66930929-af39-44bc-a59c-97cbb19f4ddc.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Chepica 2022/Chepica 2022/ade8696c-1390-4271-8791-e6e554d8e613.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Chepica 2022/Chepica 2022/deea6f9e-b91a-4748-9bbd-d92f0b6e5ebe.jpg`,
      },
    ],
    lema: "Entreguemos lo mejor de nosotros para convertirnos en motor de cambio",
    jefesGenerales: ["Tomás Figueroa", "Michelle Madrid", "Sofía Moreno"],
    tags: ["O'Higgins", "Invierno"],
  },
  {
    id: "malloa-2023",
    name: "Malloa",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2023,
    coordinates: [-70.9271, -34.4487],
    category: "Verano",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Malloa 2023/Malloa 2023/08d7b175-cdb4-4e3a-86c6-de3f43a407fa.jpg`,
      },
    ],
    lema: "Valoremos el poder que tienen nuestros lazos para crecer con alegría en comunidad",
    jefesGenerales: ["Marcela Céspedes", "Gabriela Sepúlveda", "Alejandra Uribe"],
    tags: ["O'Higgins", "Verano"],
  },
  {
    id: "hijuelas-2023",
    name: "Hijuelas",
    region: "Región de Valparaíso",
    regionCode: "Valparaíso",
    year: 2023,
    coordinates: [-71.1259, -32.8213],
    category: "Invierno",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Hijuelas 2023/Hijuelas 2023/0b832430-a72c-4c7a-9a74-aa6422fbb955.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Hijuelas 2023/Hijuelas 2023/b458b94f-c4e9-41fd-a056-11ba2bf83171.jpg`,
      },
    ],
    lema: "Con nuestros pasos constantes, hacemos un cambio importante",
    jefesGenerales: ["Florencia Prochelle", "Valentina Romo", "Tamara Ubilla"],
    tags: ["Valparaíso", "Invierno"],
  },
  {
    id: "romeral-2024",
    name: "Romeral",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2024,
    coordinates: [-71.0961, -34.9631],
    category: "Verano",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Romeral 2024/Romeral 2024/e24ace71-0f90-4341-97ca-5a08dfdb19af.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Romeral 2024/Romeral 2024/f4f3a888-91e0-4598-96c7-24f86d5e76df.jpg`,
      },
    ],
    lema: "Fomentemos el servicio y la alegría, estando siempre en sintonía",
    jefesGenerales: ["José Toro", "Dámaris Palomera", "Sofía Olmedo"],
    tags: ["Maule", "Verano"],
  },
  {
    id: "coltauco-2025",
    name: "Coltauco",
    region: "Región del Libertador General Bernardo O'Higgins",
    regionCode: "O'Higgins",
    year: 2025,
    coordinates: [-71.0988, -34.3107],
    category: "Verano",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Coltauco 2025/Coltauco 2025/fbf4528c-1ed8-48c9-b961-4b68fb8801a4.jpg`,
      },
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Coltauco 2025/Coltauco 2025/ff6e5ef6-f2a8-4883-af4c-6a016b66f310.jpg`,
      },
    ],
    // Lema completado desde la planilla de versiones (el archivo de
    // lemas anterior no llegaba hasta acá).
    lema: "Juntos construimos comunidad",
    jefesGenerales: ["Ignacia Pizarro", "Ignacio Neira", "Tomás Vargas"],
    tags: ["O'Higgins", "Verano"],
  },
  {
    id: "empedrado-2026",
    name: "Empedrado",
    region: "Región del Maule",
    regionCode: "Maule",
    year: 2026,
    coordinates: [-72.2742, -35.6342],
    category: "Verano",
    photos: [
      {
        url: `${import.meta.env.BASE_URL}assets/comunidades/Empedrado 2026/Empedrado 2026/6131ac78-0af6-4cfc-ac7b-1cb161b6b0e9.jpg`,
      },
    ],
    // Lema completado desde la planilla de versiones (el archivo de
    // lemas anterior no llegaba hasta acá).
    lema: "Construimos en equipo lo que soñamos desde el servicio",
    jefesGenerales: ["Daniel Pino", "Rocío Peñailillo", "Valentina Galleguillos"],
    tags: ["Maule", "Verano"],
  },
];

// ============================================================
// HELPERS
// ============================================================
export const categoryColors: Record<Category, string> = {
  Verano: "#FFBB00", // amarillo — sol
  Otoño: "#F57C00", // naranjo — hojas de otoño
  Invierno: "#40D0F0", // celeste — frío
};

export const categoryLabels: Record<Category, string> = {
  Verano: "Verano",
  Otoño: "Otoño",
  Invierno: "Invierno",
};
