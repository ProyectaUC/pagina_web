import QuienesSomos from "../components/QuienesSomos";
import { usePageMeta } from "../hooks/usePageMeta";

export default function QuienesSomosPage() {
  usePageMeta(
    "Quiénes Somos",
    "Conoce la misión, visión y metodología de trabajo de Proyecta, voluntariado universitario dedicado a fortalecer comunidades rurales de Chile.",
  );
  return <QuienesSomos variant="full" />;
}
