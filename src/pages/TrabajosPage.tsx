import { useState } from "react";
import InteractiveChileMap from "../components/map/InteractiveChileMap";
import CommunityModal from "../components/map/CommunityModal";
import { communities, categoryColors, categoryLabels } from "../data/communities";
import type { Community, Category } from "../data/communities";

const CATEGORY_ORDER: Category[] = ["Verano", "Otoño", "Invierno"];

const totalTrabajos = communities.length;
const years = communities.map((c) => c.year);
const minYear = Math.min(...years);
const maxYear = Math.max(...years);

// ── Main Page ────────────────────────────────────────────────
export default function TrabajosPage() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  return (
    <div
      className="relative pt-20 flex flex-col min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1B3A4B 0%, #1B5E7A 60%, #1B9AB5 100%)",
      }}
    >
      {/* ── Header section ───────────────────────────────────── */}
      <section className="pb-6">
        <div className="section-container text-center flex flex-col items-center">
          <span className="section-tag bg-white/10 border-white/20 text-white">Exploracion</span>
          <h1 className="section-title mt-4 text-white">Nuestros Trabajos</h1>
          <span className="decorative-line mx-auto" />
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Historia de intervencion territorial en comunidades de Chile.{" "}
            <span className="text-white font-semibold">
              {totalTrabajos} trabajos, {minYear}–{maxYear}.
            </span>
          </p>

          {/* ── Leyenda / filtro de temporadas ── */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              aria-pressed={activeCategory === "all"}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all ${
                activeCategory === "all"
                  ? "bg-white text-proyecta-navy border-white"
                  : "border-white/30 text-white/70 hover:border-white/60 hover:text-white"
              }`}
            >
              Todos
            </button>
            {CATEGORY_ORDER.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setActiveCategory((c) => (c === cat ? "all" : cat))
                  }
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all ${
                    isActive
                      ? "border-transparent text-proyecta-navy"
                      : "border-white/30 text-white/70 hover:border-white/60 hover:text-white"
                  }`}
                  style={isActive ? { backgroundColor: categoryColors[cat] } : undefined}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: categoryColors[cat] }}
                  />
                  {categoryLabels[cat]}
                </button>
              );
            })}
          </div>

          {/* ── Hint de interactividad ── */}
          <p className="text-xs text-white/50 mt-3">
            Haz clic en un punto del mapa para conocer el trabajo realizado ahí.
          </p>
        </div>
      </section>

      {/* ── Map section (mobile-first, full-height) ──────────── */}
      <section className="relative flex-1 min-h-[80vh] sm:min-h-[75vh] lg:min-h-[80vh]">
        <InteractiveChileMap
          communities={communities}
          activeCategory={activeCategory}
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
