import Unete from "../components/Unete";
import { usePageMeta } from "../hooks/usePageMeta";

export default function UnetePage() {
  usePageMeta(
    "Únete",
    "Súmate como voluntario a Proyecta: participa en operativos comunitarios, desarrolla habilidades de liderazgo y forma parte de una red interuniversitaria.",
  );
  return <Unete />;
}
