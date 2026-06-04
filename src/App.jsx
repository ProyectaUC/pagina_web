import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import QuienesSomosPage from "./pages/QuienesSomosPage";
// import ImpactoPage from "./pages/ImpactoPage";
import HistoriaPage from "./pages/HistoriaPage";
import ApoyanosPage from "./pages/ApoyanosPage";
import ContactoPage from "./pages/ContactoPage";
import TrabajosPage from "./pages/TrabajosPage";
import EquipoPage from "./pages/EquipoPage";

function Layout() {
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
        <Route path="contacto" element={<ContactoPage />} />
      </Route>
    </Routes>
  );
}
