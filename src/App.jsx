import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

// El resto de las rutas se cargan bajo demanda: evita que /trabajos
// (react-simple-maps + framer-motion) se descargue en la carga inicial
// de la home, que es la página que recibe la mayoría de las visitas.
const QuienesSomosPage = lazy(() => import("./pages/QuienesSomosPage"));
const HistoriaPage = lazy(() => import("./pages/HistoriaPage"));
const ApoyanosPage = lazy(() => import("./pages/ApoyanosPage"));
const TrabajosPage = lazy(() => import("./pages/TrabajosPage"));
const EquipoPage = lazy(() => import("./pages/EquipoPage"));
const UnetePage = lazy(() => import("./pages/UnetePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-proyecta-cyan/20 border-t-proyecta-cyan animate-spin" />
    </div>
  );
}

function Layout() {
  const { pathname } = useLocation(); // <-- 3. Obtenemos la ruta actual

  // <-- 4. Forzamos el scroll al inicio cada vez que la ruta cambia
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-proyecta-surface font-sans">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-proyecta-cyan focus:text-proyecta-navy focus:font-bold focus:shadow-lg"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido">
        <Suspense fallback={<RouteLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="quienes-somos" element={<QuienesSomosPage />} />
        <Route path="trabajos" element={<TrabajosPage />} />
        <Route path="historia" element={<HistoriaPage />} />
        <Route path="equipo" element={<EquipoPage />} />
        <Route path="unete" element={<UnetePage />} />
        <Route path="apoyanos" element={<ApoyanosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
