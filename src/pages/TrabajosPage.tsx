import { useState } from "react";
import InteractiveChileMap from "../components/map/InteractiveChileMap";
import CommunityModal from "../components/map/CommunityModal";
import { communities } from "../data/communities";
// import { categoryColors, categoryLabels } from "../data/communities";
import type { Community } from "../data/communities";
// import type { Category } from "../data/communities";

// ── Main Page ────────────────────────────────────────────────
export default function TrabajosPage() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null,
  );

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
          <span className="section-tag">Exploracion</span>
          <h1 className="section-title mt-4 text-white">Nuestros Trabajos</h1>
          <span className="decorative-line mx-auto" />
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Historia de intervencion territorial en comunidades de Chile.
          </p>
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
