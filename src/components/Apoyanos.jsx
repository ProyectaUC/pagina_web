import { useState } from 'react'
import { Users, Building2, Heart, CreditCard, CheckCircle, ArrowRight, Send } from 'lucide-react'
import { useInView } from '../hooks/useAnimations'
import { sponsors } from '../styles/theme/brand'

const tabs = [
  { id: 'voluntarios', label: 'Voluntarios', icon: Users      },
  { id: 'sponsors',    label: 'Sponsors',    icon: Building2  },
  { id: 'donaciones',  label: 'Donaciones',  icon: Heart      },
]

function VoluntariosTab() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', area: '', mensaje: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Conectar con Formspree, Netlify Forms o similar
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h3 className="text-2xl font-black text-proyecta-navy dark:text-white mb-2">
          ¡Gracias por querer unirte!
        </h3>
        <p className="text-gray-500 dark:text-white/60">
          Nos pondremos en contacto contigo pronto.
        </p>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left: info */}
      <div>
        <h3
          className="text-3xl text-proyecta-navy dark:text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Únete a nuestra red
        </h3>
        <p className="text-gray-500 dark:text-white/60 mb-8 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco.
        </p>
        <ul className="space-y-3">
          {[
            'Participa en operativos comunitarios',
            'Desarrolla habilidades de liderazgo',
            'Forma parte de una red nacional',
            'Impacta vidas directamente',
            'Capacitación y formación continua',
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-white/70">
              <CheckCircle size={18} className="text-proyecta-cyan flex-shrink-0" strokeWidth={2} />
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { id: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'María González' },
          { id: 'email',  label: 'Correo electrónico', type: 'email', placeholder: 'maria@email.com' },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-1.5">
              {f.label}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.id]}
              onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-proyecta-teal/30
                         bg-white dark:bg-proyecta-navy/50 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-proyecta-cyan focus:border-transparent
                         placeholder-gray-400 transition text-sm"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-1.5">
            Área de interés
          </label>
          <select
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-proyecta-teal/30
                       bg-white dark:bg-proyecta-navy/50 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-proyecta-cyan text-sm"
          >
            <option value="">Selecciona un área</option>
            <option>Salud comunitaria</option>
            <option>Educación</option>
            <option>Tecnología</option>
            <option>Comunicaciones</option>
            <option>Logística</option>
            <option>Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-1.5">
            ¿Por qué quieres unirte?
          </label>
          <textarea
            rows={3}
            placeholder="Cuéntanos sobre ti y por qué quieres ser voluntario/a..."
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-proyecta-teal/30
                       bg-white dark:bg-proyecta-navy/50 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-proyecta-cyan resize-none
                       placeholder-gray-400 text-sm"
          />
        </div>

        <button type="submit" className="btn-primary w-full justify-center py-3.5">
          <Send size={18} />
          Quiero ser voluntario/a
        </button>
      </form>
    </div>
  )
}

function SponsorsTab() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <div>
        <h3
          className="text-3xl text-proyecta-navy dark:text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Sé parte del cambio
        </h3>
        <p className="text-gray-500 dark:text-white/60 mb-8 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
        <div className="space-y-4">
          {[
            { tier: 'Patrocinador Bronce', benefit: 'Logo en redes sociales + mención pública', color: 'border-amber-600 bg-amber-50 dark:bg-amber-900/20' },
            { tier: 'Patrocinador Plata',  benefit: 'Todo lo anterior + logo en sitio web prominente', color: 'border-gray-400 bg-gray-50 dark:bg-gray-900/20' },
            { tier: 'Patrocinador Oro',    benefit: 'Todo lo anterior + presencia en operativos', color: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
          ].map((t) => (
            <div key={t.tier} className={`p-4 rounded-xl border-l-4 ${t.color}`}>
              <div className="font-bold text-sm text-proyecta-navy dark:text-white">{t.tier}</div>
              <div className="text-xs text-gray-500 dark:text-white/60 mt-1">{t.benefit}</div>
            </div>
          ))}
        </div>
        <button className="btn-primary mt-6">
          Contactar para ser sponsor
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Sponsor logos grid */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
          Sponsors actuales
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {sponsors.map((s, i) => (
            <div
              key={i}
              className="aspect-[3/2] rounded-xl border-2 border-dashed border-gray-200
                         dark:border-proyecta-teal/20 flex items-center justify-center
                         hover:border-proyecta-cyan transition-colors cursor-pointer group"
            >
              {s.logo ? (
                <img src={s.logo} alt={s.name} className="max-h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
              ) : (
                <span className="text-xs text-gray-400 dark:text-white/30 font-medium">{s.name}</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Tu logo aquí → contacto@proyecta.cai.cl
        </p>
      </div>
    </div>
  )
}

function DonacionesTab() {
  const amounts = [1000, 2500, 5000, 10000]
  const [selected, setSelected] = useState(2500)
  const [custom, setCustom] = useState('')

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3
          className="text-3xl text-proyecta-navy dark:text-white mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Tu apoyo hace la diferencia
        </h3>
        <p className="text-gray-500 dark:text-white/60 mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cada peso contribuye
          directamente a nuestros programas comunitarios.
        </p>
        <ul className="space-y-2 mb-8">
          {[
            '$1.000 → Kits de útiles para un niño',
            '$2.500 → Insumos médicos básicos',
            '$5.000 → Un día de operativo',
            '$10.000 → Taller completo para 10 personas',
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-gray-600 dark:text-white/70">
              <Heart size={14} className="text-proyecta-cyan flex-shrink-0" fill="currentColor" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Donation widget — preparado para Mercado Pago / Stripe */}
      <div className="card dark:bg-proyecta-navy/60 dark:border-proyecta-teal/20 p-8">
        <h4 className="font-black text-proyecta-navy dark:text-white mb-5 text-lg">
          Selecciona un monto (CLP)
        </h4>

        {/* Amount buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {amounts.map((a) => (
            <button
              key={a}
              onClick={() => { setSelected(a); setCustom('') }}
              className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                selected === a && !custom
                  ? 'bg-proyecta-cyan border-proyecta-cyan text-proyecta-navy shadow-proyecta'
                  : 'border-gray-200 dark:border-proyecta-teal/30 text-gray-600 dark:text-white/70 hover:border-proyecta-cyan'
              }`}
            >
              ${a.toLocaleString('es-CL')}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <input
          type="number"
          placeholder="Monto personalizado..."
          value={custom}
          onChange={(e) => { setCustom(e.target.value); setSelected(null) }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-proyecta-teal/30
                     bg-white dark:bg-proyecta-navy text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-proyecta-cyan mb-5 text-sm"
        />

        {/* ============================================================
            💳 PAYMENT BUTTONS PLACEHOLDER
            Para integrar pagos, reemplaza estos botones con:

            MERCADO PAGO:
            <script src="https://sdk.mercadopago.com/js/v2"></script>
            Usar preferencia de pago generada en tu backend.
            Docs: https://www.mercadopago.cl/developers/es/docs

            STRIPE:
            <script src="https://js.stripe.com/v3/"></script>
            Usar Stripe Payment Links o Checkout.
            Docs: https://stripe.com/docs/payments
            ============================================================ */}
        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl
                       text-white font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #009EE3, #00B1EA)' }}
            onClick={() => alert('🚧 Integración Mercado Pago pendiente — reemplazar con SDK oficial')}
          >
            <CreditCard size={18} />
            Pagar con Mercado Pago
          </button>
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl
                       bg-[#635BFF] text-white font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            onClick={() => alert('🚧 Integración Stripe pendiente — reemplazar con Stripe Checkout')}
          >
            <CreditCard size={18} />
            Pagar con Stripe
          </button>
        </div>

        <p className="text-xs text-gray-400 dark:text-white/40 text-center mt-3">
          🔒 Pagos seguros — Certificado SSL
        </p>
      </div>
    </div>
  )
}

export default function Apoyanos() {
  const [activeTab, setActiveTab] = useState('voluntarios')
  const [ref, isVisible] = useInView()

  return (
    <section id="apoyanos" className="py-24 bg-white dark:bg-[#0D1F2A]" ref={ref}>
      <div className="section-container">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4">Apóyanos</span>
          <h2 className="section-title mb-4">
            Suma tu <span className="gradient-text">energía</span>
          </h2>
          <span className="decorative-line mx-auto" />
          <p className="text-gray-500 dark:text-white/60 max-w-xl mx-auto text-lg">
            Hay muchas formas de ser parte de Proyecta. Elige la tuya.
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 dark:bg-proyecta-navy gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
                               transition-all duration-200 ${
                                 activeTab === tab.id
                                   ? 'bg-proyecta-cyan text-proyecta-navy shadow-proyecta'
                                   : 'text-gray-500 dark:text-white/60 hover:text-proyecta-teal'
                               }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab content */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {activeTab === 'voluntarios' && <VoluntariosTab />}
          {activeTab === 'sponsors'    && <SponsorsTab />}
          {activeTab === 'donaciones'  && <DonacionesTab />}
        </div>
      </div>
    </section>
  )
}
