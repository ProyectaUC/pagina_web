import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import QuienesSomos from './components/QuienesSomos'
import Impacto     from './components/Impacto'
import Programas   from './components/Programas'
import Apoyanos    from './components/Apoyanos'
import Contacto    from './components/Contacto'

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0D1F2A] font-sans">
      <Navbar />

      <main>
        <Hero />
        <QuienesSomos />
        <Impacto />
        <Programas />
        <Apoyanos />
        <Contacto />
      </main>
    </div>
  )
}
