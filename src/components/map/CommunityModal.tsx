import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Hammer,
  Heart,
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  GraduationCap,
  Home,
  Package,
  Scale,
  Maximize2,
  ArrowRight,
  Monitor,
  Leaf,
  Trees,
  Trash2,
  Baby,
  Stethoscope,
} from "lucide-react";
import type { Community } from "../../data/communities";
import { categoryColors, categoryLabels } from "../../data/communities";

// ── Icon resolver ────────────────────────────────────────────
const ICON_MAP: Record<
  string,
  React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>
> = {
  Heart,
  Users,
  Calendar,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Clock,
  TrendingUp,
  Home,
  Package,
  Scale,
  Maximize2,
  ArrowRight,
  Monitor,
  Leaf,
  Trees,
  Trash2,
  Baby,
  Hammer,
  MapPin,
};

function MetricIcon({
  name,
  ...props
}: { name: string } & React.SVGProps<SVGSVGElement>) {
  const Icon = ICON_MAP[name] ?? Hammer;
  return <Icon size={16} strokeWidth={1.8} {...(props as never)} />;
}

// ── Props ────────────────────────────────────────────────────
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
        // ── Backdrop ──
        <motion.div
          key="modal-backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
          style={{
            background: "rgba(15, 25, 35, 0.82)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* ── Panel ── */}
          <motion.div
            key="modal-panel"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl
                       bg-white dark:bg-[#0F1E2A] shadow-2xl"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* ── Photo gallery hero ── */}
            <div className="relative h-64 sm:h-80 bg-proyecta-navy overflow-hidden rounded-t-3xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={photoIndex}
                  src={community.photos[photoIndex]?.url}
                  alt={community.photos[photoIndex]?.caption}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.45 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E2A]/90 via-transparent to-[#0F1E2A]/30" />

              {/* Photo nav */}
              {community.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                               bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm
                               transition-all duration-200 border border-white/20"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                               bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm
                               transition-all duration-200 border border-white/20"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Dot indicators */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {community.photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPhotoIndex(i)}
                        className={`rounded-full transition-all duration-200 ${
                          i === photoIndex
                            ? "w-5 h-1.5 bg-proyecta-cyan"
                            : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Photo caption */}
              <div className="absolute bottom-4 left-6 right-14">
                <span className="text-xs text-white/60 font-medium">
                  {community.photos[photoIndex]?.caption}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full
                           bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm
                           transition-all duration-200 border border-white/20 group"
                aria-label="Cerrar"
              >
                <X
                  size={18}
                  className="group-hover:rotate-90 transition-transform duration-200"
                />
              </button>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-proyecta-navy"
                  style={{ background: categoryColors[community.category] }}
                >
                  {categoryLabels[community.category]}
                </span>
              </div>
            </div>

            {/* ── Content ── */}
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h2
                    className="text-2xl sm:text-3xl font-black text-proyecta-navy dark:text-white leading-tight mb-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {community.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-white/50">
                    <span className="flex items-center gap-1.5">
                      <MapPin
                        size={13}
                        strokeWidth={2}
                        className="text-proyecta-cyan"
                      />
                      {community.region}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/20" />
                    <span className="flex items-center gap-1.5">
                      <Calendar
                        size={13}
                        strokeWidth={2}
                        className="text-proyecta-yellow"
                      />
                      {community.year}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:justify-end">
                  {community.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold
                                 bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-white/60
                                 border border-gray-200 dark:border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider with "what was built" */}
              <div
                className="flex items-center gap-4 p-4 rounded-2xl mb-6"
                style={{
                  background: `${categoryColors[community.category]}15`,
                  borderLeft: `3px solid ${categoryColors[community.category]}`,
                }}
              >
                <Hammer
                  size={18}
                  style={{ color: categoryColors[community.category] }}
                  strokeWidth={1.8}
                />
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-0.5">
                    Qué se realizó
                  </div>
                  <div className="font-bold text-proyecta-navy dark:text-white text-sm">
                    {community.whatWasBuilt}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-gray-600 dark:text-white/65 text-sm leading-relaxed mb-8">
                {community.summary}
              </p>

              {/* Metrics grid */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-4">
                  Impacto en cifras
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {community.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5
                                 border border-gray-100 dark:border-white/10
                                 text-center group hover:border-proyecta-cyan/40 transition-colors"
                    >
                      <div className="flex justify-center mb-2">
                        <MetricIcon
                          name={metric.icon}
                          className="text-proyecta-cyan group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div
                        className="text-xl font-black text-proyecta-navy dark:text-white mb-0.5"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-white/50 leading-tight">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thumbnail strip */}
              {community.photos.length > 1 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3">
                    Galería
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {community.photos.map((photo, i) => (
                      <button
                        key={i}
                        onClick={() => setPhotoIndex(i)}
                        className={`flex-none w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                          i === photoIndex
                            ? "border-proyecta-cyan scale-105 shadow-proyecta"
                            : "border-transparent opacity-60 hover:opacity-90"
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
