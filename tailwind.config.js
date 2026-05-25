/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 🎨 DARK MODE: cambia a 'class' para dark mode manual con toggle
  darkMode: 'class',
  theme: {
    extend: {
      // =========================================================
      // 🎨 PALETA OFICIAL PROYECTA
      // Reemplaza estos valores con los colores exactos de Figma
      // =========================================================
      colors: {
        proyecta: {
          navy:       '#1B3A4B',   // Azul oscuro profundo
          'dark-teal':'#1B5E7A',   // Teal oscuro
          teal:       '#1B9AB5',   // Teal medio
          sky:        '#29B6D8',   // Azul cielo
          cyan:       '#40D0F0',   // Cian vibrante (color principal)
          yellow:     '#FFBB00',   // Amarillo acento
          orange:     '#F57C00',   // Naranja acento
          white:      '#FFFFFF',
          'light-bg': '#F0FAFF',   // Fondo claro
        }
      },
      // =========================================================
      // 🔤 TIPOGRAFÍA OFICIAL PROYECTA
      // Reemplaza los nombres con las fuentes exactas de Figma
      // =========================================================
      fontFamily: {
        // Fuente para títulos (estilo marcador/handwritten del brand)
        display:  ['"Permanent Marker"', 'cursive'],
        // Fuente para subtítulos y cuerpo (limpia y moderna)
        sans:     ['"Nunito"', 'sans-serif'],
        // Fuente alternativa para datos/números
        mono:     ['"JetBrains Mono"', 'monospace'],
      },
      // =========================================================
      // ✨ ANIMACIONES PERSONALIZADAS
      // =========================================================
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-right': {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'fade-in':    'fade-in 0.5s ease-out forwards',
        'scale-in':   'scale-in 0.5s ease-out forwards',
        'slide-right':'slide-right 0.6s ease-out forwards',
        'float':      'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
      },
      // =========================================================
      // 📐 ESPACIADOS Y SOMBRAS EXTRA
      // =========================================================
      backgroundImage: {
        'gradient-proyecta': 'linear-gradient(135deg, #1B3A4B 0%, #1B9AB5 50%, #40D0F0 100%)',
        'gradient-hero':     'linear-gradient(160deg, #1B3A4B 0%, #1B5E7A 60%, #1B9AB5 100%)',
        'gradient-card':     'linear-gradient(135deg, #1B5E7A 0%, #1B9AB5 100%)',
        'gradient-accent':   'linear-gradient(90deg, #FFBB00 0%, #F57C00 100%)',
      },
      boxShadow: {
        'proyecta':    '0 8px 32px rgba(27, 154, 181, 0.25)',
        'proyecta-lg': '0 16px 48px rgba(27, 154, 181, 0.35)',
        'card':        '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-hover':  '0 12px 40px rgba(27, 154, 181, 0.2)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
