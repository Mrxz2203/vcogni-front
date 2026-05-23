import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor — agrega el token JWT a cada request automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── AUTH ──────────────────────────────────────────────
export const registroAPI = (data) => api.post('/auth/registro', data)
export const loginAPI = (data) => api.post('/auth/login', data)

// ── SESIONES ──────────────────────────────────────────
export const iniciarSesionAPI = (user_id) =>
  api.post(`/sesiones/iniciar?user_id=${user_id}`)

export const guardarGazeAPI = (data) =>
  api.post('/sesiones/guardar-gaze', data)

export const finalizarSesionAPI = (data) =>
  api.post('/sesiones/finalizar', data)

// ── RESULTADOS ────────────────────────────────────────
export const ultimoResultadoAPI = (user_id) =>
  api.get(`/resultados/ultimo/${user_id}`)

export const historialAPI = (user_id) =>
  api.get(`/resultados/historial/${user_id}`)

export const perfilAPI = (user_id) =>
  api.get(`/resultados/perfil/${user_id}`)

export const actualizarPerfilAPI = (user_id, nombre, carrera) =>
  api.put(`/resultados/perfil/${user_id}?nombre=${nombre}&carrera=${carrera}`)

export default api