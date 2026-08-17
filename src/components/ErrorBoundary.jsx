import { Component } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

// Los error boundaries solo se pueden implementar con un componente de
// clase (React no ofrece un hook equivalente todavía).
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error no capturado en la app:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-proyecta-surface px-6 text-center transition-colors duration-300">
          <div className="p-6 bg-proyecta-cyan/10 rounded-full mb-8">
            <AlertTriangle
              size={56}
              className="text-proyecta-teal dark:text-proyecta-cyan"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-proyecta-navy dark:text-white mb-4 font-display">
            Algo salió mal
          </h2>
          <p className="max-w-md text-lg text-proyecta-navy/70 dark:text-white/70 leading-relaxed mb-8">
            Ocurrió un error inesperado en esta página. Intenta recargar; si
            el problema persiste, vuelve más tarde.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            <RotateCcw size={18} />
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
