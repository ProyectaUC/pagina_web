import { useEffect } from "react";

const DEFAULT_TITLE = "Proyecta | Voluntariado que transforma comunidades";
const DEFAULT_DESCRIPTION =
  "Proyecta es un voluntariado comprometido con el desarrollo comunitario, la educación y el bienestar social. Únete y sé parte del cambio.";

// Actualiza <title> y <meta name="description"> por ruta, sin sumar
// react-helmet-async como dependencia nueva.
export function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} | Proyecta` : DEFAULT_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);
}
