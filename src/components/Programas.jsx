import { ArrowRight, ExternalLink } from 'lucide-react'
import { useInView } from '../hooks/useAnimations'
import { programs } from '../styles/theme/brand'

const tagColors = {
  green:  'bg-green-100 text-green-700 border-green-200',
  blue:   'bg-blue-100 text-blue-700 border-blue-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  gray:   'bg-gray-100 text-gray-600 border-gray-200',
}

function ProgramCard({ program, index, isVisible }) {
  return (
    <div
      className={`card group overflow-hidden dark:bg-proyecta-navy/60 dark:border-proyecta-teal/20
                  transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-proyecta-navy/60 to-transparent" />

        {/* Category tag on image */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-proyecta-navy/70 backdrop-blur-sm
                           text-proyecta-cyan text-xs font-bold border border-proyecta-cyan/30">
            {program.category}
          </span>
        </div>

        {/* Status tag */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tagColors[program.tagColor]}`}>
            {program.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-lg font-black text-proyecta-navy dark:text-white mb-2 leading-tight
                     group-hover:text-proyecta-teal dark:group-hover:text-proyecta-cyan transition-colors"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 800 }}
        >
          {program.title}
        </h3>
        <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed mb-5 line-clamp-3">
          {program.description}
        </p>
        <button
          className="inline-flex items-center gap-2 text-sm font-bold text-proyecta-teal
                     hover:text-proyecta-cyan transition-colors group/btn"
        >
          Ver más
          <ArrowRight
            size={16}
            className="group-hover/btn:translate-x-1 transition-transform duration-200"
          />
        </button>
      </div>
    </div>
  )
}

export default function Programas() {
  const [ref, isVisible] = useInView({ threshold: 0.05 })

  return (
    <section id="programas" className="py-24 bg-proyecta-light-bg dark:bg-[#0D1F2A]" ref={ref}>
      <div className="section-container">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4">Programas & Proyectos</span>
          <h2 className="section-title mb-4">
            Acción que <span className="gradient-text">transforma</span>
          </h2>
          <span className="decorative-line mx-auto" />
          <p className="text-gray-500 dark:text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Descubre las iniciativas
            con las que Proyecta interviene en comunidades de todo Chile.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program, i) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <button className="btn-primary text-base px-8 py-3.5">
            Ver todos los proyectos
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
