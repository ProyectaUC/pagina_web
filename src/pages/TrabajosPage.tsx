import { useState, useMemo } from "react";
import InteractiveChileMap from "../components/map/InteractiveChileMap";
import CommunityModal from "../components/map/CommunityModal";
import { communities, categoryColors, categoryLabels } from "../data/communities";
import type { Community, Category } from "../data/communities";
import { usePageMeta } from "../hooks/usePageMeta";

const CATEGORIES: Category[] = ["Verano", "Otoño", "Invierno"];

// ── Main Page ────────────────────────────────────────────────
export default function TrabajosPage() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null,
  );

  const { count, minYear, maxYear } = useMemo(() => {
    const years = communities.map((c) => c.year);
    return {
      count: communities.length,
      minYear: Math.min(...years),
      maxYear: Math.max(...years),
    };
  }, []);

  usePageMeta(
    "Trabajos",
    `Explora el mapa interactivo con ${count} trabajos de intervención territorial de Proyecta en comunidades de Chile, entre ${minYear} y ${maxYear}.`,
  );

  return (
    <div className="relative pt-20 flex flex-col min-h-screen overflow-hidden bg-gradient-hero">
      {/* ── Header section ───────────────────────────────────── */}
      <section className="pb-6">
        <div className="section-container text-center flex flex-col items-center">
          <span className="section-tag bg-white/10 border-white/20 text-white">Exploracion</span>
          <h1 className="section-title mt-4 text-white">Nuestros Trabajos</h1>
          <span className="decorative-line mx-auto" />
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Historia de intervencion territorial en comunidades de Chile.
          </p>
          <p className="mt-3 text-xs sm:text-sm font-semibold text-proyecta-cyan">
            {count} trabajos · {minYear}–{maxYear} · haz clic en un punto para ver el detalle
          </p>

          {/* Leyenda de temporadas — solo informativa, no filtra */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="flex items-center gap-1.5 text-xs text-white/60"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: categoryColors[cat] }}
                />
                {categoryLabels[cat]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map section (mobile-first, full-height) ──────────── */}
      <section className="relative flex-1 min-h-[80vh] sm:min-h-[75vh] lg:min-h-[80vh]">
        <InteractiveChileMap
          communities={communities}
          activeCategory="all"
          onSelectCommunity={setSelectedCommunity}
        />
      </section>

      <CommunityModal
        community={selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
      />
    </div>
  );
}
