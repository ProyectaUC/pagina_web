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

// ── Local GeoJSON for Chile regions (WGS84 SimpleMaps structure) ──
const CHILE_GEO_URL = `${import.meta.env.BASE_URL}/assets/geo/cl.json`;

// ── Chile projection config ──────────────────────────────────
const PROJECTION_CONFIG = {
  scale: 1250,
  center: [-71.5, -37] as [number, number],
};

const DEFAULT_CENTER: [number, number] = [-71.5, -38.5]; // Chile central
const DEFAULT_ZOOM = 1.5;
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 6;
const ZOOM_STEP = 1;

// Por debajo de este factor de zoom-corrección, los trazos finos (stroke de
// regiones, anillo de pulso) dejan de reducirse: a zoom muy alto, dividir
// todo literalmente por `zoom` los volvería invisibles. Mantenemos un
// "piso" perceptible para que el mapa se siga viendo nítido y vivo.
const MIN_SCALE_DIVISOR = 2.2;

// Calcula el divisor de escala a usar para trazos/radios: escala
// proporcionalmente con el zoom, pero nunca más agresivo que el piso.
const scaleDivisor = (zoom: number) => Math.min(zoom, MIN_SCALE_DIVISOR);

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
// Tamaños "base" del marcador, en unidades del SVG sin corregir por zoom.
// El ajuste por zoom se aplica una sola vez, como transform de escala en
// el <g> envolvente — así el pulso infinito (que vive adentro) nunca se
// reinicia cuando el usuario hace zoom, y el cambio de tamaño se anima
// suavemente en vez de saltar de golpe.
const BASE_MAIN_RADIUS = 3;
const BASE_PULSE_RADIUS = 5;
const BASE_INNER_RADIUS = 1;
const BASE_STROKE_MAIN = 1;
const BASE_STROKE_PULSE = 1;

const CommunityMarker = memo(function CommunityMarker({
  community,
  isFiltered,
  zoom,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  community: Community;
  isFiltered: boolean;
  zoom: number;
  onSelect: (c: Community) => void;
  onHoverStart: (c: Community, e: React.MouseEvent) => void;
  onHoverEnd: () => void;
}) {
  const color = categoryColors[community.category];

  // Usamos scaleDivisor (con piso) en vez de dividir directo por zoom:
  // así el punto se va achicando de forma natural a medida que entras,
  // pero no se vuelve un punto invisible a zoom alto — se asienta en un
  // tamaño mínimo legible, como hacen Google Maps / Mapbox.
  const groupScale = 1 / scaleDivisor(zoom);

  return (
    <Marker coordinates={community.coordinates}>
      {/* Wrapper que absorbe el escalado por zoom. Anima suavemente cada
          vez que `groupScale` cambia (botones +/-, pinch, etc.), sin
          afectar las animaciones internas (pulso, hover). */}
      <motion.g
        animate={{ scale: groupScale }}
        transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
      >
        {/* Pulse ring — radios fijos; el <g> externo ya escala todo */}
        <motion.circle
          r={BASE_PULSE_RADIUS}
          fill="transparent"
          stroke={color}
          strokeWidth={BASE_STROKE_PULSE}
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
          r={BASE_MAIN_RADIUS}
          fill={color}
          stroke="white"
          strokeWidth={BASE_STROKE_MAIN}
          style={{
            cursor: "pointer",
            filter: `drop-shadow(0px 2px 8px ${color}88)`,
            opacity: isFiltered ? 1 : 0.25,
          }}
          whileHover={
            isFiltered
              ? { scale: 1.4, filter: `drop-shadow(0px 4px 12px ${color}cc)` }
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
            r={BASE_INNER_RADIUS}
            fill="white"
            opacity={0.8}
            style={{ pointerEvents: "none" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          />
        )}
      </motion.g>
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

  // Nota sobre el contorno de las regiones: en vez de recalcular el
  // strokeWidth a mano según el zoom, usamos `vectorEffect:
  // "non-scaling-stroke"` (ver abajo en <Geography>). Esa propiedad SVG
  // nativa mantiene el grosor del trazo constante en píxeles de pantalla
  // sin importar cuánto se haga zoom — es más preciso que aproximarlo
  // matemáticamente, y es el mismo truco que usan herramientas de mapas
  // como Mapbox GL para que los bordes nunca se vean ni gigantes ni
  // invisibles.

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
          {/* ── Renderizado del GeoJSON de SimpleMaps ──
              El borde entre regiones usa vectorEffect: "non-scaling-stroke"
              (ver style abajo), así que su grosor en pantalla se mantiene
              constante sin importar el zoom: ni se ve grueso de cerca ni
              desaparece al alejar. */}
          <Geographies geography={CHILE_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  // Se usa la clave oficial única del objeto properties (ej: "CLAP", "CLRM")
                  key={geo.properties.id || geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#1B3A4B",
                      stroke: "#29B6D8",
                      strokeWidth: 0.6,
                      outline: "none",
                      vectorEffect: "non-scaling-stroke",
                    },
                    hover: {
                      fill: "#1B5E7A",
                      stroke: "#40D0F0",
                      strokeWidth: 0.9,
                      outline: "none",
                      vectorEffect: "non-scaling-stroke",
                    },
                    pressed: {
                      fill: "#1B5E7A",
                      outline: "none",
                      vectorEffect: "non-scaling-stroke",
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
              zoom={position.zoom}
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
