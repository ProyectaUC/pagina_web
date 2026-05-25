# Proyecta CAI — Sitio Web Oficial

Portafolio institucional del voluntariado **Proyecta**, desplegado en [proyecta.cai.cl](https://proyecta.cai.cl).

## 🛠 Stack tecnológico

| Herramienta | Versión | Rol |
|---|---|---|
| **Vite** | 5.x | Bundler / dev server |
| **React** | 18.x | UI framework |
| **TailwindCSS** | 3.x | Utilidades CSS |
| **Lucide React** | 0.383 | Iconografía |
| **gh-pages** | 6.x | Deploy automatizado |

**¿Por qué este stack?** Vite + React ofrece el mejor balance entre DX, performance y build size para una web estática moderna. TailwindCSS permite mantener el design system centralizado. Compatible 100% con GitHub Pages sin servidor.

---

## 🚀 Primeros pasos

### Requisitos
- Node.js 18+ y npm 9+

### Instalación
```bash
git clone https://github.com/TU_ORG/proyecta-web.git
cd proyecta-web
npm install
```

### Desarrollo local
```bash
npm run dev
# Abre http://localhost:5173
```

### Build de producción
```bash
npm run build
# Genera /dist con los archivos estáticos
```

### Preview del build
```bash
npm run preview
```

---

## 📦 Deploy en GitHub Pages

### Opción A: Automático (recomendado)

1. En `package.json`, el script `deploy` ya está configurado:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

2. Asegúrate de que el repositorio está en GitHub y ejecuta:
   ```bash
   npm run deploy
   ```

3. En GitHub → Settings → Pages → Source: selecciona la rama `gh-pages`.

### Opción B: GitHub Actions (CI/CD)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: proyecta.cai.cl
```

---

## 🌐 Dominio personalizado (`proyecta.cai.cl`)

### 1. CNAME en el repo
El archivo `public/CNAME` ya contiene:
```
proyecta.cai.cl
```
Este archivo se copia automáticamente al build.

### 2. DNS con tu proveedor
Configura en el panel DNS de `cai.cl`:

```
# Si es subdominio (proyecta.cai.cl) → CNAME
proyecta  CNAME  TU_ORG.github.io.

# Con TTL de 3600
```

### 3. HTTPS
GitHub Pages activa SSL automáticamente para dominios personalizados. Puede tardar hasta 24h después de la propagación DNS.

---

## 🎨 Actualizar branding desde Figma

### Colores
Edita **UN solo archivo**: `src/styles/theme/brand.js`
```js
export const colors = {
  navy:     '#1B3A4B',  // ← Reemplaza con HEX de Figma
  cyan:     '#40D0F0',  // ← Color signature
  yellow:   '#FFBB00',  // ← Acento
  // ...
}
```

Y también `tailwind.config.js` sección `theme.extend.colors.proyecta`.

### Logo y assets SVG
1. Exporta SVG desde Figma
2. Colócalos en:
   ```
   public/assets/logos/logo.svg          ← Logo principal
   public/assets/logos/logo-white.svg    ← Versión blanca para fondos oscuros
   public/assets/logos/favicon.svg       ← Ícono 32x32
   public/assets/icons/                  ← Set de íconos
   public/assets/illustrations/          ← Ilustraciones de secciones
   ```
3. Actualiza las rutas en `src/styles/theme/brand.js`:
   ```js
   export const assets = {
     logo: '/assets/logos/logo.svg',  // ← Cambia la extensión
     // ...
   }
   ```

### Tipografías
Si Figma usa fuentes distintas:
1. Añade el link en `index.html`
2. Actualiza `tailwind.config.js` → `fontFamily`
3. Actualiza las variables en `src/index.css` → `:root`

---

## 💳 Integrar pagos (sin backend propio)

### Mercado Pago — Payment Links
```html
<!-- El link de pago se genera en el panel de Mercado Pago -->
<a href="https://mpago.la/TU_LINK">Donar con Mercado Pago</a>
```
O con el SDK JS para personalización avanzada:
```
npm install @mercadopago/sdk-react
```
Docs: https://www.mercadopago.cl/developers

### Stripe — Payment Links
1. Crea un Payment Link en el dashboard de Stripe
2. Reemplaza el botón placeholder en `src/components/Apoyanos.jsx`:
```jsx
<a href="https://buy.stripe.com/TU_LINK" className="btn-primary">
  Donar con Stripe
</a>
```
Docs: https://stripe.com/docs/payment-links

### Recomendación
Para donaciones sin backend, usa **Payment Links** de ambas plataformas.
Son URLs estáticas que no requieren servidor. Para más control (montos dinámicos),
integra una función serverless con **Netlify Functions** o **Vercel Edge Functions**.

---

## 📁 Estructura del proyecto

```
proyecta-web/
├── public/
│   ├── assets/
│   │   ├── logos/          ← 🔄 Logos SVG de Figma aquí
│   │   ├── icons/          ← 🔄 Íconos de Figma aquí
│   │   └── illustrations/  ← 🔄 Ilustraciones de Figma aquí
│   └── CNAME               ← Dominio personalizado
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      ← Barra de navegación sticky
│   │   ├── Hero.jsx        ← Landing principal
│   │   ├── QuienesSomos.jsx← Misión/Visión/Valores
│   │   ├── Impacto.jsx     ← Dashboard con stats
│   │   ├── Programas.jsx   ← Cards de proyectos
│   │   ├── Apoyanos.jsx    ← Voluntarios/Sponsors/Donaciones
│   │   └── Contacto.jsx    ← Formulario + Footer
│   ├── hooks/
│   │   └── useAnimations.js← InView, dark mode, counter
│   ├── styles/
│   │   └── theme/
│   │       └── brand.js    ← 🎨 CENTRO DEL BRANDING
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           ← Variables CSS + clases base
├── index.html              ← SEO meta tags + Google Fonts
├── tailwind.config.js      ← Colores/fuentes/animaciones Tailwind
├── vite.config.js          ← Config build (base path)
├── package.json
└── README.md
```

---

## 🧰 Comandos rápidos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run deploy   # Deploy a GitHub Pages
```

---

## ✅ Checklist pre-deploy

- [ ] Actualizar contenido en `src/styles/theme/brand.js`
- [ ] Reemplazar logo placeholder con SVG oficial
- [ ] Configurar DNS en proveedor de `cai.cl`
- [ ] Verificar dominio en GitHub Pages settings
- [ ] Habilitar HTTPS en GitHub Pages
- [ ] Añadir OG Image real en `public/assets/logos/og-image.png`
- [ ] Conectar formularios (Formspree / Netlify Forms)
- [ ] Integrar Payment Links de Mercado Pago y Stripe
