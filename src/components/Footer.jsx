import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { content, assets } from "../styles/theme/brand";

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

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Quiénes Somos", to: "/quienes-somos" },
  { label: "Impacto", to: "/impacto" },
  { label: "Historia", to: "/historia" },
  { label: "Apóyanos", to: "/apoyanos" },
  { label: "Contacto", to: "/contacto" },
];

export default function Footer() {
  return (
    <footer
      className="py-12 border-t border-proyecta-teal/20"
      style={{
        background: "linear-gradient(160deg, #1B3A4B 0%, #1B5E7A 100%)",
      }}
    >
      <div className="section-container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <img
              src={assets.logo}
              alt={content.org.name}
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Voluntariado comprometido con el desarrollo comunitario, la
              educacion y el bienestar social. Construyendo Chile desde la
              accion colectiva.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/50 ${s.color} transition-all`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Navegacion
            </h5>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/60 hover:text-proyecta-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              Contacto
            </h5>
            <ul className="space-y-2 text-sm text-white/60">
              <li>{content.org.email}</li>
              <li>{content.org.phone}</li>
              <li>{content.org.address}</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {content.org.fullName}. Todos los
            derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">
              Politica de privacidad
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terminos de uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
