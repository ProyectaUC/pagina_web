import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Hammer,
  Quote
} from "lucide-react";
import type { Community } from "../../data/communities";
import { categoryColors, categoryLabels } from "../../data/communities";

interface CommunityModalProps {
  community: Community | null;
  onClose: () => void;
}

// ── Animation variants ───────────────────────────────────────
const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panel = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 32 },
  },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.2 } },
};

// ── Component ────────────────────────────────────────────────
export default function CommunityModal({
  community,
  onClose,
}: CommunityModalProps) {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Reset gallery on community change
  useEffect(() => {
    setPhotoIndex(0);
  }, [community?.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (community) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [community]);

  const prevPhoto = () =>
    setPhotoIndex((i) =>
      i === 0 ? (community?.photos.length ?? 1) - 1 : i - 1,
    );
  const nextPhoto = () =>
    setPhotoIndex((i) =>
      i === (community?.photos.length ?? 1) - 1 ? 0 : i + 1,
    );

  return (
    <AnimatePresence>
      {community && (
        <motion.div
          key="modal-backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
          style={{
            background: "rgba(10, 15, 20, 0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* ── Galería Panel ── */}
          <motion.div
            key="modal-panel"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl flex flex-col rounded-3xl bg-black shadow-2xl overflow-hidden"
          >
            
            {/* ── Botón de Cerrar Flotante ── */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all duration-200 border border-white/20 group"
              aria-label="Cerrar"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* ── Visor de Imagen Principal ── */}
            <div className="relative h-[60vh] sm:h-[70vh] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={photoIndex}
                  src={community.photos[photoIndex]?.url}
                  alt={community.photos[photoIndex]?.caption || community.name}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Controles de Navegación */}
              {community.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md transition-all duration-200"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md transition-all duration-200"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* ── Overlay de Información (Fondo Degradado) ── */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-24 pb-6 px-6 sm:px-10">
                
                {/* Lema (Opcional) */}
                {community.lema && (
                  <div className="flex items-center gap-2 mb-3 text-proyecta-cyan/90">
                    <Quote size={16} className="fill-current opacity-60" />
                    <span className="italic font-medium tracking-wide text-sm sm:text-base">
                      "{community.lema}"
                    </span>
                  </div>
                )}

                {/* Título y Meta */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2 font-display">
                      {community.name} {/* Usualmente aquí va la comuna */}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-proyecta-cyan" />
                        {community.region}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-proyecta-yellow" />
                        {community.year}
                      </span>
                      {/* Categoría Badge */}
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
                      <span 
                        className="px-2.5 py-0.5 rounded text-xs font-bold text-black bg-white"
                        style={{ backgroundColor: categoryColors[community.category] }}
                      >
                        {categoryLabels[community.category]}
                      </span>
                    </div>
                  </div>

                  {/* Lo que se construyó (Secundario) */}
                  {community.construcciones && (
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl max-w-xs">
                      <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-wider mb-1">
                        <Hammer size={12} />
                        Construcción
                      </div>
                      <p className="text-white text-sm font-medium leading-snug">
                        {community.construcciones}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Cinta de Miniaturas (Thumbnails) ── */}
            {community.photos.length > 1 && (
              <div className="bg-[#0A0A0A] p-4 flex items-center justify-center border-t border-white/10">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x">
                  {community.photos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={() => setPhotoIndex(i)}
                      className={`relative flex-none w-20 h-14 rounded-lg overflow-hidden snap-center transition-all duration-300 ${
                        i === photoIndex
                          ? "ring-2 ring-proyecta-cyan opacity-100 scale-105"
                          : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={`Miniatura ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}