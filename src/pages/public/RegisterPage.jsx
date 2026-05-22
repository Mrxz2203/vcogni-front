import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cogni from '../../assets/cogni.png'
import registerImg from '../../assets/register.png'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [rol, setRol] = useState('estudiante')
  const [form, setForm] = useState({
    nombre: '',
    codigo: '',
    contrasena: '',
    carrera: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ rol, ...form })
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E1F5EE' }}>
      
      {/* NAVBAR compacto */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-12 py-2 bg-[#E1F5EE] z-50">
        <img src={cogni} alt="Logo" className="w-20 h-20 object-contain cursor-pointer"
          onClick={() => navigate('/')} />
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/registro')}
            className="px-6 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#C5C5C5', color: '#1F252E' }}
          >
            Registrarse
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#1F252E', color: '#FFFFFF' }}
          >
            Iniciar Sesión
          </button>
        </div>
      </nav>

      {/* CONTENIDO sin exceso de padding */}
      <div className="flex flex-1 pt-24 px-12 gap-12 items-center">
        
        {/* IZQUIERDA */}
        <div className="flex-1 flex flex-col justify-center max-w-md">
          <h2 className="text-4xl font-bold mb-2 text-[#1F252E]">
            Conoce cómo aprendes,
          </h2>
          <h2 className="text-4xl font-bold mb-6 text-[#1F252E]">
            no solo qué aprendes.
          </h2>
          <img src={registerImg} alt="Ilustración registro" className="w-72 object-contain mx-auto" />
        </div>

        {/* DERECHA — FORMULARIO */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
            
            {/* SELECTOR DE ROL */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setRol('estudiante')}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                  rol === 'estudiante' ? 'border-[#1F252E] bg-green-50' : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-xl">🎓</span>
                <span className="text-sm font-medium text-[#1F252E]">Estudiante</span>
              </button>
              <button
                onClick={() => setRol('docente')}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                  rol === 'docente' ? 'border-[#1F252E] bg-green-50' : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-xl">📋</span>
                <span className="text-sm font-medium text-[#1F252E]">Docente</span>
              </button>
            </div>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none border-gray-300"
              />
              <input
                type="text"
                name="codigo"
                placeholder="Código institucional"
                value={form.codigo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none border-gray-300"
              />
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={form.contrasena}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none border-gray-300"
              />

              {rol === 'estudiante' && (
                <select
                  name="carrera"
                  value={form.carrera}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none border-gray-300"
                >
                  <option value="">Universidad</option>
                  <option value="ingenieria_sistemas">Ingeniería de Sistemas</option>
                  <option value="ingenieria_industrial">Ingeniería Industrial</option>
                  <option value="administracion">Administración</option>
                  <option value="contabilidad">Contabilidad</option>
                  <option value="derecho">Derecho</option>
                  <option value="medicina">Medicina</option>
                  <option value="otra">Otra</option>
                </select>
              )}

              {/* BOTONES */}
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: '#1F252E', color: '#FFFFFF' }}
                >
                  Registrar
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium border transition hover:opacity-80 border-gray-300 text-gray-600"
                >
                  Cancelar
                </button>
              </div>

              <p className="text-center text-xs mt-1 text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <span
                  className="font-medium cursor-pointer text-[#1F252E]"
                  onClick={() => navigate('/login')}
                >
                  Inicia sesión
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full text-center py-3 text-sm bg-[#1F252E] text-white">
        Copyright © 2026 · Todos los derechos reservados a V-COGNI
      </footer>
    </div>
  )
}
