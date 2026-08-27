import { useState } from "react";
import {
  Building2,
  Heart,
  Landmark,
  Copy,
  Check,
  CheckCircle,
  ArrowRight,
  Mail,
  Hammer,
} from "lucide-react";
import { useInView } from "../hooks/useAnimations";
import { content } from "../styles/theme/brand";
import { donationAmounts, bankTransfer } from "../data/donaciones";
import { sponsors } from "../data/sponsors";
import Button from "./ui/Button";

// Correo de contacto para sponsors/empresas.
const SPONSORS_EMAIL = content.org.email;

const tabs = [
  { id: "sponsors", label: "Sponsors", icon: Building2 },
  { id: "donaciones", label: "Donaciones", icon: Heart },
];

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
                      className="text-proyecta-teal dark:text-proyecta-cyan flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Button
          href={`mailto:${SPONSORS_EMAIL}?subject=${encodeURIComponent("Quiero ser sponsor de Proyecta")}`}
          className="mt-6"
        >
          <Mail size={16} />
          Contactar para ser sponsor
          <ArrowRight size={16} />
        </Button>
      </div>

      {/* Sponsor logos grid */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-4">
          Sponsors actuales
        </h4>
        <div className="flex flex-wrap justify-center gap-3">
          {sponsors.map((s, i) => (
            <div
              key={i}
              className="w-32 aspect-[3/2] rounded-xl border-2 border-dashed border-gray-200
                         dark:border-proyecta-teal/20 flex items-center justify-center
                         hover:border-proyecta-cyan transition-colors cursor-pointer group"
            >
              {s.logo ? (
                <img
                  src={s.logo}
                  alt={s.name}
                  // Aumentamos el tamaño (max-h-16), quitamos la opacidad, y agregamos un efecto de zoom al hacer hover
                  className="max-h-30 w-full p-2 object-contain transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="text-xs text-gray-400 dark:text-white/30 font-medium">
                  {s.name}
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 dark:text-white/40 mt-3 text-center">
          Tu logo aquí → {SPONSORS_EMAIL}
        </p>
      </div>
    </div>
  );
}

function TransferRow({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard no disponible (ej. contexto no seguro); no hacemos nada.
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-100 dark:border-proyecta-teal/10 last:border-b-0">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-white/40 font-bold">
          {label}
        </div>
        <div className="text-sm font-semibold text-proyecta-navy dark:text-white break-all">
          {value}
        </div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copiar ${label}`}
        className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-proyecta-teal dark:text-white/40 dark:hover:text-proyecta-cyan hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      >
        {copied ? (
          <Check size={16} className="text-proyecta-teal dark:text-proyecta-cyan" />
        ) : (
          <Copy size={16} />
        )}
      </button>
    </div>
  );
}

const transferFields = [
  { label: "Nombre", value: bankTransfer.accountHolder },
  { label: "RUT", value: bankTransfer.rut },
  { label: "Banco", value: bankTransfer.bank },
  { label: "Tipo de cuenta", value: bankTransfer.accountType },
  { label: "Número de cuenta", value: bankTransfer.accountNumber },
  { label: "Correo", value: bankTransfer.email },
];

function DonacionesTab() {
  const amounts = donationAmounts;
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = async () => {
    try {
      const text = transferFields.map((f) => `${f.label}: ${f.value}`).join("\n");
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    } catch {
      // Clipboard no disponible (ej. contexto no seguro); no hacemos nada.
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
              <Hammer size={14} className="text-proyecta-teal dark:text-proyecta-cyan flex-shrink-0" />
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
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <Landmark size={20} className="text-proyecta-teal dark:text-proyecta-cyan" />
            <h4 className="font-black text-proyecta-navy dark:text-white text-lg">
              Transferencia bancaria
            </h4>
          </div>
          <button
            type="button"
            onClick={handleCopyAll}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              copiedAll
                ? "bg-proyecta-teal/10 text-proyecta-teal dark:bg-proyecta-cyan/10 dark:text-proyecta-cyan"
                : "bg-gray-50 text-gray-500 hover:text-proyecta-teal dark:bg-white/5 dark:text-white/50 dark:hover:text-proyecta-cyan"
            }`}
          >
            {copiedAll ? (
              <>
                <Check size={14} />
                Copiado
              </>
            ) : (
              <>
                <Copy size={14} />
                Copiar todo
              </>
            )}
          </button>
        </div>

        <div className="mb-2">
          {transferFields.map((f) => (
            <TransferRow key={f.label} label={f.label} value={f.value} />
          ))}
        </div>

        <p className="text-xs text-gray-400 dark:text-white/40 text-center mt-4">
          Puedes aportar el monto que prefieras — usa los datos de arriba para
          transferir directamente.
        </p>
      </div>
    </div>
  );
}

export default function Apoyanos() {
  const [activeTab, setActiveTab] = useState("sponsors");
  const [ref, isVisible] = useInView();

  return (
    <section
      id="apoyanos"
      className="py-24 bg-white dark:bg-proyecta-surface"
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
            Empresas y personas también pueden ser parte de Proyecta: como
            sponsor o con una donación.
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
          {activeTab === "sponsors" && <SponsorsTab />}
          {activeTab === "donaciones" && <DonacionesTab />}
        </div>
      </div>
    </section>
  );
}
