import { useInView } from "../../hooks/useAnimations";

/**
 * Envuelve contenido que aparece con fade + slide-up al entrar al
 * viewport. Reemplaza el patrón repetido de `useInView` + clases de
 * transición manuales que antes se repetía sección por sección.
 */
export default function AnimateOnScroll({
  children,
  className = "",
  threshold = 0.15,
  duration = "duration-1000",
  translateY = "translate-y-12",
  delayMs,
  ...props
}) {
  const [ref, isVisible] = useInView({ threshold });

  return (
    <div
      ref={ref}
      className={`transition-all ${duration} ${
        isVisible ? "opacity-100 translate-y-0" : `opacity-0 ${translateY}`
      } ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
