import { Link } from "react-router-dom";
import { useInView, useCountUp } from "../hooks/useAnimations";
import { impactStats as stats } from "../styles/theme/brand";
import { ArrowRight } from "lucide-react";

function StatCard({ stat, index, isVisible }) {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <div
      className={`relative rounded-3xl p-8 bg-gradient-to-br ${stat.bg}
                  border border-white/10 hover:border-proyecta-cyan/30
                  transition-all duration-700 group cursor-default
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="flex items-center justify-between mb-6">
        <stat.Icon
          size={32}
          className={`${stat.color} group-hover:scale-110 transition-transform duration-300`}
          strokeWidth={1.5}
        />

        <div
          className={`w-2 h-2 rounded-full ${stat.color.replace(
            "text-",
            "bg-"
          )} animate-pulse-slow`}
        />
      </div>

      {/* Number */}
      <div
        className="stat-number mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {isVisible ? count.toLocaleString("es-CL") : "0"}
        {stat.suffix}
      </div>

      {/* Label */}
      <div className="text-sm text-white/60 font-medium leading-tight">
        {stat.label}
      </div>
    </div>
  );
}

export default function Impacto() {
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  // Ajusta estos valores cuando tengas los datos reales
  const meta = 15000000;
  const recaudado = 7500000;
  const porcentaje = Math.round((recaudado / meta) * 100);

  return (
    <section
      id="impacto"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1B3A4B 0%, #1B5E7A 60%, #1B9AB5 100%)",
      }}
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #40D0F0 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #FFBB00 0%, transparent 70%)",
          }}
        />

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hex"
              width="56"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="28,0 56,14 56,34 28,48 0,34 0,14"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-tag mb-4 bg-white/10 border-white/20 text-white">
            <span className="w-2 h-2 rounded-full bg-proyecta-cyan animate-pulse" />
            Nuestro Impacto
          </span>

          <h2
            className="text-4xl sm:text-5xl text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Números que <span className="text-proyecta-yellow">hablan</span>
          </h2>

          <span className="decorative-line mx-auto" />

          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Más de 20 años trabajando junto a comunidades de todo Chile,
            impulsando proyectos que fortalecen la organización comunitaria,
            recuperan espacios y generan oportunidades de encuentro.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Link
            to="/trabajos"
            className="btn-primary px-8 py-4 text-sm sm:text-base md:text-lg w-full sm:w-auto"
          >
            Descubre nuestro impacto en Chile
            <ArrowRight size={20} />
          </Link>
        </div>
        
      </div>

    </section>
  );
}