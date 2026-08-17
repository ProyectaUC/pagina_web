// ============================================================
// 🎨 PROYECTA BRAND TOKENS
// ============================================================
// IMPORTAMOS LOS ÍCONOS DIRECTO DESDE LUCIDE-REACT
import { Calendar, MapPin, Building, Shovel } from "lucide-react";

export const colors = {
  navy: "#1B3A4B",
  darkTeal: "#1B5E7A",
  teal: "#1B9AB5",
  sky: "#29B6D8",
  cyan: "#40D0F0",
  yellow: "#FFBB00",
  orange: "#F57C00",
  white: "#FFFFFF",
  lightBg: "#F0FAFF",
};

export const fonts = {
  display: '"Permanent Marker", cursive',
  sans: '"Nunito", sans-serif',
  mono: '"JetBrains Mono", monospace',
};

// -----------------------------------------------------------
// ASSETS DE BRANDING (¡Corregidos con la base de Vite!)
// -----------------------------------------------------------
const base = import.meta.env.BASE_URL;

export const assets = {
  logo: `${base}assets/logos/logo.png`,
  favicon: `${base}assets/logos/favicon.png`,
};

export const content = {
  org: {
    name: "Proyecta",
    fullName: "Proyecta CAI",
    tagline: "Construyendo comunidad desde la acción",
    description:
      "Voluntariado comprometido con el fortalecimiento de comunidades rurales de nuestro país. Trabajamos junto a vecinos y vecinas para promover el tejido social mediante la recuperación de espacios y talleres comunitarios.",
    email: "Redesycontactos@trabajosproyecta.cl",
    phone: "+56 9 3395 6752",
    address: "Macul, Santiago, Chile",
  },
  social: {
    instagram: "https://www.instagram.com/proyectauc/",
    linkedin: "https://www.linkedin.com/company/proyecta-uc/",
  },
};

// -----------------------------------------------------------
// ESTADÍSTICAS DE IMPACTO
// ¡Ahora los íconos son componentes (sin comillas y con mayúscula)!
// -----------------------------------------------------------
export const impactStats = [
  {
    value: 21,
    suffix: "",
    label: "Años de trayectoria",
    Icon: Calendar, // Componente real
    color: colors.cyan,
    bg: "from-proyecta-cyan/20 to-proyecta-sky/10",
  },
  {
    value: 300,
    suffix: "+",
    label: "Comunidades intervenidas",
    Icon: MapPin, // Componente real
    color: colors.yellow,
    bg: "from-proyecta-yellow/20 to-proyecta-orange/10",
  },
  {
    value: 45,
    suffix: "+",
    label: "Comunas impactadas",
    Icon: Building, // Componente real
    color: colors.teal,
    bg: "from-proyecta-teal/20 to-proyecta-navy/10",
  },
  {
    value: 37,
    suffix: "",
    label: "Trabajos realizados",
    Icon: Shovel, // Componente real
    color: colors.orange,
    bg: "from-proyecta-orange/20 to-proyecta-yellow/10",
  },
];

export default {
  colors,
  fonts,
  assets,
  content,
  impactStats,
};
