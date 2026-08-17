# Auditoría técnica y de diseño — Proyecta CAI

**Fecha:** 16 de agosto de 2026
**Repositorio:** ProyectaUC/pagina_web · rama `main` (commit `8466a46`)
**Alcance:** arquitectura, código, UX/UI, sistema de diseño, performance, accesibilidad, SEO, responsive, robustez.

> **Nota de método:** todo lo marcado como *verificado* fue comprobado ejecutando el sitio en el navegador o inspeccionando el código, no inferido. Donde no pude verificar algo, lo digo explícitamente.

---

## 0. Resumen ejecutivo

Proyecta tiene una base **mejor de lo que sugiere su código**: la identidad visual es sólida, las fotos son excelentes, el contenido es real y el mapa interactivo es un diferenciador genuino. El problema no es el concepto, es la **ejecución acumulada por capas**: se nota que distintas partes se escribieron en momentos distintos sin una visión unificada, y quedaron restos de cada iteración.

Los tres hallazgos más serios:

1. **Dos links del footer llevan a una página completamente en blanco** (sin navbar ni footer). El usuario queda atrapado sin forma de volver. *Verificado.*
2. **Las tarjetas de Misión y Visión son invisibles en modo claro** — usan blanco al 10% sobre fondo blanco. *Verificado.*
3. **La animación principal de la portada no existe** — se invoca un keyframe (`kenburns`) que nunca fue definido, así que la foto simplemente no se mueve. *Verificado.*

Ninguno de los tres es difícil de arreglar. Eso es una buena noticia: el proyecto está a **una semana de trabajo enfocado** de verse y comportarse como un producto profesional, sin necesidad de reescribirlo.

**Mi recomendación central:** no reescribir. Limpiar, consolidar y formalizar. Hay ~800 líneas de código muerto o duplicado que eliminar, y un sistema de diseño que ya existe *implícitamente* en `brand.js` + `tailwind.config.js` pero que nadie usa de forma consistente.

---

## 1. Comprensión del proyecto

### 1.1 Stack

| Capa | Tecnología | Observación |
|---|---|---|
| Framework | React 18.3 (SPA, sin SSR) | Adecuado para el caso |
| Build | Vite 5.3 | Bien configurado, con `manualChunks` |
| Routing | react-router-dom 6.26 | Sin ruta catch-all (ver #1) |
| Estilos | Tailwind 3.4 + CSS custom properties | Mezcla de tokens duplicados |
| Animación | framer-motion 12 (solo en el mapa) + CSS keyframes | Sobredimensionado para el uso actual |
| Mapa | react-simple-maps 3.0 + GeoJSON local | GeoJSON de 1.9 MB sin optimizar |
| Iconos | lucide-react | Uso consistente, bien |
| Deploy | GitHub Pages vía `gh-pages` + CNAME | Funciona; sin CI |
| Tipado | TypeScript parcial (3 archivos de 27) | Adopción a medias |

### 1.2 Arquitectura actual

```
src/
├── App.jsx              Layout + rutas (49 líneas)
├── main.jsx             Bootstrap
├── components/          12 componentes de sección, planos
│   └── map/             2 componentes del mapa (los únicos .tsx)
├── pages/               8 páginas, 6 de ellas son wrappers de 5 líneas
├── data/communities.ts  647 líneas de datos hardcodeados
├── hooks/               3 hooks propios
└── styles/theme/brand.js  Tokens de marca (parcialmente sin usar)
```

**Problema estructural:** `pages/` no aporta nada. Seis de las ocho páginas son literalmente `export default function XPage() { return <X /> }`. La lógica de página vive en `components/`, que además contiene los datos. La separación página/componente existe en la estructura de carpetas pero no en la realidad del código.

### 1.3 Propósito y público

Leyendo el contenido, el sitio intenta cumplir **cuatro objetivos que compiten entre sí**:

1. **Reclutar voluntarios** (estudiantes UC) → CTA: unirse al grupo de WhatsApp
2. **Captar donantes individuales** → CTA: Mercado Pago
3. **Captar sponsors empresariales** → CTA: correo
4. **Archivo institucional** (historia, equipo, mapa de trabajos)

Los cuatro están mezclados sin prioridad clara. El Hero dice "Conócenos" y "Apóyanos" — ninguno de los dos es el objetivo #1 si lo que más necesitan es voluntarios. **Un usuario nuevo no sabe qué se espera de él.**

Público objetivo real, en orden probable de valor:
- Estudiante UC que oyó de Proyecta y quiere postular → **necesita saber cuándo y cómo**
- Empresa evaluando auspicio → **necesita credibilidad y números**
- Ex voluntario / comunidad → **archivo y nostalgia**
- Vecino de comunidad intervenida → **poco considerado hoy**

---

## 2. Hallazgos críticos (verificados)

### 2.1 Rutas muertas en el footer → página en blanco

El footer enlaza a `/impacto` y `/contacto`. Ambas rutas están **comentadas** en `App.jsx` (líneas 7, 10, 45) y **no existe una ruta catch-all**.

Verificado en el navegador: al navegar a `/contacto`, no solo el contenido desaparece — el elemento `<main>` **no existe**. En react-router v6, si ninguna ruta hija coincide, el layout padre tampoco se monta. Resultado: **pantalla completamente blanca, sin navbar, sin footer, sin forma de volver.**

Esto es lo más grave del sitio. Un visitante que hace clic en "Contacto" (una acción totalmente esperable) queda en un callejón sin salida.

### 2.2 Tarjetas invisibles en modo claro

La clase `.glass` está definida como `bg-white/10 border-white/20`. En `/quienes-somos`, las tarjetas de **Misión** y **Visión** la usan sin ningún override, sobre un fondo `bg-white`.

Verificado: `backgroundColor: rgba(255,255,255,0.1)` y `borderColor: rgba(255,255,255,0.2)` sobre blanco puro. Las tarjetas son literalmente invisibles — el texto flota sin contenedor.

`.glass` fue diseñada para superponerse a fotos oscuras (donde funciona bien, como en el Hero). Usarla sobre fondos claros es un error de aplicación que se repitió al copiar el patrón entre secciones.

### 2.3 Animación de portada rota

`Hero.jsx:29` aplica `animate-[kenburns_20s_ease-in-out_infinite_alternate]`, pero **`kenburns` no está definido** en `tailwind.config.js`.

Verificado enumerando los `@keyframes` cargados en el navegador: existen `bounce`, `fade-in`, `fade-up`, `float`, `pulse`, `pulse-slow`. **`kenburns` no está.** La imagen principal del sitio queda estática con un `scale-105` fijo. El efecto más visible de la portada no funciona y falla en silencio.

---

## 3. Sistema de diseño

### 3.1 Diagnóstico: existe en el papel, no en la práctica

Hay tokens bien pensados en dos lugares — `tailwind.config.js` (paleta `proyecta.*`, sombras, radios, animaciones) y `src/styles/theme/brand.js` (colores, gradientes, tipografía, assets). El problema es que **casi nadie los usa**.

Evidencia concreta:

| Token definido | Realidad |
|---|---|
| `gradients.hero` en `brand.js` | **Cero usos.** El mismo gradiente se reescribe a mano en `Impacto.jsx:68` y `TrabajosPage.tsx:20` |
| `assets.logoWhite`, `logoMono` | Apuntan a archivos **que no existen** |
| `assets.icons.*`, `assets.illustrations.*` | Ocho rutas a carpetas **que no existen** |
| `bg-gradient-proyecta`, `bg-gradient-hero`, `bg-gradient-card` (Tailwind) | Cero usos |
| Keyframes `scale-in`, `slide-right`, `shimmer` | Cero usos |
| Colores hex crudos (`#0D1F2A`, `#122530`) | Usados directamente en ~20 lugares en vez de tokens |

`#0D1F2A` y `#122530` son de facto los colores de superficie del modo oscuro, pero **no existen como tokens de Tailwind** — se escriben a mano cada vez como `dark:bg-[#0D1F2A]`. Si mañana se quiere ajustar el fondo oscuro, hay que buscar y reemplazar en 20 archivos.

### 3.2 Inconsistencias del mismo concepto

**Botones** — cuatro implementaciones distintas del mismo concepto:
- `.btn-primary` / `.btn-secondary` en `index.css`
- Botón amarillo inline en `MetaFinan.jsx:83` (clases sueltas, no usa `.btn-*`)
- Botón verde de WhatsApp inline en `Apoyanos.jsx:90`
- Botón CTA inline en `QuienesSomosHome.jsx:110` (replica `.btn-primary` a mano)

**Tarjetas** — tres patrones:
- `.card` (ahora theme-aware)
- `.glass` (para superponer a fotos)
- Composiciones inline con `bg-white dark:bg-[#122530]` repetidas

**Superficies oscuras** — `bg-proyecta-navy`, `bg-[#0D1F2A]`, `bg-[#122530]`, `bg-proyecta-navy/60`, `bg-proyecta-navy/80` usadas de forma intercambiable sin jerarquía definida.

### 3.3 Lo que sí está bien y hay que mantener

- La **paleta de marca** es buena y distintiva (navy + cyan + amarillo funciona).
- La **elección tipográfica** (Permanent Marker para display + Nunito para cuerpo) da personalidad sin sacrificar legibilidad.
- Los **radios generosos** (`rounded-[2rem]`, `rounded-3xl`) son consistentes y modernos.
- La estructura de `Community` en `communities.ts` está **bien tipada y bien comentada** — los comentarios sobre discrepancias de datos son ejemplares.

---

## 4. Arquitectura y calidad de código

### 4.1 Código muerto (≈800 líneas)

| Ubicación | Qué | Líneas |
|---|---|---|
| `Historia.jsx` | Componente entero comentado; solo renderiza "en construcción" | ~100 |
| `Contacto.jsx` | Componente completo, ruta comentada → **inalcanzable** | 292 |
| `ImpactoPage.jsx`, `ContactoPage.jsx` | Wrappers de rutas comentadas | 10 |
| `Apoyanos.jsx` `VoluntariosTab` | `form`, `setForm`, `handleSubmit`, rama `sent` — el `<form>` fue eliminado, el estado quedó | ~25 |
| `Apoyanos.jsx` `handleStripe` | Referencia `STRIPE_LINK_GENERICO` **que nunca se define** → `ReferenceError` si se activa | ~10 |
| `Impacto.jsx` | `meta`, `recaudado`, `porcentaje` declarados y nunca usados | 4 |
| `hooks/useAnimations.js` | `startValue = 0` en `useCountUp` (constante inútil) | 2 |
| `brand.js` | `icons`, `illustrations`, `logoWhite`, `logoMono` → rutas inexistentes | ~20 |
| `index.css` | Bloque `* { transition-property... }` **anulado en la línea siguiente** por `*,*::before,*::after { transition: none }` | 6 |

### 4.2 Dependencias sin usar (verificado por grep en `src/`)

- `@mercadopago/sdk-react` — **cero usos**. Los pagos se hacen con links `mpago.la` directos.
- `react-countup` — **cero usos**. Existe un `useCountUp` propio en `hooks/`.
- `react-intersection-observer` — **cero usos**. Existe un `useInView` propio.

Tres paquetes instalados que no aportan nada. Además, tener ambas versiones (propia + librería) del mismo concepto genera confusión sobre cuál es la correcta.

### 4.3 Componentes demasiado grandes

`Equipo.jsx` (565 líneas) mezcla **datos** (350 líneas del array `equiposData`) con **UI** (215 líneas). Cualquier cambio de contenido —agregar un integrante— requiere editar un archivo de componente. Debería separarse en `data/equipos.ts` + componente.

`Apoyanos.jsx` (497 líneas) contiene tres sub-componentes (`VoluntariosTab`, `SponsorsTab`, `DonacionesTab`) que deberían ser archivos propios, más constantes de negocio (montos, links de pago) que deberían vivir en datos.

`QuienesSomos.jsx` (466 líneas) usa **cinco hooks `useInView` separados** (`ref1..ref5`, `isVisible1..5`) para animar cinco secciones. Es un patrón que no escala: cada sección nueva agrega dos variables. Debería ser un componente `<AnimateOnScroll>` reutilizable.

### 4.4 Duplicación

- `socialLinks` está definido **dos veces** (`Footer.jsx` y `Contacto.jsx`) con datos parcialmente distintos.
- El gradiente hero está escrito a mano en **3 lugares** además del token que nadie usa.
- El patrón de header de sección (`section-tag` + `section-title` + `decorative-line` + párrafo) se repite **6 veces** con markup casi idéntico → debería ser `<SectionHeader>`.
- Estructura de carpetas duplicada en assets: `comunidades/Chepica 2022/Chepica 2022/` (nombre repetido dos veces). Funciona, pero es ruido heredado de cómo se descomprimió el material.

### 4.5 Configuración inconsistente

- `tsconfig.json` define el alias `@/*` → `./src/*`, pero **`vite.config.js` no lo resuelve**. Si alguien escribe `import x from "@/components/..."`, TypeScript lo acepta y el build falla.
- `noUnusedLocals: false` y `noUnusedParameters: false` → el compilador está configurado para *no avisar* de código muerto. Explica en parte cómo se acumuló.
- Mezcla `.jsx` / `.tsx` sin criterio: solo el mapa y los datos usan TypeScript. No hay convención declarada.
- No hay ESLint ni Prettier configurados, ni CI que valide nada antes de un merge.

---

## 5. Performance

### 5.1 Estado tras las optimizaciones recientes

Ya se corrigió lo más grave (imágenes de 158 MB → 23 MB, lazy loading). Bundle actual, verificado:

| Chunk | Tamaño | gzip |
|---|---|---|
| `vendor` (react, router) | 160 KB | 53 KB |
| `animation` (framer-motion) | 127 KB | 43 KB |
| `index` (app) | 110 KB | 28 KB |
| `map` (react-simple-maps) | 100 KB | 36 KB |
| CSS | 61 KB | 10 KB |

Es razonable para un sitio de este tipo. **No es el cuello de botella.**

### 5.2 El problema real: GeoJSON de 1.9 MB

`public/assets/geo/cl.json` pesa **1.9 MB sin comprimir** y se descarga completo al entrar a `/trabajos`. Es, por lejos, el activo individual más pesado del sitio — más que todo el JavaScript junto.

Simplificando la geometría (mapshaper al 5–10%, o convirtiendo a TopoJSON) debería bajar a **150–250 KB sin pérdida visual perceptible** a la escala en que se muestra el mapa. Es la optimización de mayor impacto pendiente.

### 5.3 Sin code splitting por ruta

Todas las páginas se cargan en el bundle inicial. Un visitante que solo mira la portada descarga igualmente el código de `Equipo`, `Apoyanos` y `QuienesSomos`. `React.lazy()` + `Suspense` por ruta es una mejora directa, especialmente porque `framer-motion` (43 KB gzip) **solo se usa en el mapa** y hoy se carga siempre.

### 5.4 Microoptimizaciones que NO vale la pena hacer

Para ser explícito sobre dónde *no* invertir: memoizar los componentes de sección, optimizar el `useCountUp`, o preocuparse por re-renders. El sitio es mayormente estático y no hay evidencia de problemas de rendering. Sería complejidad sin beneficio medible.

---

## 6. Accesibilidad

Verificado en el navegador (home, viewport 375px y 1272px):

**Lo que está bien:** `lang="es"` correcto, todas las imágenes tienen `alt` con texto significativo, todos los botones tienen nombre accesible (`aria-label` en los de solo icono), un único `<h1>` por página.

**Problemas encontrados:**

| Problema | Detalle | Severidad |
|---|---|---|
| Sin `<header>` | El `<nav>` está suelto, sin landmark contenedor | Media |
| Sin skip link | Un usuario de teclado debe tabular por 6 links de navegación en cada página | Media |
| Jerarquía de headings rota | Home salta `H2 → H4` (Misión/Visión). Footer usa `H5` sin H3/H4 previo | Media |
| Touch targets pequeños | **11 elementos** bajo 44px en móvil: botón de tema (32×32), menú (38×38), redes sociales (32×32), y los links del footer con solo **19px de alto** | Alta en móvil |
| Focus visible | `.btn-primary`/`.btn-secondary` definen `focus:ring`, pero los links de navegación y del footer **no tienen estilo de foco propio** más allá del default del navegador | Media |
| `prefers-reduced-motion` | No se respeta. Hay animaciones infinitas (`animate-bounce`, `animate-pulse`, `animate-float`, el pulso del mapa) que no se desactivan para usuarios sensibles al movimiento | Media |

Sobre contraste: medí todos los textos de la home en ambos temas. **No encontré fallos reales de contraste** — los 4 casos que marcó mi script eran falsos positivos (texto con gradiente `background-clip` y botones con fondo degradado, que el cálculo automático no resuelve). Los arreglos de contraste hechos en la sesión anterior se sostienen.

---

## 7. SEO

**Lo que está bien:** meta tags básicos completos (title, description, keywords, robots, canonical), Open Graph y Twitter Card presentes, `lang` correcto, HTML semántico razonable.

**Problemas:**

| Problema | Detalle |
|---|---|
| `og:image` apunta a un archivo inexistente | `https://proyecta.cai.cl/assets/logos/og-image.png` **no existe**. Al compartir en WhatsApp/Instagram/LinkedIn, el link se ve sin imagen — justo en los canales que más usa el voluntariado |
| `favicon.svg` inexistente | `index.html:9` referencia `/assets/logos/favicon.svg`, que no existe. Cae al PNG por el `alternate icon`, pero es una petición 404 en cada carga |
| Sin `robots.txt` | No existe |
| Sin `sitemap.xml` | No existe. Con 6 rutas, es trivial de generar y ayuda a la indexación |
| Meta description única para todo el sitio | Todas las rutas comparten el mismo `<title>` y `<description>`. Google indexa 6 páginas idénticas en metadatos |
| SPA sin prerender | Sin SSR/SSG, el crawler depende de ejecutar JS. Google lo hace, pero los previews de redes sociales (que **no ejecutan JS**) solo ven el `index.html` genérico |

El punto de `og:image` es el más relevante para esta organización en particular: su difusión es principalmente por redes sociales.

---

## 8. Responsive

Verificado en 375px (móvil), 768px (tablet) y 1272px (desktop).

**Lo que está bien:** no hay overflow horizontal en ninguna página (el `overflow-x-hidden` del body lo contiene correctamente), los grids colapsan bien, la navegación móvil funciona.

**Problemas:**

1. **Touch targets** (ver §6) — el peor caso son los links del footer con 19px de alto. En móvil son difíciles de acertar.
2. **Elementos que se desbordan del viewport** (contenidos por el `overflow-hidden`, pero mal dimensionados): los círculos decorativos `w-96 h-96` en `QuienesSomosHome` se salen 128px a la derecha en móvil. No rompe el layout, pero es señal de que se dimensionaron pensando solo en desktop.
3. **Hero en móvil apaisado**: `min-h-screen` con contenido centrado y `pt-24 pb-32` deja el texto comprimido en pantallas bajas (< 500px de alto).
4. **Imagen del Hero** con `scale-105` se desborda 9px — inofensivo, pero innecesario ahora que la animación que lo justificaba no existe.

No encontré layouts rotos que solo funcionen en un tamaño. El responsive es **aceptable**; lo que falla es el detalle de tamaños táctiles.

---

## 9. Robustez y seguridad

### 9.1 Vulnerabilidades de dependencias (verificado con `npm audit --omit=dev`)

| Paquete | Severidad | Problema |
|---|---|---|
| `d3-color` (vía react-simple-maps) | **Alta** | ReDoS |
| `@remix-run/router` / `react-router` / `react-router-dom` | Moderada | Open redirect vía URL protocol-relative |

Ambas tienen fix disponible con `npm audit fix`. **Riesgo real bajo** para un sitio estático sin autenticación ni datos de usuario, pero conviene actualizarlas.

### 9.2 Manejo de errores y estados

- **No hay Error Boundary.** Cualquier excepción en un componente deja la página en blanco.
- **`MetaFinan.jsx` hace `fetch` a Google Sheets sin estados de carga ni error.** Si falla, muestra silenciosamente valores de respaldo (`meta: 5.000.000, recaudado: 500.000`) que el usuario percibe como reales. Verificado: solo hace `console.error`. Mostrar cifras de recaudación desactualizadas o falsas es un problema de credibilidad, no solo técnico.
- **Sin estados vacíos** en el modal del mapa: si una comunidad no tiene fotos, se muestra un panel negro sin explicación (24 de 36 comunidades no tienen fotos hoy).
- **`onError` de imágenes** manipula `e.target.nextSibling.style` directamente — frágil: si el markup cambia, revienta.

### 9.3 Datos y secretos

Sin problemas: no hay `.env`, no hay secretos en el repo, `.gitignore` cubre lo necesario. Los links de Mercado Pago y el grupo de WhatsApp son públicos por naturaleza. El correo de contacto está expuesto en texto plano (riesgo de scraping/spam, menor).

### 9.4 Consistencia de datos

`brand.js` declara **37 trabajos realizados**; `communities.ts` tiene **36 entradas**. Puede ser legítimo (un trabajo sin ubicación registrada), pero conviene verificar y, mejor aún, **derivar el número del array** en vez de mantenerlo a mano en dos sitios.

---

## 10. Evaluación UX/UI como producto

### 10.1 La pregunta clave: ¿un usuario nuevo entiende qué hacer?

**No del todo.** Entiende *qué es* Proyecta (el Hero lo comunica bien), pero no *qué se espera de él*.

- El Hero ofrece "Conócenos" (scroll interno) y "Apóyanos" (donaciones). Ninguno es "Quiero ser voluntario", que probablemente sea la conversión más valiosa.
- La forma real de postular —unirse a un grupo de WhatsApp— está **enterrada en la pestaña "Voluntarios" dentro de /apoyanos**, a dos clics y una decisión de pestaña de distancia.
- No hay ninguna indicación de **temporalidad**: ¿cuándo son los trabajos? ¿cuándo se postula? ¿está abierto ahora? Para un voluntariado con ciclos anuales, esta es la pregunta #1 de cualquier interesado.

### 10.2 Qué se siente amateur o improvisado

Siendo directo, porque es lo que pediste:

1. **"Historia" es una página de 'en construcción'.** Un visitante que hace clic en un ítem del menú principal y encuentra "vuelve pronto 🕰️💛" recibe una señal de abandono. Es peor que no tener el ítem en el menú.
2. **Las pestañas de /apoyanos** (Voluntarios / Sponsors / Donaciones) mezclan tres audiencias completamente distintas en una sola página. Un sponsor corporativo y un estudiante que quiere postular no deberían compartir interfaz.
3. **Las secciones de equipo sin descripción** — cinco de los doce equipos tienen `groupDescription: ""`, dejando un espacio vacío bajo la foto donde el resto tiene texto. Se ve incompleto.
4. **La sección de sponsors muestra 2 logos** en un grid de 3 columnas, con el hueco vacío y un texto "Tu logo aquí →". Comunica falta de auspiciadores más que oportunidad.
5. **Los números de impacto no tienen contexto ni fuente.** "300 comunidades intervenidas" sin período ni definición es difícil de creer para un evaluador serio (y contrasta con las 36 del mapa, que es la cifra verificable).
6. **El mapa no explica qué está viendo el usuario.** Llega a `/trabajos`, ve puntos en Chile, y debe descubrir por prueba y error que son clicables. Sin leyenda, sin conteo, sin filtros visibles (la infraestructura de categorías existe en el código pero está deshabilitada).

### 10.3 Qué haría un diseñador senior

- **Definir una acción primaria por página** y subordinar el resto visualmente.
- **Separar audiencias**: `/unete` (voluntarios) y `/apoyanos` (sponsors + donaciones) como rutas distintas, no pestañas.
- **Poner la temporalidad al frente**: "Postulaciones abiertas hasta X" o "Próximo trabajo: Empedrado, enero 2026" en el Hero.
- **Convertir el mapa en la pieza central** de credibilidad: es lo más original que tiene el sitio, y hoy está escondido tras un ítem de menú genérico ("Trabajos") sin preview en la home.
- **Eliminar o completar** todo lo que esté a medias (Historia, descripciones vacías, sponsors) — un sitio más pequeño y completo transmite más profesionalismo que uno grande con huecos.

---

## 11. Lista accionable de cambios

Formato pensado para ejecución directa. Prioridad · Impacto · Esfuerzo · Riesgo.

---

### FASE 1 — Correcciones críticas

#### C-01 · Reparar rutas rotas del footer y agregar página 404
- **Prioridad:** CRÍTICA · **Impacto:** UX · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** El footer enlaza a `/impacto` y `/contacto`; esas rutas están comentadas en `App.jsx` y no hay catch-all. Verificado: la página queda **totalmente en blanco, sin navbar ni footer**.
- **Por qué importa:** Es un callejón sin salida. El usuario debe usar el botón "atrás" del navegador para escapar.
- **Solución:**
  1. Quitar `/impacto` y `/contacto` del array `navLinks` de `Footer.jsx` (dejarlo alineado con las rutas reales, incluyendo `/trabajos` y `/equipo` que hoy faltan en el footer).
  2. Agregar `<Route path="*" element={<NotFoundPage />} />` **dentro** del `<Route element={<Layout />}>`, para que la 404 conserve navbar y footer.
  3. Crear `pages/NotFoundPage.jsx` con mensaje claro y links a Inicio y Trabajos.
- **Archivos:** `src/components/Footer.jsx`, `src/App.jsx`, `src/pages/NotFoundPage.jsx` (nuevo)
- **Resultado esperado:** ninguna ruta deja al usuario sin salida.
- **Dependencias:** ninguna

#### C-02 · Arreglar `.glass` en superficies claras
- **Prioridad:** CRÍTICA · **Impacto:** Diseño/UX · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** `.glass` = `bg-white/10 border-white/20`. Verificado: en `/quienes-somos` modo claro, las tarjetas de Misión y Visión son invisibles (blanco 10% sobre blanco).
- **Por qué importa:** Dos de las secciones más importantes del sitio institucional no tienen contenedor visible en modo claro.
- **Solución:** redefinir `.glass` como theme-aware en `index.css`:
  ```css
  .glass {
    @apply backdrop-blur-md bg-proyecta-navy/5 border border-proyecta-navy/10
           dark:bg-white/10 dark:border-white/20;
  }
  ```
  Crear además una variante `.glass-on-image` con los valores originales (`bg-white/10 border-white/20`) para los casos donde sí se superpone a fotos oscuras (Hero, overlays del mapa), y aplicarla ahí.
- **Archivos:** `src/index.css`, `src/components/QuienesSomos.jsx`, `Equipo.jsx`, `Historia.jsx`, `QuienesSomosHome.jsx`
- **Resultado esperado:** todas las tarjetas visibles y con jerarquía en ambos temas.
- **Dependencias:** ninguna

#### C-03 · Definir el keyframe `kenburns` (o eliminar la animación)
- **Prioridad:** ALTA · **Impacto:** Diseño · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** `Hero.jsx:29` usa `animate-[kenburns_...]` pero el keyframe no existe. Verificado enumerando keyframes en runtime.
- **Solución:** agregar a `tailwind.config.js`:
  ```js
  keyframes: {
    kenburns: {
      '0%':   { transform: 'scale(1.05) translate(0, 0)' },
      '100%': { transform: 'scale(1.15) translate(-1%, -1%)' },
    },
  }
  ```
  Envolver en `@media (prefers-reduced-motion: reduce)` para desactivarlo (ver A-04).
- **Archivos:** `tailwind.config.js`
- **Resultado esperado:** la portada recupera el movimiento sutil previsto.
- **Dependencias:** ninguna

#### C-04 · Generar `og-image.png` y `favicon.svg`
- **Prioridad:** ALTA · **Impacto:** SEO/Marca · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** `index.html` referencia ambos archivos; **ninguno existe**. Al compartir el sitio en redes, no aparece imagen previa.
- **Por qué importa:** la difusión de Proyecta es mayoritariamente por Instagram y WhatsApp. Un link sin preview reduce drásticamente el clic.
- **Solución:** crear `public/assets/logos/og-image.png` (1200×630, foto de terreno + logo + tagline) y `favicon.svg`. Verificar con el validador de OG de Facebook/LinkedIn.
- **Archivos:** `public/assets/logos/` (nuevos), `index.html`
- **Dependencias:** ninguna (requiere diseño gráfico, no código)

#### C-05 · Actualizar dependencias vulnerables
- **Prioridad:** ALTA · **Impacto:** Seguridad · **Esfuerzo:** Pequeño · **Riesgo:** Medio
- **Problema:** `d3-color` (alta, ReDoS) y `react-router` (moderada, open redirect). Verificado con `npm audit --omit=dev`.
- **Solución:** `npm audit fix`, luego **probar navegación completa** (react-router es núcleo del sitio). Si `audit fix` intenta un major de react-router, hacerlo aparte y con prueba manual de todas las rutas.
- **Archivos:** `package.json`, `package-lock.json`
- **Riesgo medio:** un cambio de versión de router puede romper rutas. Probar antes de desplegar.

---

### FASE 2 — Fundaciones (limpieza y sistema de diseño)

#### F-01 · Eliminar dependencias sin usar
- **Prioridad:** ALTA · **Impacto:** Performance/Mantenibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** `@mercadopago/sdk-react`, `react-countup` y `react-intersection-observer` tienen **cero usos** en `src/` (verificado por grep).
- **Solución:** `npm uninstall @mercadopago/sdk-react react-countup react-intersection-observer`
- **Resultado esperado:** menos superficie de dependencias, `node_modules` más liviano, sin ambigüedad sobre qué usar para scroll/contadores.
- **Dependencias:** ninguna

#### F-02 · Purga de código muerto
- **Prioridad:** ALTA · **Impacto:** Mantenibilidad · **Esfuerzo:** Mediano · **Riesgo:** Bajo
- **Problema:** ~800 líneas de código inalcanzable, comentado o sin usar (detalle en §4.1).
- **Solución:**
  - `Apoyanos.jsx`: borrar `form`, `setForm`, `handleSubmit`, la rama `if (sent)` y **`handleStripe` completo** (referencia `STRIPE_LINK_GENERICO` inexistente → `ReferenceError` latente).
  - `Impacto.jsx`: borrar `meta`, `recaudado`, `porcentaje` (sin uso).
  - `Historia.jsx`: decidir — completar la línea de tiempo o borrar el bloque comentado y dejar solo el estado "en construcción" limpio (ver U-02).
  - `Contacto.jsx` + `ContactoPage.jsx` + `ImpactoPage.jsx`: borrar, o restaurar sus rutas si se quieren usar. **No dejar componentes inalcanzables.**
  - `brand.js`: borrar `logoWhite`, `logoMono`, `icons`, `illustrations` (rutas a archivos inexistentes).
  - `index.css`: borrar el bloque `* { transition-property... }` que queda anulado por la regla siguiente.
  - `useAnimations.js`: borrar `startValue`.
- **Archivos:** los listados arriba
- **Dependencias:** decidir antes U-02 (destino de Historia) y C-01 (rutas)

#### F-03 · Consolidar tokens de diseño
- **Prioridad:** ALTA · **Impacto:** Mantenibilidad/Diseño · **Esfuerzo:** Mediano · **Riesgo:** Bajo
- **Problema:** los colores de superficie del modo oscuro (`#0D1F2A`, `#122530`) se escriben a mano en ~20 lugares. `gradients.hero` existe pero nadie lo usa; el gradiente se duplica en 3 archivos.
- **Solución:**
  1. Agregar a `tailwind.config.js`: `proyecta.surface` (`#0D1F2A`), `proyecta.surface-2` (`#122530`).
  2. Reemplazar todos los `dark:bg-[#0D1F2A]` → `dark:bg-proyecta-surface` y `dark:bg-[#122530]` → `dark:bg-proyecta-surface-2`.
  3. Usar `bg-gradient-hero` (ya definido en Tailwind) en `Impacto.jsx`, `TrabajosPage.tsx` y `Footer.jsx` en lugar de los `style={{background: "linear-gradient(...)"}}` inline.
  4. Eliminar de `brand.js` los tokens duplicados con Tailwind, dejándolo solo como fuente de **contenido** (textos, links, stats), no de estilos.
- **Archivos:** `tailwind.config.js`, `src/styles/theme/brand.js`, `Impacto.jsx`, `TrabajosPage.tsx`, `Footer.jsx`, y todos los que usen hex crudos
- **Resultado esperado:** un solo lugar para cambiar cualquier color del sistema.
- **Dependencias:** hacer después de F-02 para no migrar código que se va a borrar

#### F-04 · Componente `<Button>` unificado
- **Prioridad:** ALTA · **Impacto:** Diseño/Mantenibilidad · **Esfuerzo:** Mediano · **Riesgo:** Bajo
- **Problema:** cuatro implementaciones distintas de botón (§3.2): `.btn-primary`/`.btn-secondary` en CSS, más tres botones inline con clases sueltas que replican o divergen del sistema.
- **Solución:** crear `components/ui/Button.jsx` con `variant` (`primary` | `secondary` | `ghost` | `accent`), `size` (`sm` | `md` | `lg`) y soporte para renderizar como `<button>`, `<a>` o `<Link>` (prop `as`). Incluir estados `hover`, `focus-visible`, `active` y `disabled` en un solo lugar. Migrar los botones inline de `MetaFinan.jsx`, `Apoyanos.jsx` y `QuienesSomosHome.jsx`.
- **Archivos:** `src/components/ui/Button.jsx` (nuevo), `MetaFinan.jsx`, `Apoyanos.jsx`, `QuienesSomosHome.jsx`, `Hero.jsx`, `index.css`
- **Dependencias:** F-03

#### F-05 · Componentes `<SectionHeader>` y `<AnimateOnScroll>`
- **Prioridad:** MEDIA · **Impacto:** Mantenibilidad · **Esfuerzo:** Mediano · **Riesgo:** Bajo
- **Problema:** el patrón `section-tag` + `section-title` + `decorative-line` + párrafo se repite 6 veces con markup casi idéntico. `QuienesSomos.jsx` usa 5 hooks `useInView` en paralelo (`ref1..ref5`) para animar 5 secciones.
- **Solución:**
  - `<SectionHeader tag title subtitle align="center|left" onDark={bool} />`
  - `<AnimateOnScroll delay={0}>` que encapsula `useInView` + las clases de transición, eliminando la proliferación de refs.
- **Archivos:** `src/components/ui/SectionHeader.jsx`, `src/components/ui/AnimateOnScroll.jsx` (nuevos), `QuienesSomos.jsx`, `Apoyanos.jsx`, `Impacto.jsx`, `TrabajosPage.tsx`, `Contacto.jsx`
- **Dependencias:** F-03

#### F-06 · Separar datos de componentes
- **Prioridad:** MEDIA · **Impacto:** Arquitectura/Mantenibilidad · **Esfuerzo:** Mediano · **Riesgo:** Bajo
- **Problema:** `Equipo.jsx` (565 líneas) contiene 350 líneas de datos del equipo. `Apoyanos.jsx` contiene montos de donación y links de pago. Cambiar contenido obliga a tocar componentes.
- **Solución:** mover a `src/data/equipos.ts`, `src/data/donaciones.ts`, `src/data/sponsors.ts`. Tipar como se hizo con `communities.ts` (que es el buen ejemplo a seguir en este repo).
- **Archivos:** `src/data/*` (nuevos), `Equipo.jsx`, `Apoyanos.jsx`
- **Resultado esperado:** actualizar el equipo del próximo año = editar un archivo de datos.
- **Dependencias:** F-02

#### F-07 · Corregir configuración de TypeScript y agregar linting
- **Prioridad:** MEDIA · **Impacto:** Mantenibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** el alias `@/*` está en `tsconfig.json` pero **no en `vite.config.js`** → usarlo rompe el build. `noUnusedLocals: false` desactiva justamente la alerta que habría evitado gran parte del código muerto.
- **Solución:**
  1. Agregar `resolve.alias` en `vite.config.js` apuntando `@` a `./src`, **o** eliminar el alias de `tsconfig.json` si no se va a usar.
  2. Activar `noUnusedLocals: true` y `noUnusedParameters: true` (después de F-02, si no, fallará ruidosamente).
  3. Agregar ESLint + Prettier con config de React, y un script `npm run lint`.
- **Archivos:** `vite.config.js`, `tsconfig.json`, `.eslintrc`, `.prettierrc` (nuevos), `package.json`
- **Dependencias:** F-02

---

### FASE 3 — UX/UI

#### U-01 · Definir acción primaria y reordenar el recorrido del usuario
- **Prioridad:** ALTA · **Impacto:** UX · **Esfuerzo:** Mediano · **Riesgo:** Medio
- **Problema:** el sitio no comunica qué se espera del visitante. La vía real para postular (grupo de WhatsApp) está a 2 clics y una pestaña de distancia. No hay ninguna señal de temporalidad (¿cuándo son los trabajos? ¿está abierta la postulación?).
- **Por qué importa:** si el objetivo principal es reclutar voluntarios, hoy el sitio no lo optimiza en absoluto.
- **Solución:**
  1. Definir con el equipo la conversión #1 (probablemente "quiero ser voluntario").
  2. Cambiar el CTA primario del Hero a esa acción, y bajar "Apóyanos" a secundario.
  3. Agregar una franja de estado temporal visible en el Hero: próximo trabajo / estado de postulaciones.
  4. Separar `/apoyanos` (sponsors + donaciones) de una ruta `/unete` (voluntarios), en vez de pestañas que mezclan audiencias.
- **Archivos:** `Hero.jsx`, `Apoyanos.jsx`, `App.jsx`, `Navbar.jsx`, nueva `pages/UnetePage.jsx`
- **Riesgo medio:** requiere decisión de contenido del equipo, no solo código.
- **Dependencias:** F-04

#### U-02 · Resolver la página "Historia"
- **Prioridad:** ALTA · **Impacto:** UX/Percepción · **Esfuerzo:** Pequeño (quitar) / Grande (completar) · **Riesgo:** Bajo
- **Problema:** un ítem del menú principal lleva a "estamos desempolvando los archivos, vuelve pronto".
- **Por qué importa:** una sección vacía en la navegación principal transmite abandono; es peor que no tenerla.
- **Solución (elegir una):**
  - **(a) Rápida:** quitar "Historia" del navbar hasta que haya contenido. El componente ya tiene la línea de tiempo construida en comentarios.
  - **(b) Completa:** descomentar la línea de tiempo, completar los 4 hitos con contenido e imágenes reales, y publicarla.
- **Archivos:** `Navbar.jsx`, `Historia.jsx`, `Footer.jsx`
- **Dependencias:** F-02

#### U-03 · Mejorar el mapa de Trabajos
- **Prioridad:** MEDIA · **Impacto:** UX · **Esfuerzo:** Mediano · **Riesgo:** Bajo
- **Problema:** el usuario llega y ve puntos sin explicación. No hay leyenda, ni conteo, ni indicación de que sean clicables. Los filtros por categoría existen en el código (`activeCategory`) pero están fijos en `"all"`. 24 de 36 comunidades no tienen fotos y el modal no lo maneja con gracia.
- **Solución:**
  1. Agregar leyenda y un contador ("36 trabajos, 2006–2026").
  2. Agregar hint visual de interactividad en el primer punto (o texto "haz clic en un punto").
  3. Estado vacío decente en `CommunityModal` cuando no hay fotos (mostrar lema, año, construcción — no un panel negro).
  4. Filtros por año/región si aporta (la categoría hoy es siempre "Trabajos", así que filtrar por categoría no sirve).
- **Archivos:** `TrabajosPage.tsx`, `InteractiveChileMap.tsx`, `CommunityModal.tsx`
- **Dependencias:** ninguna

#### U-04 · Preview del mapa en la home
- **Prioridad:** MEDIA · **Impacto:** UX · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** el mapa es el activo más original del sitio y está escondido tras un ítem de menú genérico.
- **Solución:** en la sección de Impacto de la home, reemplazar (o acompañar) los contadores con un preview estático del mapa que enlace a `/trabajos`. Los números abstractos ("300 comunidades") son menos convincentes que ver los puntos distribuidos por Chile.
- **Archivos:** `Impacto.jsx`, `HomePage.jsx`
- **Dependencias:** U-03

#### U-05 · Completar contenido a medias
- **Prioridad:** MEDIA · **Impacto:** Percepción · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** 5 de 12 equipos tienen `groupDescription: ""` (hueco visible bajo la foto); la grilla de sponsors muestra 2 logos en 3 columnas con un espacio vacío.
- **Solución:** completar las descripciones faltantes; en sponsors, usar un layout que se adapte al número real (flex centrado) en vez de una grilla fija con huecos.
- **Archivos:** `src/data/equipos.ts` (tras F-06), `Apoyanos.jsx`
- **Dependencias:** F-06

#### U-06 · Verificar y contextualizar las cifras de impacto
- **Prioridad:** MEDIA · **Impacto:** Credibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** "300 comunidades intervenidas" sin período ni definición, junto a un mapa que muestra 36. `brand.js` declara 37 trabajos vs 36 entradas en `communities.ts`.
- **Solución:** verificar cifras con el equipo, agregar nota de alcance ("2005–2026") y **derivar el conteo de trabajos del array** (`communities.length`) en vez de duplicarlo a mano.
- **Archivos:** `src/styles/theme/brand.js`, `Impacto.jsx`
- **Dependencias:** ninguna

---

### FASE 4 — Performance

#### P-01 · Simplificar el GeoJSON de Chile
- **Prioridad:** ALTA · **Impacto:** Performance · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** `public/assets/geo/cl.json` pesa **1.9 MB** y se descarga completo al entrar a `/trabajos`. Es el activo más pesado del sitio, más que todo el JS junto.
- **Solución:** simplificar con [mapshaper](https://mapshaper.org/) al 5–10% de vértices (o convertir a TopoJSON). A la escala en que se renderiza, la pérdida de detalle es imperceptible.
- **Resultado esperado:** 1.9 MB → ~200 KB (−90%).
- **Archivos:** `public/assets/geo/cl.json`
- **Dependencias:** ninguna. **Verificar visualmente el mapa tras simplificar.**

#### P-02 · Code splitting por ruta
- **Prioridad:** MEDIA · **Impacto:** Performance · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** todas las páginas van en el bundle inicial. `framer-motion` (43 KB gzip) **solo se usa en el mapa** pero se descarga siempre.
- **Solución:** `React.lazy()` + `<Suspense>` por ruta en `App.jsx`, con un fallback de carga coherente con la marca. Prioridad: aislar `/trabajos` (arrastra framer-motion + react-simple-maps).
- **Archivos:** `src/App.jsx`
- **Dependencias:** C-01 (para no dividir rutas que van a cambiar)

#### P-03 · Dimensiones explícitas en imágenes (evitar CLS)
- **Prioridad:** MEDIA · **Impacto:** Performance/UX · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** las imágenes no declaran `width`/`height`, lo que provoca *layout shift* durante la carga. Los contenedores usan `aspect-*`, lo que ayuda, pero no en todos los casos.
- **Solución:** agregar `width`/`height` a los `<img>` (o `aspect-ratio` en CSS donde falte).
- **Archivos:** `Equipo.jsx`, `QuienesSomos.jsx`, `CommunityModal.tsx`
- **Dependencias:** ninguna

#### P-04 · Formatos de imagen modernos (opcional)
- **Prioridad:** BAJA · **Impacto:** Performance · **Esfuerzo:** Mediano · **Riesgo:** Bajo
- **Problema:** todas las imágenes son JPEG. WebP/AVIF daría 25–35% adicional.
- **Solución:** generar `.webp` junto a cada `.jpg` y servir con `<picture>`. **Solo si se justifica** — ya se bajó de 158 MB a 23 MB; el retorno marginal es menor que P-01.
- **Dependencias:** ninguna

---

### FASE 5 — Accesibilidad y SEO

#### A-01 · Landmarks y skip link
- **Prioridad:** MEDIA · **Impacto:** Accesibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** el `<nav>` no está dentro de un `<header>`; no hay skip link (verificado).
- **Solución:** envolver la navegación en `<header>`; agregar un "Saltar al contenido" visible solo con foco, apuntando a `<main id="contenido">`.
- **Archivos:** `Navbar.jsx`, `App.jsx`, `index.css`

#### A-02 · Corregir jerarquía de encabezados
- **Prioridad:** MEDIA · **Impacto:** Accesibilidad/SEO · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** la home salta `H2 → H4` (Misión/Visión); el footer usa `H5` sin niveles previos (verificado).
- **Solución:** normalizar a una secuencia sin saltos. Mantener el tamaño visual con clases de Tailwind, independiente del nivel semántico.
- **Archivos:** `QuienesSomosHome.jsx`, `Footer.jsx`, `QuienesSomos.jsx`

#### A-03 · Ampliar áreas táctiles
- **Prioridad:** MEDIA · **Impacto:** Accesibilidad/UX móvil · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** 11 elementos bajo 44px en móvil; los links del footer tienen **19px de alto** (verificado a 375px).
- **Solución:** mínimo 44×44 en botones de icono (tema, menú, redes) y padding vertical en los links del footer.
- **Archivos:** `Navbar.jsx`, `Footer.jsx`

#### A-04 · Respetar `prefers-reduced-motion`
- **Prioridad:** MEDIA · **Impacto:** Accesibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** animaciones infinitas (`animate-bounce`, `animate-pulse`, `animate-float`, pulso de los marcadores del mapa, y kenburns tras C-03) no se desactivan.
- **Solución:** bloque global en `index.css` que reduzca animaciones y transiciones bajo `@media (prefers-reduced-motion: reduce)`.
- **Archivos:** `src/index.css`
- **Dependencias:** C-03

#### A-05 · Estados de foco visibles y consistentes
- **Prioridad:** MEDIA · **Impacto:** Accesibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** los links de navegación y del footer no tienen estilo de `:focus-visible` propio.
- **Solución:** estilo de foco unificado (anillo cyan) para todos los interactivos, incluido dentro del `<Button>` de F-04.
- **Archivos:** `index.css`, `Navbar.jsx`, `Footer.jsx`
- **Dependencias:** F-04

#### S-01 · Metadatos por página
- **Prioridad:** MEDIA · **Impacto:** SEO · **Esfuerzo:** Mediano · **Riesgo:** Bajo
- **Problema:** las 6 rutas comparten `<title>` y `<description>` idénticos.
- **Solución:** `react-helmet-async` (o manipulación directa del `document.title` en un hook propio, para no sumar dependencias) con title/description únicos por página.
- **Archivos:** todas las páginas, `main.jsx`

#### S-02 · `robots.txt` y `sitemap.xml`
- **Prioridad:** BAJA · **Impacto:** SEO · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** ninguno de los dos existe (verificado).
- **Solución:** crear ambos en `public/` con las 6 rutas reales y referencia al sitemap desde robots.
- **Archivos:** `public/robots.txt`, `public/sitemap.xml` (nuevos)
- **Dependencias:** C-01 (que las rutas estén definidas)

#### S-03 · Datos estructurados (Schema.org)
- **Prioridad:** BAJA · **Impacto:** SEO · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Solución:** JSON-LD de tipo `NGO`/`Organization` en `index.html` con nombre, logo, redes y datos de contacto.
- **Archivos:** `index.html`

---

### FASE 6 — Robustez y pulido

#### R-01 · Error Boundary
- **Prioridad:** MEDIA · **Impacto:** Robustez · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** cualquier excepción deja la página en blanco sin explicación.
- **Solución:** `<ErrorBoundary>` alrededor de `<Outlet />` en el Layout, con mensaje amable y opción de recargar.
- **Archivos:** `src/components/ErrorBoundary.jsx` (nuevo), `App.jsx`

#### R-02 · Estados de carga y error en `MetaFinan`
- **Prioridad:** MEDIA · **Impacto:** Robustez/Credibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** el `fetch` a Google Sheets no tiene estados de carga ni error. Si falla, muestra valores de respaldo **como si fueran reales** (verificado: solo hace `console.error`).
- **Por qué importa:** publicar cifras de recaudación incorrectas es un problema de confianza con donantes.
- **Solución:** estado `loading` con skeleton; ante error, ocultar la barra de progreso o marcar los datos como no disponibles — **nunca mostrar cifras de respaldo como reales**.
- **Archivos:** `MetaFinan.jsx`

#### R-03 · Reemplazar `onError` frágil de imágenes
- **Prioridad:** BAJA · **Impacto:** Robustez · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** el fallback del logo manipula `e.target.nextSibling.style` — se rompe si cambia el markup.
- **Solución:** manejarlo con estado de React en un pequeño componente `<Logo>`.
- **Archivos:** `Navbar.jsx`, `Footer.jsx`

#### R-04 · Aplanar la estructura duplicada de assets
- **Prioridad:** BAJA · **Impacto:** Mantenibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Medio
- **Problema:** `assets/comunidades/Chepica 2022/Chepica 2022/` repite el nombre de carpeta.
- **Solución:** aplanar a un nivel y actualizar las rutas en `communities.ts`.
- **Riesgo medio:** hay que actualizar ~80 rutas; un error deja fotos rotas. Hacerlo con búsqueda y reemplazo verificada.
- **Archivos:** `public/assets/comunidades/*`, `src/data/communities.ts`

#### R-05 · README y CI
- **Prioridad:** BAJA · **Impacto:** Mantenibilidad · **Esfuerzo:** Pequeño · **Riesgo:** Bajo
- **Problema:** el README tiene 3 líneas. No hay CI: nada valida un PR antes de mergear.
- **Por qué importa:** el proyecto lo mantienen voluntarios que rotan cada año. Sin documentación, cada generación redescubre todo.
- **Solución:** README con instalación, scripts, estructura, convenciones y proceso de deploy. GitHub Action que corra build + lint en cada PR.
- **Archivos:** `README.md`, `.github/workflows/ci.yml` (nuevo)

---

## 12. Roadmap de implementación

El orden respeta dependencias: no tiene sentido pulir visualmente sobre componentes que se van a consolidar.

| Fase | Contenido | Cambios | Esfuerzo |
|---|---|---|---|
| **1. Críticos** | Rutas rotas, glass invisible, animación rota, og-image, vulnerabilidades | C-01 → C-05 | ~1 día |
| **2. Fundaciones** | Limpieza, tokens, `<Button>`, `<SectionHeader>`, datos fuera de componentes, tooling | F-01 → F-07 | ~3 días |
| **3. UX/UI** | Acción primaria, Historia, mapa, contenido incompleto, cifras | U-01 → U-06 | ~3 días |
| **4. Performance** | GeoJSON, code splitting, CLS | P-01 → P-04 | ~1 día |
| **5. A11y + SEO** | Landmarks, headings, táctiles, motion, foco, metadatos, robots/sitemap | A-01 → A-05, S-01 → S-03 | ~1.5 días |
| **6. Robustez** | Error boundary, estados de red, assets, README/CI | R-01 → R-05 | ~1 día |

**Total estimado: ~10 días de trabajo enfocado.**

**Ruta mínima de alto impacto** (si hay poco tiempo, hacer solo esto): **C-01, C-02, C-03, C-04, F-01, F-02, P-01, A-03**. Son ~2 días y resuelven todos los bugs visibles, la mitad del código muerto y la peor carga del sitio.

---

## 13. Qué está bien y NO hay que tocar

Para equilibrar el informe — estas decisiones son correctas y cambiarlas sería un retroceso:

- **La elección de stack.** React + Vite + Tailwind es apropiado, moderno y mantenible por voluntarios. No migrar a Next.js sin una razón concreta (el SSR aportaría poco aquí y sumaría complejidad de deploy).
- **`communities.ts`.** Está bien tipado, bien estructurado y **excepcionalmente bien comentado** — documenta explícitamente qué datos son inciertos y por qué. Es el mejor archivo del repositorio y debería ser el modelo para los demás.
- **`InteractiveChileMap.tsx`.** Resuelve problemas reales y difíciles (gestos táctiles vs scroll de página, escalado de marcadores con piso mínimo, `non-scaling-stroke`) con comentarios que explican el porqué. Es código senior.
- **La paleta y la tipografía.** Distintivas y coherentes con la identidad del voluntariado.
- **`manualChunks` en Vite.** Buena separación vendor/map/animation.
- **El truco SPA de GitHub Pages** (`404.html` + redirect). Correctamente implementado.
- **Los `loading="lazy"` / `fetchpriority`** ya aplicados.

---

## 14. Evaluación general

| Dimensión | Nota | Fundamento |
|---|---|---|
| **Estado actual** | **5.5/10** | Funciona y se ve decente, pero con bugs de navegación que atrapan al usuario y elementos invisibles en modo claro |
| **Diseño / UX** | **6/10** | Identidad visual fuerte y buen material fotográfico, pero sin jerarquía de conversión, con secciones a medias e inconsistencias entre páginas |
| **Arquitectura** | **4/10** | Estructura plana, `pages/` sin propósito real, datos dentro de componentes, componentes de 500+ líneas |
| **Calidad de código** | **4/10** | ~800 líneas muertas, 3 dependencias sin usar, duplicación, bug latente (`STRIPE_LINK_GENERICO`), sin linting |
| **Performance** | **6/10** | Muy mejorada tras la optimización de imágenes; queda el GeoJSON de 1.9 MB y la falta de code splitting |
| **Accesibilidad** | **5/10** | Bien en `alt`, `lang` y contraste; falla en landmarks, jerarquía, áreas táctiles y `reduced-motion` |
| **SEO** | **5/10** | Meta tags presentes pero `og:image` roto, sin robots/sitemap, metadatos duplicados en todas las rutas |
| **Potencial tras las mejoras** | **9/10** | La base conceptual y el contenido son buenos; los problemas son de ejecución y limpieza, no de diseño fundamental |

### Conclusión

Este es un proyecto **rescatable y con techo alto**, no uno que haya que rehacer. La distancia entre lo que es hoy y un producto profesional es sobre todo **disciplina de limpieza y consolidación**, no capacidad técnica: el mapa interactivo y el modelo de datos demuestran que aquí hubo trabajo de buen nivel.

El patrón dominante es el esperable de un desarrollo iterativo con IA sin visión global: **cada iteración agregó, ninguna quitó**. Hay tres formas de hacer un botón, dos de detectar scroll, componentes completos inalcanzables y tokens de diseño que nadie usa. La solución no es más código, es **decidir cuál es la forma correcta de cada cosa y borrar el resto**.

Si tuviera que elegir una sola cosa: **arreglar los links del footer** (C-01). Es media hora de trabajo y hoy cualquier visitante que haga clic en "Contacto" termina mirando una pantalla en blanco.
