import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  CheckCircle,
} from "lucide-react";
import { useInView } from "../hooks/useAnimations";
import { content } from "../styles/theme/brand";

const socialLinks = [
  {
    icon: Instagram,
    href: content.social.instagram,
    label: "Instagram",
    color: "hover:text-pink-400",
  },
  {
    icon: Facebook,
    href: content.social.facebook,
    label: "Facebook",
    color: "hover:text-blue-400",
  },
  {
    icon: Twitter,
    href: content.social.twitter,
    label: "Twitter/X",
    color: "hover:text-sky-400",
  },
  {
    icon: Linkedin,
    href: content.social.linkedin,
    label: "LinkedIn",
    color: "hover:text-blue-500",
  },
  {
    icon: Youtube,
    href: content.social.youtube,
    label: "YouTube",
    color: "hover:text-red-400",
  },
];

export default function Contacto() {
  const [ref, isVisible] = useInView();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Conectar con Formspree, EmailJS, o Netlify Forms
    setSent(true);
  };

  return (
    <section
      id="contacto"
      className="py-24 bg-proyecta-light-bg dark:bg-[#0D1F2A]"
      ref={ref}
    >
      <div className="section-container">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-tag mb-4">Contacto</span>
          <h2 className="section-title mb-4">
            Hablemos <span className="gradient-text">juntos</span>
          </h2>
          <span className="decorative-line mx-auto" />
          <p className="text-gray-500 dark:text-white/60 max-w-xl mx-auto text-lg">
            ¿Tienes dudas, ideas o quieres colaborar? Escríbenos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div
            className={`lg:col-span-1 space-y-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            {/* Info cards */}
            {[
              {
                icon: Mail,
                label: "Email",
                value: content.org.email,
                href: `mailto:${content.org.email}`,
              },
              {
                icon: Phone,
                label: "Teléfono",
                value: content.org.phone,
                href: `tel:${content.org.phone}`,
              },
              {
                icon: MapPin,
                label: "Ubicación",
                value: content.org.address,
                href: null,
              },
            ].map((item) => {
              const Icon = item.icon;
              const content_el = (
                <div
                  key={item.label}
                  className="card dark:bg-proyecta-navy/60 dark:border-proyecta-teal/20 p-5 flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-proyecta-cyan/10">
                    <Icon
                      size={20}
                      className="text-proyecta-cyan"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-proyecta-navy dark:text-white">
                      {item.value}
                    </div>
                  </div>
                </div>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="block hover:opacity-90 transition-opacity"
                >
                  {content_el}
                </a>
              ) : (
                content_el
              );
            })}

            {/* Social links */}
            <div className="card dark:bg-proyecta-navy/60 dark:border-proyecta-teal/20 p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-4">
                Redes sociales
              </div>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`p-2.5 rounded-xl bg-gray-100 dark:bg-proyecta-teal/10
                                    text-gray-500 dark:text-white/60 ${s.color}
                                    hover:scale-110 transition-all duration-200`}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="card dark:bg-proyecta-navy/60 dark:border-proyecta-teal/20 p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={56} className="text-green-500 mb-4" />
                  <h3 className="text-xl font-black text-proyecta-navy dark:text-white mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-500 dark:text-white/60 text-sm">
                    Te responderemos a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      {
                        id: "nombre",
                        label: "Nombre",
                        type: "text",
                        placeholder: "Tu nombre",
                      },
                      {
                        id: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "tu@email.com",
                      },
                    ].map((f) => (
                      <div key={f.id}>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-1.5">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.id]}
                          onChange={(e) =>
                            setForm({ ...form, [f.id]: e.target.value })
                          }
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-proyecta-teal/30
                                       bg-white dark:bg-proyecta-navy/50 text-gray-900 dark:text-white
                                       focus:outline-none focus:ring-2 focus:ring-proyecta-cyan text-sm placeholder-gray-400"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-1.5">
                      Asunto
                    </label>
                    <input
                      type="text"
                      placeholder="¿De qué se trata?"
                      value={form.asunto}
                      onChange={(e) =>
                        setForm({ ...form, asunto: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-proyecta-teal/30
                                   bg-white dark:bg-proyecta-navy/50 text-gray-900 dark:text-white
                                   focus:outline-none focus:ring-2 focus:ring-proyecta-cyan text-sm placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-white/80 mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Cuéntanos..."
                      value={form.mensaje}
                      onChange={(e) =>
                        setForm({ ...form, mensaje: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-proyecta-teal/30
                                   bg-white dark:bg-proyecta-navy/50 text-gray-900 dark:text-white
                                   focus:outline-none focus:ring-2 focus:ring-proyecta-cyan resize-none
                                   text-sm placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center py-3.5 text-base"
                  >
                    <Send size={18} />
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
