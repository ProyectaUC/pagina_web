# Proyecta CAI — Sitio Web Oficial

Portafolio institucional del voluntariado **Proyecta**, desplegado en [proyecta.cai.cl](https://proyecta.cai.cl).

Es una SPA (sin SSR) construida con React + Vite + Tailwind. Este README está pensado para que
cualquier voluntario que se sume al equipo pueda levantar el proyecto y entender la estructura sin
tener que redescubrirlo desde cero — el equipo rota cada año, así que mantenlo al día si algo cambia.

## Stack

- **React 18** (function components + hooks), **React Router v6** para el ruteo de la SPA.
- **Vite 5** como build tool y dev server.
- **Tailwind CSS 3** para estilos, con tokens de marca en `tailwind.config.js` y `src/styles/theme/brand.js`.
- **TypeScript parcial**: los datos (`src/data/*.ts`) y los componentes del mapa (`src/components/map/*.tsx`)
  están tipados; el resto del árbol de componentes usa `.jsx`. Es la convención actual del proyecto — no
  hay una razón técnica para no migrar el resto, solo que no se ha hecho.
- **react-simple-maps** + **framer-motion** para el mapa interactivo de `/trabajos` (cargados solo en esa
  ruta vía `React.lazy`, ver `src/App.jsx`).
- **ESLint 9** (flat config) + **Prettier** para lint y formato.
- Deploy a **GitHub Pages** vía `gh-pages`.

## Requisitos

- Node.js 18 o superior.

## Empezar a desarrollar

```bash
npm install
npm run dev
```

Levanta el servidor de desarrollo en `http://localhost:5173`.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot reload. |
| `npm run build` | Build de producción en `dist/`. |
| `npm run preview` | Sirve el build de `dist/` localmente, para probar antes de deployar. |
| `npm run lint` | ESLint sobre todo el proyecto. |
| `npm run format` | Prettier — reescribe archivos con el formato del proyecto. |
| `npm run typecheck` | `tsc --noEmit` — valida los archivos `.ts`/`.tsx`. |
| `npm run deploy` | Build + publica `dist/` a GitHub Pages (rama `gh-pages`). |

Antes de abrir un PR, corre `npm run lint`, `npm run typecheck` y `npm run build` — el workflow de CI
(`.github/workflows/ci.yml`) corre lo mismo automáticamente en cada PR contra `main`.

## Estructura del proyecto

```
src/
├── App.jsx              Layout + definición de rutas (con code splitting por ruta)
├── main.jsx             Punto de entrada
├── components/          Componentes de sección (uno por bloque de una página)
│   ├── ui/               Componentes reutilizables: Button, SectionHeader, AnimateOnScroll, Logo...
│   └── map/               InteractiveChileMap y CommunityModal (los únicos .tsx fuera de data/)
├── pages/                Un wrapper por ruta (la lógica real vive en components/)
├── data/                 Contenido estructurado: comunidades del mapa, equipo, donaciones, sponsors
├── hooks/                useAnimations (scroll-reveal, dark mode, contador), usePageMeta (SEO por ruta)
└── styles/theme/brand.js  Tokens de contenido/marca (textos, contacto, redes, stats de impacto)
```

**Convención de datos vs. componentes**: el contenido que cambia con frecuencia (equipo, comunidades,
montos de donación, sponsors) vive en `src/data/*.ts`, no hardcodeado dentro del componente. Si necesitas
actualizar el equipo del próximo año o agregar un trabajo al mapa, el cambio es en `src/data/`, no en JSX.

## El mapa de Trabajos

`src/data/communities.ts` es el archivo de datos más importante del repo: cada entrada representa una
intervención real de Proyecta. Léelo antes de tocarlo — tiene comentarios explícitos sobre qué datos son
inciertos o discrepantes entre fuentes, y por qué se dejaron así en vez de inventar un valor. Sigue esa
misma disciplina al agregar entradas nuevas: si no tienes un dato confirmado, déjalo `undefined` en vez de
adivinar.

Las fotos de cada comunidad viven en `public/assets/comunidades/<Nombre Año>/`, un nivel plano (sin
carpetas repetidas), referenciadas desde `communities.ts`.

## Deploy

`npm run deploy` hace build y publica `dist/` a la rama `gh-pages` del repo, que GitHub Pages sirve en
[proyecta.cai.cl](https://proyecta.cai.cl) (dominio configurado vía `public/CNAME`). El truco de
`404.html` + el script inline en `index.html` es lo que permite que las rutas de React Router funcionen
en GitHub Pages (que no soporta rutas del lado del servidor de forma nativa) — no lo elimines aunque
parezca código muerto.
