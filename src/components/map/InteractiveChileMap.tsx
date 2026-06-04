import { useState, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import type { Community, Category } from "../../data/communities";
import { categoryColors } from "../../data/communities";

// ── Local GeoJSON for Chile regions (bundled, no CDN dependency) ──
const CHILE_GEO_URL = `${import.meta.env.BASE_URL}/assets/geo/chile-regions.json`;

// ── Chile projection config ──────────────────────────────────
// Chile: lon ≈ -75 to -66, lat ≈ -56 to -17
// Center of mainland: [-71, -37]
const PROJECTION_CONFIG = {
  scale: 1250,
  center: [-71.5, -37] as [number, number],
};

// ── Types ────────────────────────────────────────────────────
interface TooltipState {
  community: Community;
  x: number;
  y: number;
}

interface Props {
  communities: Community[];
  activeCategory: Category | "all";
  onSelectCommunity: (c: Community) => void;
}

// ── Marker component (memoized for performance) ──────────────
const CommunityMarker = memo(function CommunityMarker({
  community,
  isFiltered,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  community: Community;
  isFiltered: boolean;
  onSelect: (c: Community) => void;
  onHoverStart: (c: Community, e: React.MouseEvent) => void;
  onHoverEnd: () => void;
}) {
  const color = categoryColors[community.category];

  return (
    <Marker coordinates={community.coordinates}>
      {/* Pulse ring */}
      <motion.circle
        r={14}
        fill="transparent"
        stroke={color}
        strokeWidth={1.5}
        initial={{ scale: 1, opacity: 0.4 }}
        animate={
          isFiltered
            ? { scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }
            : { scale: 1, opacity: 0 }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Main dot */}
      <motion.circle
        r={7}
        fill={color}
        stroke="white"
        strokeWidth={1.8}
        style={{
          cursor: "pointer",
          filter: `drop-shadow(0 2px 8px ${color}88)`,
          opacity: isFiltered ? 1 : 0.25,
        }}
        whileHover={
          isFiltered
            ? { scale: 1.55, filter: `drop-shadow(0 4px 14px ${color}cc)` }
            : {}
        }
        whileTap={isFiltered ? { scale: 0.9 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={() => isFiltered && onSelect(community)}
        onMouseEnter={(e) =>
          isFiltered &&
          onHoverStart(community, e as unknown as React.MouseEvent)
        }
        onMouseLeave={onHoverEnd}
      />

      {/* Inner highlight */}
      {isFiltered && (
        <motion.circle
          r={2.5}
          fill="white"
          opacity={0.8}
          style={{ pointerEvents: "none" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        />
      )}
    </Marker>
  );
});

// ── Tooltip ──────────────────────────────────────────────────
// function MapTooltip({ tooltip }: { tooltip: TooltipState | null }) {
//   return (
//     <AnimatePresence>
//       {tooltip && (
//         <motion.div
//           key={tooltip.community.id}
//           initial={{ opacity: 0, scale: 0.92, y: 6 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.92, y: 4 }}
//           transition={{ duration: 0.15 }}
//           className="fixed z-40 pointer-events-none"
//           style={{ left: tooltip.x + 14, top: tooltip.y - 48 }}
//         >
//           <div
//             className="px-3.5 py-2.5 rounded-xl shadow-xl border border-white/10"
//             style={{
//               background: 'rgba(15, 30, 45, 0.95)',
//               backdropFilter: 'blur(12px)',
//               minWidth: 160,
//             }}
//           >
//             <div className="flex items-center gap-2 mb-0.5">
//               <span
//                 className="w-2 h-2 rounded-full flex-none"
//                 style={{ background: categoryColors[tooltip.community.category] }}
//               />
//               <span className="text-xs font-bold text-white truncate">
//                 {tooltip.community.name}
//               </span>
//             </div>
//             <div className="text-[11px] text-white/50 pl-4">
//               {tooltip.community.regionCode} · {tooltip.community.year}
//             </div>
//           </div>
//           {/* Arrow */}
//           <div
//             className="w-2.5 h-2.5 rotate-45 mx-3 -mt-1.5 rounded-sm"
//             style={{ background: 'rgba(15, 30, 45, 0.95)' }}
//           />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// ── Main Component ───────────────────────────────────────────
export default function InteractiveChileMap({
  communities,
  activeCategory,
  onSelectCommunity,
}: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleHoverStart = useCallback(
    (community: Community, e: React.MouseEvent) => {
      setTooltip({ community, x: e.clientX, y: e.clientY });
    },
    [],
  );

  const handleHoverEnd = useCallback(() => {
    setTooltip(null);
  }, []);

  const isFiltered = useCallback(
    (c: Community) => activeCategory === "all" || c.category === activeCategory,
    [activeCategory],
  );

  return (
    <div className="relative w-full h-full select-none">
      {/* Tooltip (rendered outside SVG in DOM) */}
      {/* <MapTooltip tooltip={tooltip} /> */}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJECTION_CONFIG}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={[-71.5, -37]} zoom={1} minZoom={0.8} maxZoom={6}>
          {/* ── Chile regions fill ── */}
          <Geographies geography={CHILE_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#1B3A4B",
                      stroke: "#29B6D8",
                      strokeWidth: 0.4,
                      outline: "none",
                    },
                    hover: {
                      fill: "#1B5E7A",
                      stroke: "#40D0F0",
                      strokeWidth: 0.6,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#1B5E7A",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {/* ── Community markers ── */}
          {communities.map((community) => (
            <CommunityMarker
              key={community.id}
              community={community}
              isFiltered={isFiltered(community)}
              onSelect={onSelectCommunity}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
