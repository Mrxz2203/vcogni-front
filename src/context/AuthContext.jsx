import { createContext, useContext, useState, useEffect } from 'react'
import { loginAPI, registroAPI } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  // Al cargar la app, revisar si hay sesión guardada
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('usuario')
    if (token && user) {
      setUsuario(JSON.parse(user))
    }
    setCargando(false)
  }, [])

  const login = async (codigo, password) => {
    const res = await loginAPI({ codigo, password })
    const data = res.data

    // Guardar token y datos del usuario
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('usuario', JSON.stringify({
      id: data.user_id,
      nombre: data.nombre,
      rol: data.rol
    }))

    setUsuario({
      id: data.user_id,
      nombre: data.nombre,
      rol: data.rol
    })

    return data.rol
  }

  const registro = async (form) => {
    const res = await registroAPI(form)
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}