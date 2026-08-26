/**
 * Encabezado de sección: etiqueta + título + línea decorativa + bajada.
 * Consolida el patrón (section-tag / section-title / decorative-line)
 * que se repetía a mano en cada sección con markup casi idéntico.
 */
export default function SectionHeader({
  tag,
  title,
  description,
  align = "center",
  onDark = false,
  className = "",
}) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const lineClass = align === "center" ? "mx-auto" : "";

  return (
    <div className={`${alignClass} ${className}`}>
      {tag && (
        <span
          className={
            onDark
              ? "section-tag mb-4 bg-white/10 border-white/20 text-white"
              : "section-tag mb-4"
          }
        >
          {tag}
        </span>
      )}
      <h2
        className={
          onDark
            ? "text-4xl sm:text-5xl text-white mb-3"
            : "section-title mt-4"
        }
        style={onDark ? { fontFamily: "var(--font-display)" } : undefined}
      >
        {title}
      </h2>
      <span className={`decorative-line ${lineClass}`} />
      {description && (
        <p
          className={
            onDark
              ? "text-white/60 max-w-2xl mx-auto text-lg"
              : "max-w-2xl mx-auto text-lg text-proyecta-navy/70 dark:text-white/70 mt-4"
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}
