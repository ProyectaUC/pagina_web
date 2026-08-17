import Equipo from "../components/Equipo";
import { usePageMeta } from "../hooks/usePageMeta";

export default function EquipoPage() {
  usePageMeta(
    "Equipo",
    "Conoce a los estudiantes que forman parte de Proyecta y a los equipos que hacen posible cada operativo comunitario.",
  );
  return <Equipo />;
}
