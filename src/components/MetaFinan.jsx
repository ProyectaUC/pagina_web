import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Target, HeartHandshake } from "lucide-react";

export default function MetaFinan() {
  // Estado inicial de respaldo (por si el Excel falla o el usuario no tiene internet)
  const [datosFinancieros, setDatosFinancieros] = useState({
    meta: 5000000,
    recaudado: 500000
  });

  useEffect(() => {
    const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6PMtwD2_-Iaj2Cz8z8lkWTUrtFE2MD6w26zmbF3bJYcuVyKcGd6r33MPU05Nj9F8wMTIQBeo55Ldf/pub?gid=0&single=true&output=csv";

    const fetchDatos = async () => {
      try {
        const response = await fetch(GOOGLE_SHEETS_CSV_URL);
        const csvText = await response.text();

        // Procesamos el texto del CSV
        // El CSV se ve así:
        // meta,recaudado
        // 5000000,650000
        
        // Dividimos el texto por saltos de línea para obtener las filas
        const filas = csvText.trim().split('\n');
        
        if (filas.length >= 2) {
          // Tomamos la segunda fila (índice 1) y la dividimos por comas
          const valores = filas[1].split(',');
          
          const metaParsed = parseInt(valores[0], 10);
          const recaudadoParsed = parseInt(valores[1], 10);

          // Verificamos que sean números válidos antes de actualizar el estado
          if (!isNaN(metaParsed) && !isNaN(recaudadoParsed)) {
            setDatosFinancieros({
              meta: metaParsed,
              recaudado: recaudadoParsed
            });
          }
        }
      } catch (error) {
        console.error("Error al obtener datos de Google Sheets:", error);
      }
    };

    fetchDatos();
  }, []);

  // Calculamos el porcentaje de forma segura
  const porcentaje = datosFinancieros.meta > 0 
    ? Math.round((datosFinancieros.recaudado / datosFinancieros.meta) * 100) 
    : 0;

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-proyecta-navy to-proyecta-darkTeal overflow-hidden">
      
      {/* Decoraciones de fondo expandidas */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-proyecta-cyan/10 rounded-full blur-3xl -mt-32 -mr-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-proyecta-sky/10 rounded-full blur-3xl -mb-32 -ml-32 pointer-events-none" />
      
      {/* Contenedor central que mantiene el contenido ordenado */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Textos */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-proyecta-yellow text-sm font-bold tracking-wider mb-6 border border-white/5 backdrop-blur-sm">
            <Target size={16} />
            META ANUAL 2026
          </div>
          
          <h2 className="text-4xl sm:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Hagamos que el próximo operativo sea <span className="text-proyecta-cyan">realidad</span>
          </h2>
          
          <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto lg:mx-0">
            Tu aporte se transforma directamente en herramientas, materiales y logística para seguir construyendo comunidad en zonas rurales.
          </p>
          
          <Link 
            to="/apoyanos" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-proyecta-yellow text-proyecta-navy font-bold text-lg rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,187,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
          >
            <HeartHandshake size={24} />
            Aportar a la meta
          </Link>
        </div>

        {/* Barra de progreso con estilo Glassmorphism */}
        <div className="w-full lg:w-5/12 bg-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 text-center shadow-2xl relative overflow-hidden">
          
          <div className="text-6xl sm:text-7xl text-white font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
            {porcentaje}%
          </div>
          
          <div className="text-proyecta-cyan text-lg font-medium mb-8 uppercase tracking-widest">
            logrado de la meta
          </div>
          
          {/* Contenedor de la barra */}
          <div className="h-6 bg-black/40 rounded-full overflow-hidden mb-4 relative shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-proyecta-cyan to-proyecta-sky rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${porcentaje}%` }}
            >
              {/* Brillo sutil dentro de la barra de progreso */}
              <div className="w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-base sm:text-lg text-white/70 font-medium">
            <span>${(datosFinancieros.recaudado / 1000000).toFixed(1)}M</span>
            <span>Meta: ${(datosFinancieros.meta / 1000000).toFixed(1)}M</span>
          </div>
        </div>

      </div>
    </section>
  );
}