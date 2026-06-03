import { Target, Eye, Sparkles, HandHeart, Shield, Zap } from "lucide-react";
import { useInView } from "../hooks/useAnimations";

const pillars = [
  {
    icon: Target,
    color: "from-proyecta-cyan to-proyecta-teal",
    bg: "bg-proyecta-cyan/10",
    tag: "Misión",
    title: "Transformar desde adentro",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  },
  {
    icon: Eye,
    color: "from-proyecta-yellow to-proyecta-orange",
    bg: "bg-proyecta-yellow/10",
    tag: "Visión",
    title: "Un futuro más justo y conectado",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    icon: Sparkles,
    color: "from-proyecta-teal to-proyecta-sky",
    bg: "bg-proyecta-teal/10",
    tag: "Valores",
    title: "Lo que nos mueve cada día",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab inventore.",
  },
];

const valores = [
  { icon: HandHeart, label: "Compromiso", color: "text-proyecta-cyan" },
  { icon: Shield, label: "Integridad", color: "text-proyecta-yellow" },
  { icon: Zap, label: "Innovación", color: "text-proyecta-orange" },
  { icon: Target, label: "Impacto", color: "text-proyecta-teal" },
  { icon: Eye, label: "Transparencia", color: "text-proyecta-sky" },
  { icon: Sparkles, label: "Comunidad", color: "text-proyecta-cyan" },
];

export default function QuienesSomos({ variant = "full" }) {
  const [ref, isVisible] = useInView();
  const isCompact = variant === "compact";
  const visiblePillars = isCompact ? pillars.slice(0, 2) : pillars;

  return (
    <section
      id="quienes-somos"
      className="py-24 bg-white dark:bg-[#0D1F2A]"
      ref={ref}
    >
      <div className="section-container">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-tag mb-4">Quiénes Somos</span>
          <h2 className="section-title mb-4">
            Somos <span className="gradient-text">Proyecta</span>
          </h2>
          <span className="decorative-line mx-auto" />
          <p className="text-gray-500 dark:text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua, quis
            nostrud exercitation.
          </p>
        </div>

        {/* Mission / Vision / Values cards */}
        <div
          className={`grid ${isCompact ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6 mb-16`}
        >
          {visiblePillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.tag}
                className={`card p-8 group dark:card-dark transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-2xl ${p.bg} mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`bg-gradient-to-br ${p.color} rounded-xl p-2`}
                  >
                    <Icon size={24} className="text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Tag */}
                <div className="text-xs font-bold uppercase tracking-widest text-proyecta-teal mb-2">
                  {p.tag}
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-black text-proyecta-navy dark:text-white mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 800 }}
                >
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Valores grid */}
        {!isCompact && (
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div
              className="rounded-3xl p-8 sm:p-12"
              style={{
                background: "linear-gradient(135deg, #1B3A4B 0%, #1B5E7A 100%)",
              }}
            >
              <h3
                className="text-center text-2xl sm:text-3xl text-white mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Nuestros valores
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {valores.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div
                      key={v.label}
                      className="flex flex-col items-center gap-3 p-4 rounded-2xl
                                 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-proyecta-cyan/40
                                 transition-all duration-300 group cursor-default"
                    >
                      <Icon
                        size={28}
                        className={`${v.color} group-hover:scale-110 transition-transform`}
                        strokeWidth={1.5}
                      />
                      <span className="text-xs font-bold text-white/80 text-center">
                        {v.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
