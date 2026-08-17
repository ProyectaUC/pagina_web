import { Link } from "react-router-dom";
import { Compass, ArrowRight, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-[#0D1F2A] px-6 text-center transition-colors duration-300">
      <div className="p-6 bg-proyecta-cyan/10 rounded-full mb-8">
        <Compass size={64} className="text-proyecta-teal dark:text-proyecta-cyan" />
      </div>

      <span className="section-tag mb-4">Error 404</span>
      <h1 className="section-title mb-4">
        Esta página <span className="gradient-text">no existe</span>
      </h1>
      <span className="decorative-line mx-auto" />

      <p className="max-w-md text-lg text-proyecta-navy/70 dark:text-white/70 leading-relaxed mb-10">
        El enlace que seguiste puede estar roto o la página se movió.
        Volvamos a un lugar conocido.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary px-8 py-3.5">
          <Home size={18} />
          Volver al inicio
        </Link>
        <Link to="/trabajos" className="btn-secondary px-8 py-3.5">
          Ver nuestros trabajos
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
