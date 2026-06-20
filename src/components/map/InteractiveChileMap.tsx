import { useState, useCallback, useRef, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Maximize2, Hand } from "lucide-react";
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

const DEFAULT_CENTER: [number, number] = [-71.5, -37];
const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 6;
const ZOOM_STEP = 1.5;

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

// ── Main Component ───────────────────────────────────────────
export default function InteractiveChileMap({
  communities,
  activeCategory,
  onSelectCommunity,
}: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

  // Controla si el mapa "captura" el gesto (pan/zoom) o si se deja que la
  // página haga scroll normal. En desktop, el zoom solo se activa con
  // Ctrl/Cmd + scroll (ver filterZoomEvent abajo). En touch, se activa con
  // pinch (2 dedos) o con pan de 1 dedo una vez que ya hay zoom aplicado.
  const [isMapActive, setIsMapActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const flashHint = useCallback(() => {
    setShowHint(true);
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = setTimeout(() => setShowHint(false), 1400);
  }, []);

  // ── Desktop: el wheel normal debe hacer scroll de la página, no zoom.
  // ZoomableGroup ya filtra esto vía filterZoomEvent (solo zoomea si hay
  // Ctrl/Cmd). Aquí solo detectamos el caso "sin Ctrl" para mostrar el
  // aviso una vez, sin interferir con el scroll nativo del navegador. ──
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!e.ctrlKey && !e.metaKey) {
        flashHint();
      }
    },
    [flashHint],
  );

  // ── Touch: con UN dedo, el gesto por defecto es scroll de página
  // (comportamiento nativo). Pero si el usuario ya hizo zoom (está
  // explorando de cerca), un dedo debe poder mover el mapa: en ese caso
  // activamos el modo "mapa" igual que con pinch. Con DOS dedos (pinch)
  // siempre es zoom del mapa, sin importar el nivel de zoom actual. ──
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const isPinch = e.touches.length >= 2;
      const isPanningZoomedMap = e.touches.length === 1 && position.zoom > DEFAULT_ZOOM;
      if (isPinch || isPanningZoomedMap) {
        setIsMapActive(true);
      }
    },
    [position.zoom],
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) {
      // pequeño delay para permitir que termine el gesto de pinch/pan
      setTimeout(() => setIsMapActive(false), 150);
    }
  }, []);

  const zoomBy = useCallback((factor: number) => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, pos.zoom * factor)),
    }));
  }, []);

  const resetView = useCallback(() => {
    setPosition({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        // Con un dedo y zoom por defecto: pan-y permite que el navegador
        // haga scroll vertical de página normalmente. Una vez que hay zoom
        // aplicado (el usuario ya está explorando de cerca) o durante un
        // pinch, bloqueamos touch-action para que el gesto del mapa sea
        // fluido sin que el navegador lo interprete como scroll de página.
        touchAction: isMapActive || position.zoom > DEFAULT_ZOOM ? "none" : "pan-y",
      }}
    >
      {/* Tooltip (rendered outside SVG in DOM) */}
      {/* <MapTooltip tooltip={tooltip} /> */}

      {/* ── Aviso breve: scroll normal no hace zoom (desktop) ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white shadow-lg"
            style={{
              background: "rgba(15, 30, 45, 0.92)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Hand size={13} className="text-proyecta-cyan" />
            Usa <kbd className="px-1.5 py-0.5 rounded bg-white/15 font-semibold">Ctrl</kbd>{" "}
            + scroll (o ⌘ + scroll) para hacer zoom
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Controles de zoom visibles (desktop y mobile) ── */}
      <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-2">
        <button
          type="button"
          aria-label="Acercar"
          onClick={() => zoomBy(ZOOM_STEP)}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-white shadow-lg active:scale-95 transition-transform"
          style={{ background: "rgba(15, 30, 45, 0.85)", backdropFilter: "blur(8px)" }}
        >
          <Plus size={18} />
        </button>
        <button
          type="button"
          aria-label="Alejar"
          onClick={() => zoomBy(1 / ZOOM_STEP)}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-white shadow-lg active:scale-95 transition-transform"
          style={{ background: "rgba(15, 30, 45, 0.85)", backdropFilter: "blur(8px)" }}
        >
          <Minus size={18} />
        </button>
        <button
          type="button"
          aria-label="Restablecer vista"
          onClick={resetView}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-white shadow-lg active:scale-95 transition-transform"
          style={{ background: "rgba(15, 30, 45, 0.85)", backdropFilter: "blur(8px)" }}
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* ── Hint persistente en mobile (más sutil, una sola vez) ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none sm:hidden">
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-white/80"
          style={{ background: "rgba(15, 30, 45, 0.7)" }}
        >
          <Hand size={11} className="text-proyecta-cyan" />
          Pellizca para zoom · Una vez acercado, arrastra para moverte
        </div>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJECTION_CONFIG}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          onMoveStart={() => setIsMapActive(true)}
          onMoveEnd={(pos) => {
            setPosition(pos);
            setIsMapActive(false);
          }}
          // Desactivamos el zoom nativo por wheel del componente:
          // lo manejamos manualmente arriba para poder distinguir
          // scroll normal de página vs. zoom intencional (Ctrl/Cmd).
          filterZoomEvent={(event) => {
            if (event.type === "wheel") {
              return (event as unknown as WheelEvent).ctrlKey || (event as unknown as WheelEvent).metaKey;
            }
            return true;
          }}
        >
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
