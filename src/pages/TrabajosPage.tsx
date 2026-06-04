import { useState } from "react";
// import { useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Impacto from "../components/Impacto";
// import {
//   Compass,
//   ChevronDown,
//   ArrowLeft,
//   Heart,
//   Lightbulb,
//   Building2,
//   HandHeart,
//   Leaf,
// } from "lucide-react";
import InteractiveChileMap from "../components/map/InteractiveChileMap";
import CommunityModal from "../components/map/CommunityModal";
import { communities } from "../data/communities";
// import { categoryColors, categoryLabels } from "../data/communities";
import type { Community } from "../data/communities";
// import type { Category } from "../data/communities";

// ── Category filter config ───────────────────────────────────
// const CATEGORY_ICONS: Record<
//   Category | "all",
//   React.ComponentType<{ size?: number; strokeWidth?: number }>
// > = {
//   all: Compass,
//   Trabajos: Heart,
//   Operaciones: Lightbulb,
//   Intervenciones: Building2,
//   Operativos: HandHeart,
// };
//
// const ALL_CATEGORIES: Array<{ id: Category | "all"; label: string }> = [
//   { id: "all", label: "Todos" },
//   { id: "Trabajos", label: "Trabajos" },
//   { id: "Operaciones", label: "Operaciones" },
//   { id: "Intervenciones", label: "Intervenciones" },
//   { id: "Operativos", label: "Operativos" },
// ];

// ── Community list item ──────────────────────────────────────
// function CommunityListItem({
//   community,
//   isActive,
//   onClick,
// }: {
//   community: Community;
//   isActive: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <motion.button
//       layout
//       initial={{ opacity: 0, x: -10 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -10 }}
//       transition={{ duration: 0.2 }}
//       onClick={onClick}
//       className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 group
//                   transition-all duration-200 border ${
//                     isActive
//                       ? "bg-proyecta-cyan/10 border-proyecta-cyan/30"
//                       : "border-transparent hover:bg-white/5 hover:border-white/10"
//                   }`}
//     >
//       {/* Color dot */}
//       <span
//         className="flex-none w-2.5 h-2.5 rounded-full"
//         style={{ background: categoryColors[community.category] }}
//       />
//       <div className="min-w-0 flex-1">
//         <div
//           className={`text-sm font-semibold truncate transition-colors ${
//             isActive
//               ? "text-proyecta-cyan"
//               : "text-white/80 group-hover:text-white"
//           }`}
//         >
//           {community.name}
//         </div>
//         <div className="text-xs text-white/40 truncate">
//           {community.regionCode} · {community.year}
//         </div>
//       </div>
//       <ChevronDown
//         size={14}
//         className={`flex-none text-white/30 -rotate-90 transition-transform ${
//           isActive ? "text-proyecta-cyan" : "group-hover:translate-x-0.5"
//         }`}
//       />
//     </motion.button>
//   );
// }

// ── Legend chip ──────────────────────────────────────────────
// function LegendChip({
//   category,
//   count,
// }: {
//   category: Category;
//   count: number;
// }) {
//   return (
//     <div className="flex items-center gap-1.5">
//       <span
//         className="w-2 h-2 rounded-full"
//         style={{ background: categoryColors[category] }}
//       />
//       <span className="text-xs text-white/50">{categoryLabels[category]}</span>
//       <span className="text-xs text-white/30">({count})</span>
//     </div>
//   );
// }

// ── Main Page ────────────────────────────────────────────────
export default function TrabajosPage() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null,
  );
  // const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  // const filteredCommunities = useMemo(
  //   () =>
  //     activeCategory === "all"
  //       ? communities
  //       : communities.filter((c) => c.category === activeCategory),
  //   [activeCategory],
  // );

  // // Stats for the current filter
  // const stats = useMemo(
  //   () => ({
  //     total: filteredCommunities.length,
  //     regions: new Set(filteredCommunities.map((c) => c.regionCode)).size,
  //     firstYear: Math.min(...filteredCommunities.map((c) => c.year)),
  //     lastYear: Math.max(...filteredCommunities.map((c) => c.year)),
  //   }),
  //   [filteredCommunities],
  // );

  // // Category counts
  // const categoryCounts = useMemo(() => {
  //   const counts: Partial<Record<Category, number>> = {};
  //   for (const c of communities) {
  //     counts[c.category] = (counts[c.category] ?? 0) + 1;
  //   }
  //   return counts;
  // }, []);

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

      {/* ── Impacto section ──────────────────────────────────── */}
      {/* <section className="pb-6">
        <Impacto variant="full" />
      </section> */}

      {/* ── Map section (mobile-first, full-height) ──────────── */}
      <section className="relative flex-1 min-h-[80vh] sm:min-h-[75vh] lg:min-h-[80vh]">
        <InteractiveChileMap
          communities={communities}
          activeCategory="all"
          onSelectCommunity={setSelectedCommunity}
        />
      </section>

      {/* ── Top bar / Sidebar / Filters / Legend / Hints (disabled) ── */}
      {/*
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/8">
        <div className="flex items-center gap-4">
          <div>
            <h1
              className="text-base sm:text-lg font-black text-white leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Nuestros Trabajos
            </h1>
            <p className="text-xs text-white/40 mt-0.5 hidden sm:block">
              Historia de intervención territorial
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
            <span className="font-bold text-proyecta-cyan">{stats.total}</span>{" "}
            comunidades
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
            <span className="font-bold text-proyecta-yellow">
              {stats.regions}
            </span>{" "}
            regiones
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
            {stats.firstYear === stats.lastYear
              ? stats.firstYear
              : `${stats.firstYear}–${stats.lastYear}`}
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10
                     text-white/60 hover:text-white transition-colors"
        >
          <Compass size={18} />
        </button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              key="sidebar"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute lg:relative z-20 top-0 left-0 h-full
                         w-72 xl:w-80 flex-none flex flex-col
                         border-r border-white/8 overflow-hidden"
              style={{
                background: "rgba(13, 31, 42, 0.97)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="p-4 border-b border-white/8">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                  Filtrar por área
                </p>
                <div className="flex flex-wrap gap-2">
                  {ALL_CATEGORIES.map(({ id, label }) => {
                    const Icon = CATEGORY_ICONS[id];
                    const color = id === "all" ? "#40D0F0" : categoryColors[id];
                    const count =
                      id === "all"
                        ? communities.length
                        : (categoryCounts[id] ?? 0);
                    const isActive = activeCategory === id;

                    return (
                      <button
                        key={id}
                        onClick={() => setActiveCategory(id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                                    border transition-all duration-200 ${
                                      isActive
                                        ? "text-proyecta-navy border-transparent"
                                        : "text-white/50 border-white/10 hover:border-white/25 hover:text-white/80"
                                    }`}
                        style={
                          isActive
                            ? { background: color, borderColor: color }
                            : {}
                        }
                      >
                        <Icon size={11} strokeWidth={2.5} />
                        {label}
                        <span
                          className={`${isActive ? "text-proyecta-navy/60" : "text-white/25"} text-[10px]`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className="flex-1 overflow-y-auto p-3"
                style={{ scrollbarWidth: "thin" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2 px-1">
                  {filteredCommunities.length} comunidades
                </p>
                <div className="space-y-0.5">
                  <AnimatePresence>
                    {filteredCommunities.map((community) => (
                      <CommunityListItem
                        key={community.id}
                        community={community}
                        isActive={selectedCommunity?.id === community.id}
                        onClick={() => setSelectedCommunity(community)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-4 border-t border-white/8">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                  Leyenda
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {(Object.keys(categoryColors) as Category[]).map((cat) => (
                    <LegendChip
                      key={cat}
                      category={cat}
                      count={categoryCounts[cat] ?? 0}
                    />
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="relative flex-1 overflow-hidden">
          <AnimatePresence>
            {!selectedCommunity && (
              <motion.div
                key="hint"
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.8, duration: 0.5 },
                }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                className="absolute top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full
                                text-xs font-semibold text-white/60
                                border border-white/10 bg-black/30 backdrop-blur-sm"
                >
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-proyecta-cyan"
                  />
                  Explora los proyectos — haz click en un punto
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="absolute bottom-5 right-5 z-10 text-[10px] text-white/25 text-right
                          pointer-events-none hidden sm:block"
          >
            Scroll para hacer zoom · Arrastra para navegar
          </div>

          <InteractiveChileMap
            communities={communities}
            activeCategory={activeCategory}
            onSelectCommunity={setSelectedCommunity}
          />

          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl
                         bg-black/40 backdrop-blur-sm border border-white/10
                         text-white/60 hover:text-white text-xs font-semibold transition-colors"
            >
              <Compass size={14} />
              <span className="hidden sm:block">Explorar</span>
            </button>
          )}
        </main>
      </div>
      */}

      <CommunityModal
        community={selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
      />
    </div>
  );
}
