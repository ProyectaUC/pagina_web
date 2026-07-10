import { useState } from "react";
import {
  Users,
  Building2,
  Heart,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Send,
  MessageCircle,
  Mail,
  Hammer,
} from "lucide-react";
import { useInView } from "../hooks/useAnimations";
import { sponsors } from "../styles/theme/brand";
import { content } from "../styles/theme/brand";

// ============================================================
// 🔗 ENLACES Y CONTACTOS — completar antes de publicar
// ============================================================
// Grupo de WhatsApp para voluntarios: reemplazar por el link real
// generado desde WhatsApp (Configuración > Grupo > Invitar por link).
const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/IbhVde7LXfnIfXyonU6rBr?s=cl&p=i&ilr=4&amv=1";

// Correo de contacto para sponsors/empresas.
const SPONSORS_EMAIL = content.org.email;

const tabs = [
  { id: "voluntarios", label: "Voluntarios", icon: Users },
  { id: "sponsors", label: "Sponsors", icon: Building2 },
  { id: "donaciones", label: "Donaciones", icon: Heart },
];

function VoluntariosTab() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    area: "",
    mensaje: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Conectar con Formspree, Netlify Forms o similar
    setSent(true);
  };

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
    );
  }

  return (
    <div className="space-y-12">
      {/* ── Bloque destacado: grupo de WhatsApp ── */}
      <div
        className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-proyecta-cyan/20"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,211,102,0.08), rgba(64,208,240,0.08))",
        }}
      >
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg">
          <MessageCircle size={28} className="text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h4 className="font-black text-proyecta-navy dark:text-white text-lg mb-1">
            Únete a nuestro grupo de WhatsApp
          </h4>
          <p className="text-sm text-gray-500 dark:text-white/60">
            Entérate primero de operativos, talleres y actividades. Es la forma
            más rápida de mantenerte al día con Proyecta.
          </p>
        </div>
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
          style={{ background: "#25D366" }}
        >
          <MessageCircle size={18} />
          Unirme al grupo
        </a>
      </div>

      <div className="gap-12 items-center">
        {/* Left: info */}
        <div>
          <h3
            className="text-3xl text-proyecta-navy dark:text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Únete a nuestra red
          </h3>
          <p className="text-gray-500 dark:text-white/60 mb-8 leading-relaxed">
            Ser voluntario en Proyecta significa ser parte de una comunidad que
            trabaja junta para mejorar la vida de las comunidades rurales. No
            importa tu experiencia previa: lo que más valoramos es tu entusiasmo
            y compromiso.
          </p>
          <p className="text-gray-500 dark:text-white/60 mb-4 leading-relaxed">
            Al unirte, podrás:
          </p>
          <ul className="space-y-3">
            {[
              "Participa en operativos comunitarios",
              "Desarrolla habilidades de liderazgo",
              "Forma parte de una red interuniversitaria",
              "Impacta vidas directamente",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-gray-600 dark:text-white/70"
              >
                <CheckCircle
                  size={18}
                  className="text-proyecta-cyan flex-shrink-0"
                  strokeWidth={2}
                />
                <span className="text-sm font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SponsorsTab() {
  // Solo listas de beneficios, sin descripciones largas: todo apunta a
  // contactar por correo para coordinar los detalles.
  const tiers = [
    {
      tier: "Aporte Puntual",
      subtitle: "Una sola operación o periodo",
      color: "border-proyecta-cyan bg-proyecta-cyan/5 dark:bg-proyecta-cyan/10",
      benefits: [
        "Logo en Instagram (publicación del operativo)",
        "Mención en la página web",
        "Agradecimiento público al cierre del operativo",
      ],
    },
    {
      tier: "Sponsor Permanente",
      subtitle: "Alianza durante todo el año",
      color:
        "border-proyecta-yellow bg-proyecta-yellow/5 dark:bg-proyecta-yellow/10",
      benefits: [
        "Logo en poleras y polerones de Proyecta",
        "Logo permanente en sitio web",
        "Presencia continua en Instagram",
        "Mención en cada operativo del periodo",
        "Prioridad para renovar el siguiente año",
      ],
    },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <div>
        <h3
          className="text-3xl text-proyecta-navy dark:text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sé parte del cambio
        </h3>
        <p className="text-gray-500 dark:text-white/60 mb-6 leading-relaxed">
          Las donaciones de empresas pueden ser en dinero, alimentos, o
          materiales como ropa, herramientas, materiales de construcción y más.
          Coordinamos contigo la forma que mejor se ajuste a lo que puedan
          aportar.
        </p>

        <div className="space-y-4">
          {tiers.map((t) => (
            <div
              key={t.tier}
              className={`p-5 rounded-xl border-l-4 ${t.color}`}
            >
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <div className="font-bold text-sm text-proyecta-navy dark:text-white">
                  {t.tier}
                </div>
                <div className="text-xs text-gray-400 dark:text-white/40">
                  {t.subtitle}
                </div>
              </div>
              <ul className="space-y-1.5">
                {t.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-xs text-gray-600 dark:text-white/70"
                  >
                    <CheckCircle
                      size={13}
                      className="text-proyecta-cyan flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a
          href={`mailto:${SPONSORS_EMAIL}?subject=${encodeURIComponent("Quiero ser sponsor de Proyecta")}`}
          className="btn-primary mt-6 inline-flex"
        >
          <Mail size={16} />
          Contactar para ser sponsor
          <ArrowRight size={16} />
        </a>
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
                <img
                  src={s.logo}
                  alt={s.name}
                  // Aumentamos el tamaño (max-h-16), quitamos la opacidad, y agregamos un efecto de zoom al hacer hover
                  className="max-h-30 w-full p-2 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <span className="text-xs text-gray-400 dark:text-white/30 font-medium">
                  {s.name}
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Tu logo aquí → {SPONSORS_EMAIL}
        </p>
      </div>
    </div>
  );
}

function DonacionesTab() {
  // 1. Agregamos los links específicos de cada monto dentro del mismo array
  const amounts = [
    {
      value: 25000,
      label: "Una banca con respaldo",
      mpLink: "https://mpago.la/2Cmprq2",
    },
    {
      value: 45000,
      label: "Una mesa tipo picnic",
      mpLink: "https://mpago.la/2fQWR7M",
    },
    {
      value: 300000,
      label: "Un techo para la comunidad",
      mpLink: "https://mpago.la/2qiScjb",
    },
    {
      value: 400000,
      label: "Un juego de dos torres",
      mpLink: "https://mpago.la/1uNxtxQ",
    },
    {
      value: 1000000,
      label: "Una sede vecinal",
      mpLink: "https://mpago.la/2gc5S8K",
    },
  ];

  // Enlace genérico (monto abierto) para cuando el usuario use el input personalizado
  const MP_LINK_GENERICO = "https://link.mercadopago.cl/proyectauc";

  const [selected, setSelected] = useState(amounts[1].value);
  const [custom, setCustom] = useState("");

  // 2. Buscamos el link que corresponde al botón seleccionado
  const handleMercadoPago = () => {
    if (custom) {
      // Si escribió un monto personalizado, lo mandamos al link abierto
      window.location.href = MP_LINK_GENERICO;
    } else {
      // Si seleccionó un botón, buscamos su link específico
      const opcion = amounts.find((a) => a.value === selected);
      window.location.href = opcion ? opcion.mpLink : MP_LINK_GENERICO;
    }
  };

  const handleStripe = () => {
    if (custom) {
      window.location.href = STRIPE_LINK_GENERICO;
    } else {
      const opcion = amounts.find((a) => a.value === selected);
      window.location.href = opcion ? opcion.stripeLink : STRIPE_LINK_GENERICO;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3
          className="text-3xl text-proyecta-navy dark:text-white mb-4 font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Tu apoyo hace la diferencia
        </h3>
        <p className="text-gray-500 dark:text-white/60 mb-6 leading-relaxed">
          Nuestro trabajo es de construcción y talleres: cada peso se traduce
          directamente en materiales para levantar algo junto a la comunidad.
        </p>
        <ul className="space-y-2 mb-8">
          {amounts.map((a) => (
            <li
              key={a.value}
              className="flex items-center gap-3 text-sm text-gray-600 dark:text-white/70"
            >
              <Hammer size={14} className="text-proyecta-cyan flex-shrink-0" />
              <span>
                <strong className="text-proyecta-navy dark:text-white">
                  ${a.value.toLocaleString("es-CL")}
                </strong>{" "}
                → {a.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card dark:bg-proyecta-navy/60 dark:border-proyecta-teal/20 p-8 rounded-[2rem] shadow-xl bg-white border border-gray-100">
        <h4 className="font-black text-proyecta-navy dark:text-white mb-5 text-lg">
          Elige qué quieres aportar (CLP)
        </h4>

        {/* Amount buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {amounts.map((a) => (
            <button
              key={a.value}
              onClick={() => {
                setSelected(a.value);
                setCustom("");
              }}
              className={`py-3 px-2 rounded-xl text-center border-2 transition-all ${
                selected === a.value && !custom
                  ? "bg-proyecta-cyan border-proyecta-cyan text-proyecta-navy font-bold shadow-md"
                  : "border-gray-200 dark:border-proyecta-teal/30 text-gray-600 dark:text-white/70 hover:border-proyecta-cyan"
              }`}
            >
              <div className="text-sm font-bold">
                ${a.value.toLocaleString("es-CL")}
              </div>
              <div className="text-[11px] opacity-80">{a.label}</div>
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <input
          type="number"
          placeholder="Monto personalizado..."
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setSelected(null);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-proyecta-teal/30
                     bg-white dark:bg-proyecta-navy text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-proyecta-cyan mb-5 text-sm"
        />

        {/* 💳 PAYMENT BUTTONS */}
        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl
                       text-white font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ background: "linear-gradient(135deg, #009EE3, #00B1EA)" }}
            onClick={handleMercadoPago}
          >
            <CreditCard size={18} />
            Pagar con Mercado Pago
          </button>
          {/* <button
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl
                       bg-[#635BFF] text-white font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            onClick={handleStripe}
          >
            <CreditCard size={18} />
            Pagar con Stripe
          </button> */}
        </div>

        <p className="text-xs text-gray-400 dark:text-white/40 text-center mt-3">
          🔒 Pagos seguros — Certificado SSL
        </p>
      </div>
    </div>
  );
}

export default function Apoyanos() {
  const [activeTab, setActiveTab] = useState("voluntarios");
  const [ref, isVisible] = useInView();

  return (
    <section
      id="apoyanos"
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
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-100 dark:bg-proyecta-navy gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
                               transition-all duration-200 ${
                                 activeTab === tab.id
                                   ? "bg-proyecta-cyan text-proyecta-navy shadow-proyecta"
                                   : "text-gray-500 dark:text-white/60 hover:text-proyecta-teal"
                               }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {activeTab === "voluntarios" && <VoluntariosTab />}
          {activeTab === "sponsors" && <SponsorsTab />}
          {activeTab === "donaciones" && <DonacionesTab />}
        </div>
      </div>
    </section>
  );
}
