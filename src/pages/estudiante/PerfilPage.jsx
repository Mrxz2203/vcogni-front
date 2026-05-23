import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EstudianteLayout from '../../components/EstudianteLayout'
import { useAuth } from '../../context/AuthContext'
import { perfilAPI } from '../../services/api'


export default function PerfilPage() {
  const navigate = useNavigate()
  const [editando, setEditando] = useState(false)
  const [guardado, setGuardado] = useState(false)

  const { usuario } = useAuth()

const [form, setForm] = useState({
  nombre: '',
  codigo: '',
  carrera: '',
  contrasenaActual: '',
  contrasenaNueva: '',
})

// Cargar datos reales del backend
useEffect(() => {
  if (usuario?.id) {
    perfilAPI(usuario.id)
      .then(res => {
        setForm(prev => ({
          ...prev,
          nombre: res.data.nombre,
          codigo: res.data.codigo,
          carrera: res.data.carrera || 'ingenieria_sistemas'
        }))
      })
      .catch(err => console.error(err))
  }
}, [usuario])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleGuardar = (e) => {
    e.preventDefault()
    // Aquí irá la llamada al backend
    console.log(form)
    setEditando(false)
    setGuardado(true)
    setTimeout(() => setGuardado(false), 3000)
  }

  return (
    <EstudianteLayout>
      <div className="flex flex-col gap-5 max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#1F252E' }}>Mi perfil</h1>
            <p className="text-xs mt-1" style={{ color: 'rgba(31,37,46,0.5)' }}>
              Gestiona tu información personal y privacidad
            </p>
          </div>
          {!editando && (
            <button
              onClick={() => setEditando(true)}
              className="px-5 py-2 rounded-full text-sm font-medium transition hover:opacity-90"
              style={{ backgroundColor: '#1F252E', color: '#9FE1CB' }}
            >
              Editar perfil
            </button>
          )}
        </div>

        {/* MENSAJE GUARDADO */}
        {guardado && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style={{ backgroundColor: 'rgba(8,80,65,0.1)', color: '#085041' }}>
            ✓ Cambios guardados correctamente
          </div>
        )}

        {/* AVATAR + NOMBRE */}
        <div className="rounded-2xl p-6 flex items-center gap-5"
          style={{ backgroundColor: '#1F252E' }}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
            style={{ backgroundColor: '#9FE1CB', color: '#1F252E' }}
          >
            {form.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-lg font-bold" style={{ color: '#FFFFFF' }}>{form.nombre}</p>
            <p className="text-sm" style={{ color: 'rgba(159,225,203,0.6)' }}>{form.codigo}</p>
            <span
              className="text-xs px-3 py-1 rounded-full mt-1 inline-block"
              style={{ backgroundColor: 'rgba(159,225,203,0.15)', color: '#9FE1CB' }}
            >
              Estudiante
            </span>
          </div>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleGuardar} className="flex flex-col gap-4">

          <div className="rounded-2xl p-5 flex flex-col gap-4"
            style={{ backgroundColor: '#1F252E' }}>
            <p className="text-xs font-medium" style={{ color: 'rgba(159,225,203,0.5)' }}>
              INFORMACIÓN PERSONAL
            </p>

            <div>
              <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                disabled={!editando}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition"
                style={{
                  backgroundColor: editando ? 'rgba(159,225,203,0.08)' : 'rgba(255,255,255,0.04)',
                  border: editando ? '1px solid rgba(159,225,203,0.3)' : '1px solid transparent',
                  color: '#FFFFFF'
                }}
              />
            </div>

            <div>
              <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Código institucional
              </label>
              <input
                type="text"
                name="codigo"
                value={form.codigo}
                disabled
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid transparent',
                  color: 'rgba(255,255,255,0.4)'
                }}
              />
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                El código institucional no puede modificarse
              </p>
            </div>

            <div>
              <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Carrera
              </label>
              <select
                name="carrera"
                value={form.carrera}
                onChange={handleChange}
                disabled={!editando}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition"
                style={{
                  backgroundColor: editando ? 'rgba(159,225,203,0.08)' : 'rgba(255,255,255,0.04)',
                  border: editando ? '1px solid rgba(159,225,203,0.3)' : '1px solid transparent',
                  color: '#FFFFFF'
                }}
              >
                <option value="ingenieria_sistemas" style={{ backgroundColor: '#1F252E' }}>Ingeniería de Sistemas</option>
                <option value="ingenieria_industrial" style={{ backgroundColor: '#1F252E' }}>Ingeniería Industrial</option>
                <option value="administracion" style={{ backgroundColor: '#1F252E' }}>Administración</option>
                <option value="contabilidad" style={{ backgroundColor: '#1F252E' }}>Contabilidad</option>
                <option value="derecho" style={{ backgroundColor: '#1F252E' }}>Derecho</option>
                <option value="medicina" style={{ backgroundColor: '#1F252E' }}>Medicina</option>
                <option value="otra" style={{ backgroundColor: '#1F252E' }}>Otra</option>
              </select>
            </div>
          </div>

          {/* CAMBIAR CONTRASEÑA */}
          {editando && (
            <div className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: '#1F252E' }}>
              <p className="text-xs font-medium" style={{ color: 'rgba(159,225,203,0.5)' }}>
                CAMBIAR CONTRASEÑA (opcional)
              </p>
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Contraseña actual
                </label>
                <input
                  type="password"
                  name="contrasenaActual"
                  placeholder="••••••••"
                  value={form.contrasenaActual}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    backgroundColor: 'rgba(159,225,203,0.08)',
                    border: '1px solid rgba(159,225,203,0.3)',
                    color: '#FFFFFF'
                  }}
                />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  name="contrasenaNueva"
                  placeholder="••••••••"
                  value={form.contrasenaNueva}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    backgroundColor: 'rgba(159,225,203,0.08)',
                    border: '1px solid rgba(159,225,203,0.3)',
                    color: '#FFFFFF'
                  }}
                />
              </div>
            </div>
          )}

          {/* PRIVACIDAD */}
          <div className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ backgroundColor: '#1F252E' }}>
            <p className="text-xs font-medium" style={{ color: 'rgba(159,225,203,0.5)' }}>
              PRIVACIDAD Y CONSENTIMIENTO
            </p>
            <div className="flex items-start gap-3 p-3 rounded-xl"
              style={{ backgroundColor: 'rgba(159,225,203,0.06)' }}>
              <span className="text-lg">🔒</span>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#9FE1CB' }}>
                  Consentimiento de datos biométricos
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Has aceptado el uso de tus datos de gaze únicamente con fines académicos.
                  No se almacena video. Puedes revocar en cualquier momento.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="text-xs px-4 py-2 rounded-full border w-fit transition hover:opacity-80"
              style={{ borderColor: '#ef4444', color: '#ef4444' }}
            >
              Revocar consentimiento
            </button>
          </div>

          {/* BOTONES */}
          {editando && (
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full text-sm font-semibold transition hover:opacity-90"
                style={{ backgroundColor: '#9FE1CB', color: '#1F252E' }}
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={() => setEditando(false)}
                className="flex-1 py-2.5 rounded-full text-sm border transition hover:opacity-80"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>

      </div>
    </EstudianteLayout>
  )
}