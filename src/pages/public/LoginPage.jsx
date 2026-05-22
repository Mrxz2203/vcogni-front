import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cogni from '../../assets/cogni.png'
import loginImg from '../../assets/login.png'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    codigo: '',
    contrasena: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    navigate('/estudiante/inicio')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E1F5EE' }}>
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-12 py-2 bg-[#E1F5EE] z-50">
        <img
          src={cogni}
          alt="Logo"
          className="w-20 h-20 object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
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

      {/* CONTENIDO */}
      <div className="flex flex-1 pt-24 px-12 gap-12 items-center">
        
        {/* IZQUIERDA */}
        <div className="flex-1 flex flex-col items-start max-w-md">
          {/* Texto arriba */}
          <h2 className="text-3xl font-bold mb-12 text-[#1F252E]">
            ¡Inicia sesión para <br /> empezar a explorar!
          </h2>

          {/* Imagen más abajo */}
          <div className="mt-auto w-full flex justify-center">
            <img
              src={loginImg}
              alt="Ilustración login"
              className="w-80 object-contain"
            />
          </div>
        </div>

        {/* DERECHA — FORMULARIO */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
            
            <h3 className="text-xl font-semibold mb-6 text-[#1F252E]">
              Bienvenido de vuelta
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="codigo"
                placeholder="Código institucional"
                value={form.codigo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none border-gray-300"
                required
              />
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={form.contrasena}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none border-gray-300"
                required
              />

              {/* BOTONES */}
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: '#1F252E', color: '#FFFFFF' }}
                >
                  Iniciar sesión
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
                ¿No tienes cuenta?{' '}
                <span
                  className="font-medium cursor-pointer text-[#1F252E]"
                  onClick={() => navigate('/registro')}
                >
                  Regístrate aquí
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
