import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import Dashboard from './pages/estudiante/Dashboard'
import PruebaPage from './pages/estudiante/PruebaPage'
import ResultadosPage from './pages/estudiante/ResultadosPage'
import HistorialPage from './pages/estudiante/HistorialPage'
import PerfilPage from './pages/estudiante/PerfilPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {/* Estudiante */}
        <Route path="/estudiante/inicio" element={<Dashboard />} />
        <Route path="/estudiante/prueba" element={<PruebaPage />} />
        <Route path="/estudiante/resultados" element={<ResultadosPage />} />
        <Route path="/estudiante/historial" element={<HistorialPage />} />
        <Route path="/estudiante/perfil" element={<PerfilPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App