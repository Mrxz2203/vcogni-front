import { useNavigate } from 'react-router-dom'
import analisis from '../../assets/analisis.png'
import cogni from '../../assets/cogni.png'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#9FE1CB' }}>
      
      {/* NAVBAR fijo */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-12 py-4 bg-[#9FE1CB] z-50">
        {/* Logo más grande */}
        <img src={cogni} alt="Logo Cogni" className="w-24 h-24 object-contain"/>

        {/* Botones */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/registro')}
            className="px-6 py-2 rounded-full text-sm font-medium transition hover:opacity-80"
            style={{ backgroundColor: '#C5C5C5', color: '#1F252E' }}
          >
            Registrarse
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-full text-sm font-medium transition hover:opacity-80"
            style={{ backgroundColor: '#1F252E', color: '#FFFFFF' }}
          >
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* HERO centrado */}
      <main className="flex flex-1 items-center justify-between px-12 pt-40 gap-12">
        
        {/* Texto principal */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight mb-6 text-[#1F252E]">
            Identifica el <span className="text-[#1F252E]">estilo cognitivo</span> de tus estudiantes en tiempo real
          </h1>
          <p className="text-base mb-10 leading-relaxed text-[#1F252E] opacity-80">
            V-COGNI analiza el comportamiento visual mediante webcam estándar
            para clasificar perfiles cognitivos de forma objetiva, no invasiva
            y con más del 82% de exactitud.
          </p>
        </div>

        {/* Ilustración derecha */}
        <div className="flex-1 flex justify-center">
          <img src={analisis} alt="Ilustración estudiante" className="max-w-md w-full object-contain"/>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto text-center py-6 text-sm" style={{ backgroundColor: '#1F252E', color: '#FFFFFF' }}>
        Copyright © 2026 · Todos los derechos reservados a V-COGNI
      </footer>
    </div>
  )
}
