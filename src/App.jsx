import { useEffect } from "react"; // <-- 1. Importa useEffect
import { Routes, Route, Outlet, useLocation } from "react-router-dom"; // <-- 2. Añade useLocation
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import QuienesSomosPage from "./pages/QuienesSomosPage";
// import ImpactoPage from "./pages/ImpactoPage";
import HistoriaPage from "./pages/HistoriaPage";
import ApoyanosPage from "./pages/ApoyanosPage";
// import ContactoPage from "./pages/ContactoPage";
import TrabajosPage from "./pages/TrabajosPage";
import EquipoPage from "./pages/EquipoPage";

function Layout() {
  const { pathname } = useLocation(); // <-- 3. Obtenemos la ruta actual

  // <-- 4. Forzamos el scroll al inicio cada vez que la ruta cambia
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D1F2A] font-sans">
      <Navbar />

      <main>
        <Outlet />
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
        <Route path="apoyanos" element={<ApoyanosPage />} />
        {/* <Route path="contacto" element={<ContactoPage />} /> */}
      </Route>
    </Routes>
  );
}
