import { MessageCircle, CheckCircle } from "lucide-react";
import { content } from "../styles/theme/brand";
import SectionHeader from "./ui/SectionHeader";

export default function Unete() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen bg-white dark:bg-proyecta-surface transition-colors duration-300">
      <div className="section-container">
        <SectionHeader
          tag="Únete"
          title={
            <>
              Sé parte de <span className="gradient-text">Proyecta</span>
            </>
          }
          description="Ser voluntario en Proyecta significa ser parte de una comunidad que trabaja junta para mejorar la vida de las comunidades rurales. No importa tu experiencia previa: lo que más valoramos es tu entusiasmo y compromiso."
        />

        <div className="max-w-3xl mx-auto mt-12 space-y-12">
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
                Entérate primero de operativos, talleres y actividades. Es la
                forma más rápida de mantenerte al día con Proyecta.
              </p>
            </div>
            <a
              href={content.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              style={{ background: "#25D366" }}
            >
              <MessageCircle size={18} />
              Unirme al grupo
            </a>
          </div>

          <div>
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
                    className="text-proyecta-teal dark:text-proyecta-cyan flex-shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
