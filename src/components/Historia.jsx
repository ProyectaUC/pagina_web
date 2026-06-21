import React from "react";

export default function Historia() {
  // Datos de la historia actualizados con imágenes placeholder.
  // ¡Cambia las URLs de 'image' por tus rutas reales cuando las tengas!
  const hitos = [
    {
      year: "2005",
      title: "La primera semilla",
      description:
        "Un grupo pequeño de estudiantes soñó con un voluntariado diferente. Realizamos nuestro primer operativo de salud comunitaria con apenas 10 personas.",
      alignment: "right",
      image: `${import.meta.env.BASE_URL}assets/photos/saludo.JPG`,
    },
    {
      year: "2010",
      title: "Adaptación digital",
      description:
        "Frente al desafío global, lanzamos los Talleres de Habilidades Digitales, demostrando que la comunidad se construye también a través de las pantallas.",
      alignment: "left",
      image: `${import.meta.env.BASE_URL}assets/photos/comunidad.jpg`,
    },
    {
      year: "2015",
      title: "Redes consolidadas",
      description:
        "Alcanzamos hitos históricos en recaudación y operativos. Proyecta se establece como un pilar de acción social estudiantil en Chile.",
      alignment: "right",
      image: `${import.meta.env.BASE_URL}assets/photos/awada.jpeg`,
    },
    {
      year: "2026",
      title: "El futuro es hoy",
      description:
        "Seguimos construyendo comunidad desde la acción, con nuevos programas de infraestructura y apoyo social continuo.",
      alignment: "left",
      image: `${import.meta.env.BASE_URL}assets/photos/epica.jpeg`,
    },
  ];

  return (
    <section className="relative py-24 w-full bg-white dark:bg-[#0D1F2A] overflow-hidden transition-colors duration-300">
      <div className="section-container relative">
        {/* Encabezado de la sección */}
        <div className="text-center mb-28 animate-on-scroll is-visible">
          <span className="section-tag">Nuestras Raíces</span>
          <h2 className="section-title mt-4">La Ruta de Proyecta</h2>
          <span className="decorative-line mx-auto"></span>
          <p className="max-w-2xl mx-auto text-lg text-proyecta-navy/70 dark:text-white/70">
            Cada año representa un paso más hacia una comunidad más fuerte.
            Descubre cómo nuestra pasión por ayudar ha evolucionado en el
            tiempo.
          </p>
        </div>

        {/* Contenedor de la Línea de Tiempo interactiva */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-0">
          {/* La "Flecha" / Línea central brillante */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 sm:-translate-x-1/2 bg-gradient-to-b from-proyecta-cyan via-proyecta-teal to-proyecta-yellow opacity-40 rounded-full shadow-[0_0_15px_rgba(64,208,240,0.5)]"></div>

          {hitos.map((hito, index) => (
            <div
              key={index}
              // Aumentamos el margen inferior (mb-24 a mb-32) para separar mejor verticalmente
              className={`relative flex flex-col sm:flex-row items-start sm:items-center w-full mb-24 sm:mb-32 group ${
                hito.alignment === "right" ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Espaciador del 50% para empujar el contenido al lado correcto en Desktop */}
              <div className="hidden sm:block w-1/2"></div>

              {/* Punto interactivo en la línea (Anclado a left-8 en móvil para mayor margen) */}
              <div
                className="absolute left-8 sm:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-[#0D1F2A] bg-proyecta-yellow z-20 
                              transition-all duration-300 group-hover:scale-150 group-hover:bg-proyecta-cyan shadow-proyecta group-hover:shadow-[0_0_20px_rgba(64,208,240,0.8)] mt-6 sm:mt-0"
              ></div>

              {/* Contenido del hito (Se ajustaron los paddings para dar MUCHA más distancia a la línea) */}
              <div
                className={`w-full sm:w-1/2 flex flex-col pl-24 sm:pl-0 transition-all duration-300 transform group-hover:-translate-y-2 ${
                  hito.alignment === "left"
                    ? "sm:pr-10 sm:items-end sm:text-right"
                    : "sm:pl-10 sm:items-start sm:text-left"
                }`}
              >
                {/* Año y Título */}
                <span className="stat-number text-6xl mb-2 drop-shadow-md transition-all duration-300 group-hover:scale-105 origin-center">
                  {hito.year}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-proyecta-navy dark:text-white mb-4 font-sans">
                  {hito.title}
                </h3>

                {/* Tarjeta Glassmorphism conteniendo Imagen + Texto */}
                <div className="glass p-3 rounded-[2rem] w-full max-w-lg relative overflow-hidden group-hover:bg-proyecta-cyan/5 dark:group-hover:bg-proyecta-cyan/10 transition-colors duration-300">
                  {/* Imagen interactiva */}
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-[1.5rem] mb-4">
                    <img
                      src={hito.image}
                      alt={`Imagen representativa del hito: ${hito.title}`}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    />
                    {/* Overlay para garantizar que no rompa el estilo en modo oscuro/claro si la imagen es muy brillante */}
                    <div className="absolute inset-0 bg-proyecta-navy/20 dark:bg-[#0D1F2A]/40 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>

                  {/* Descripción */}
                  <div className="px-4 pb-4">
                    <p className="relative z-10 text-proyecta-navy/80 dark:text-proyecta-cyan/80 leading-relaxed">
                      {hito.description}
                    </p>
                  </div>

                  {/* Brillo de fondo sutil al hacer hover */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-proyecta-cyan/0 via-proyecta-cyan/10 to-proyecta-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Punta de la flecha al final */}
          <div className="absolute left-8 sm:left-1/2 bottom-[-10px] transform -translate-x-1/2 text-proyecta-yellow text-4xl animate-bounce">
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}
