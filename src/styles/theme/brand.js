// ============================================================
// 🎨 PROYECTA BRAND TOKENS
// Archivo central de identidad visual.
// ¡AQUÍ es donde reemplazas colores, fuentes y assets de Figma!
// ============================================================

// -----------------------------------------------------------
// COLORES OFICIALES
// Cuando lleguen los assets de Figma, actualiza SOLO estos valores.
// Todos los componentes los importan desde aquí.
// -----------------------------------------------------------
export const colors = {
  navy: "#1B3A4B", // Fondo oscuro principal
  darkTeal: "#1B5E7A", // Teal oscuro
  teal: "#1B9AB5", // Teal medio
  sky: "#29B6D8", // Azul cielo
  cyan: "#40D0F0", // Cian principal (color signature)
  yellow: "#FFBB00", // Amarillo acento
  orange: "#F57C00", // Naranja acento
  white: "#FFFFFF",
  lightBg: "#F0FAFF", // Fondo secciones claras
};

// -----------------------------------------------------------
// TIPOGRAFÍAS
// Cambia los nombres si Figma usa otras fuentes.
// -----------------------------------------------------------
export const fonts = {
  display: '"Permanent Marker", cursive', // Títulos (estilo marcador)
  sans: '"Nunito", sans-serif', // Cuerpo y subtítulos
  mono: '"JetBrains Mono", monospace', // Datos y código
};

// -----------------------------------------------------------
// ASSETS DE BRANDING
// Reemplaza rutas cuando lleguen SVGs de Figma.
// -----------------------------------------------------------
export const assets = {
  // Logo principal
  logo: "/assets/logos/logo.png",
  logoWhite: "/assets/logos/logo-white.svg", // 🔄 Reemplazar con SVG de Figma
  logoMono: "/assets/logos/logo-mono.svg", // 🔄 Reemplazar con SVG de Figma
  favicon: "/assets/logos/favicon.svg", // 🔄 Reemplazar con SVG de Figma

  // Íconos (reemplazar con set oficial de Figma)
  icons: {
    mission: "/assets/icons/mission.svg",
    vision: "/assets/icons/vision.svg",
    values: "/assets/icons/values.svg",
    volunteers: "/assets/icons/volunteers.svg",
    donations: "/assets/icons/donations.svg",
  },

  // Ilustraciones hero y secciones
  illustrations: {
    hero: "/assets/illustrations/hero.svg", // 🔄 Reemplazar con ilustración de Figma
    impact: "/assets/illustrations/impact.svg",
    community: "/assets/illustrations/community.svg",
  },
};

// -----------------------------------------------------------
// GRADIENTES PRINCIPALES
// -----------------------------------------------------------
export const gradients = {
  hero: "linear-gradient(160deg, #1B3A4B 0%, #1B5E7A 60%, #1B9AB5 100%)",
  brand: "linear-gradient(135deg, #1B3A4B 0%, #1B9AB5 50%, #40D0F0 100%)",
  accent: "linear-gradient(90deg, #FFBB00 0%, #F57C00 100%)",
  card: "linear-gradient(135deg, #1B5E7A 0%, #1B9AB5 100%)",
};

// -----------------------------------------------------------
// CONTENIDO — Textos de la organización
// Centralizado aquí para fácil actualización.
// -----------------------------------------------------------
export const content = {
  org: {
    name: "Proyecta",
    fullName: "Proyecta CAI",
    tagline: "Construyendo comunidad desde la acción",
    description:
      "Voluntariado comprometido con el desarrollo comunitario, la educación y el bienestar social en Chile.",
    email: "contacto@proyecta.cai.cl",
    phone: "+56 9 XXXX XXXX",
    address: "Santiago, Chile",
  },
  social: {
    instagram: "https://instagram.com/proyectacai",
    facebook: "https://facebook.com/proyectacai",
    twitter: "https://twitter.com/proyectacai",
    linkedin: "https://linkedin.com/company/proyectacai",
    youtube: "https://youtube.com/@proyectacai",
  },
};

// -----------------------------------------------------------
// ESTADÍSTICAS DE IMPACTO (dummy data — actualizar con reales)
// -----------------------------------------------------------
export const impactStats = [
  {
    value: 1200,
    suffix: "+",
    label: "Personas ayudadas",
    icon: "Heart",
    color: colors.cyan,
  },
  {
    value: 48,
    suffix: "",
    label: "Operativos realizados",
    icon: "Shovel",
    color: colors.yellow,
  },
  {
    value: 320,
    suffix: "+",
    label: "Voluntarios activos",
    icon: "Users",
    color: colors.teal,
  },
  {
    value: 15,
    suffix: "M",
    label: "Fondos recaudados (CLP)",
    icon: "TrendingUp",
    color: colors.orange,
  },
  {
    value: 12,
    suffix: "",
    label: "Comunidades alcanzadas",
    icon: "MapPin",
    color: colors.sky,
  },
];

// -----------------------------------------------------------
// SPONSORS PLACEHOLDER
// -----------------------------------------------------------
export const sponsors = [
  { name: "Empresa A", logo: null },
  { name: "Empresa B", logo: null },
  { name: "Empresa C", logo: null },
  { name: "Empresa D", logo: null },
  { name: "Empresa E", logo: null },
  { name: "Empresa F", logo: null },
];

export default {
  colors,
  fonts,
  assets,
  gradients,
  content,
  impactStats,
  sponsors,
};
