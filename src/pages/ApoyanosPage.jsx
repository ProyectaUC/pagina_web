import Apoyanos from "../components/Apoyanos";
import { usePageMeta } from "../hooks/usePageMeta";

export default function ApoyanosPage() {
  usePageMeta(
    "Apóyanos",
    "Empresas y personas pueden apoyar a Proyecta como sponsor o con una donación para financiar operativos de construcción comunitaria en Chile.",
  );
  return <Apoyanos />;
}
