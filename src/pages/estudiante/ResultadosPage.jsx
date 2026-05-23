import { useNavigate } from 'react-router-dom'
import EstudianteLayout from '../../components/EstudianteLayout'

export default function ResultadosPage() {
  const navigate = useNavigate()

  return (
    <EstudianteLayout>
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-sm" style={{ color: '#1F252E' }}>
          Para ver tus resultados, primero realiza una prueba biométrica.
        </p>
        <button
          onClick={() => navigate('/estudiante/prueba')}
          className="px-6 py-2.5 rounded-full text-sm font-semibold"
          style={{ backgroundColor: '#1F252E', color: '#9FE1CB' }}
        >
          Ir a Prueba Biométrica
        </button>
      </div>
    </EstudianteLayout>
  )
}