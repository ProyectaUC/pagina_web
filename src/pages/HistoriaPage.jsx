import Historia from "../components/Historia";
import { usePageMeta } from "../hooks/usePageMeta";

export default function HistoriaPage() {
  usePageMeta("Historia");
  return <Historia />;
}
