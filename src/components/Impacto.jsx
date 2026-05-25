import { Heart, Shovel, Users, TrendingUp, MapPin } from 'lucide-react'
import { useInView, useCountUp } from '../hooks/useAnimations'

const stats = [
  { value: 1200, suffix: '+', label: 'Personas ayudadas',      Icon: Heart,       color: 'text-proyecta-cyan',   bg: 'from-proyecta-cyan/20 to-proyecta-sky/10'    },
  { value: 48,   suffix: '',  label: 'Operativos realizados',  Icon: Shovel,      color: 'text-proyecta-yellow', bg: 'from-proyecta-yellow/20 to-proyecta-orange/10'},
  { value: 320,  suffix: '+', label: 'Voluntarios activos',    Icon: Users,       color: 'text-proyecta-teal',   bg: 'from-proyecta-teal/20 to-proyecta-navy/10'   },
  { value: 15,   suffix: 'M', label: 'Fondos recaudados (CLP)',Icon: TrendingUp,  color: 'text-proyecta-orange', bg: 'from-proyecta-orange/20 to-proyecta-yellow/10'},
  { value: 12,   suffix: '',  label: 'Comunidades alcanzadas', Icon: MapPin,      color: 'text-proyecta-sky',    bg: 'from-proyecta-sky/20 to-proyecta-cyan/10'    },
]

function StatCard({ stat, index, isVisible }) {
  const count = useCountUp(stat.value, 2000, isVisible)

  return (
    <div
      className={`relative rounded-3xl p-8 bg-gradient-to-br ${stat.bg}
                  border border-white/10 hover:border-proyecta-cyan/30
                  transition-all duration-700 group cursor-default
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="flex items-center justify-between mb-6">
        <stat.Icon
          size={32}
          className={`${stat.color} group-hover:scale-110 transition-transform duration-300`}
          strokeWidth={1.5}
        />
        {/* Decorative dot */}
        <div className={`w-2 h-2 rounded-full ${stat.color.replace('text-', 'bg-')} animate-pulse-slow`} />
      </div>

      {/* Number */}
      <div
        className="stat-number mb-1"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {isVisible ? count.toLocaleString('es-CL') : '0'}{stat.suffix}
      </div>

      {/* Label */}
      <div className="text-sm text-white/60 font-medium leading-tight">{stat.label}</div>
    </div>
  )
}

export default function Impacto() {
  const [ref, isVisible] = useInView({ threshold: 0.1 })

  return (
    <section
      id="impacto"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1B3A4B 0%, #1B5E7A 60%, #1B9AB5 100%)' }}
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #40D0F0 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FFBB00 0%, transparent 70%)' }}
        />
        {/* Hexagon grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon points="28,0 56,14 56,34 28,48 0,34 0,14" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      <div className="section-container relative z-10">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           bg-white/10 border border-white/20 text-proyecta-cyan
                           text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-proyecta-cyan animate-pulse" />
            Nuestro Impacto
          </span>
          <h2
            className="text-4xl sm:text-5xl text-white mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Números que <span className="text-proyecta-yellow">hablan</span>
          </h2>
          <span className="block w-16 h-1.5 rounded-full bg-gradient-to-r from-proyecta-yellow to-proyecta-orange mx-auto mt-3 mb-6" />
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cada cifra representa
            vidas y comunidades transformadas.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* Progress bars — yearly goals */}
        <div
          className={`rounded-3xl p-8 bg-white/5 border border-white/10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <h3
            className="text-xl text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Avance metas 2025
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Personas ayudadas',      pct: 72, color: 'bg-proyecta-cyan'   },
              { label: 'Voluntarios capacitados', pct: 58, color: 'bg-proyecta-yellow' },
              { label: 'Fondos recaudados',       pct: 45, color: 'bg-proyecta-orange' },
              { label: 'Operativos completados',  pct: 83, color: 'bg-proyecta-teal'   },
              { label: 'Comunidades alcanzadas',  pct: 60, color: 'bg-proyecta-sky'    },
              { label: 'Alianzas estratégicas',   pct: 37, color: 'bg-proyecta-cyan'   },
            ].map((g) => (
              <div key={g.label}>
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span className="font-medium">{g.label}</span>
                  <span className="font-bold text-white">{g.pct}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${g.color} transition-all duration-1000 ease-out`}
                    style={{ width: isVisible ? `${g.pct}%` : '0%', transitionDelay: '700ms' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
