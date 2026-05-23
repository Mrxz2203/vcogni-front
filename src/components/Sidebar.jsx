import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import cogni from '../assets/cogni.png'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showModal, setShowModal] = useState(false)
  const { logout } = useAuth()

  const links = [
    { path: '/estudiante/inicio',    label: 'Inicio',             icon: '🏠' },
    { path: '/estudiante/perfil',    label: 'Mi perfil',          icon: '👤' },
    { path: '/estudiante/prueba',    label: 'Prueba Biométrica',  icon: '👁️' },
    { path: '/estudiante/historial', label: 'Historial',          icon: '🕐' },
  ]

  const handleCerrarSesion = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {/* SIDEBAR */}
      <div
        className="fixed top-0 left-0 h-full w-48 flex flex-col z-40"
        style={{ backgroundColor: '#1F252E' }}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2 px-4 py-4 border-b"
          style={{ borderColor: 'rgba(159,225,203,0.15)' }}>
          <div className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: '#9FE1CB' }}>
            <svg width="16" height="11" viewBox="0 0 28 18" fill="none">
              <ellipse cx="14" cy="9" rx="13" ry="8" stroke="#9FE1CB" strokeWidth="1.5"/>
              <circle cx="14" cy="9" r="4" fill="#9FE1CB"/>
            </svg>
          </div>
          <span className="font-bold text-sm" style={{ color: '#9FE1CB' }}>V-COGNI</span>
        </div>

        {/* LINKS */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all"
                style={{
                  backgroundColor: isActive ? 'rgba(159,225,203,0.15)' : 'transparent',
                  color: isActive ? '#9FE1CB' : 'rgba(159,225,203,0.6)',
                  borderLeft: isActive ? '2px solid #9FE1CB' : '2px solid transparent'
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            )
          })}
        </nav>

        {/* CERRAR SESIÓN */}
        <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(159,225,203,0.15)' }}>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-left transition-all hover:opacity-80"
            style={{ color: '#ef4444' }}
          >
            <span>↪</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>

      {/* MODAL CERRAR SESIÓN */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-4 shadow-xl">

            {/* Ícono advertencia */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
              style={{ backgroundColor: '#FEF3C7' }}>
              ⚠️
            </div>

            <h3 className="text-lg font-semibold text-center" style={{ color: '#1F252E' }}>
              ¿Cerrar sesión?
            </h3>

            <p className="text-sm text-center leading-relaxed" style={{ color: '#6b7280' }}>
              ¿Estás seguro de que quieres cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder a tu cuenta.
            </p>

            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={handleCerrarSesion}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition hover:opacity-90"
                style={{ backgroundColor: '#ef4444', color: '#FFFFFF' }}
              >
                Cerrar Sesión
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium border transition hover:opacity-80"
                style={{ borderColor: '#e5e7eb', color: '#6b7280' }}
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}