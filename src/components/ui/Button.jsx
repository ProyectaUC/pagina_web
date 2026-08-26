import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
};

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "", // usa el padding/tamaño base definido en la clase de variante
  lg: "px-8 py-4 text-base sm:text-lg",
};

/**
 * Botón unificado del sistema de diseño. Renderiza <button>, <a> o <Link>
 * según reciba `href`/`to`, así un mismo componente cubre botones de
 * formulario, links internos y externos sin duplicar estilos.
 */
export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  children,
  ...props
}) {
  const classes = [VARIANTS[variant], SIZES[size], className]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
