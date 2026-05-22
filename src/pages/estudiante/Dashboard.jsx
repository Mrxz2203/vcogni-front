import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EstudianteLayout from '../../components/EstudianteLayout'

export default function Dashboard() {
  const navigate = useNavigate()
  const [estado, setEstado] = useState('sin-prueba')

  return (
    <EstudianteLayout>
      <div className="flex flex-col gap-8 max-w-5xl mx-auto px-4">

        {/* TOGGLE ESTADO */}
        <div className="flex items-center gap-3 bg-[#E1F5EE] px-4 py-2 rounded-full w-fit">
          <span className="text-sm font-medium text-[#1F252E]">Estado</span>
          <button
            onClick={() => setEstado('sin-prueba')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              estado === 'sin-prueba' ? 'bg-[#1F252E] text-[#9FE1CB]' : 'bg-gray-200 text-[#1F252E]'
            }`}
          >
            Sin prueba realizada
          </button>
          <button
            onClick={() => setEstado('con-prueba')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              estado === 'con-prueba' ? 'bg-[#1F252E] text-[#9FE1CB]' : 'bg-gray-200 text-[#1F252E]'
            }`}
          >
            Con prueba realizada
          </button>
        </div>

        {/* ── ESTADO: SIN PRUEBA ── */}
        {estado === 'sin-prueba' && (
          <>
            {/* TARJETA PRINCIPAL */}
            <div className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center shadow-lg bg-[#1F252E]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[rgba(159,225,203,0.15)]">
                <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
                  <ellipse cx="14" cy="9" rx="13" ry="8" stroke="#9FE1CB" strokeWidth="1.5"/>
                  <circle cx="14" cy="9" r="4" fill="#9FE1CB"/>
                </svg>
              </div>

              <h2 className="text-xl font-semibold text-white">
                Aún no tienes un perfil cognitivo
              </h2>
              <p className="text-sm leading-relaxed max-w-sm text-white/70">
                Realiza tu primera sesión de seguimiento ocular para descubrir
                cómo procesas la información. Solo toma 10 minutos.
              </p>

              <button
                onClick={() => navigate('/estudiante/prueba')}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition hover:opacity-90 mt-2 bg-white text-[#1F252E]"
              >
                <svg width="16" height="11" viewBox="0 0 28 18" fill="none">
                  <ellipse cx="14" cy="9" rx="13" ry="8" stroke="#1F252E" strokeWidth="1.5"/>
                  <circle cx="14" cy="9" r="4" fill="#1F252E"/>
                </svg>
                Iniciar mi primera sesión
              </button>
            </div>

            {/* 3 PASOS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: '1',
                  title: 'Calibra tu cámara',
                  desc: 'El sistema detecta tu rostro con la webcam. No se graba video.'
                },
                {
                  num: '2',
                  title: 'Realiza la tarea',
                  desc: 'Lee el material que te asignó tu docente mientras el sistema analiza tu mirada.'
                },
                {
                  num: '3',
                  title: 'Ve tu perfil',
                  desc: 'Recibes tu clasificación visual o verbal y recomendaciones de estudio.'
                },
              ].map((paso) => (
                <div
                  key={paso.num}
                  className="rounded-2xl p-5 flex flex-col gap-2 shadow-md bg-[#1F252E]"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#9FE1CB] text-[#1F252E]">
                    {paso.num}
                  </div>
                  <p className="text-sm font-semibold text-white">{paso.title}</p>
                  <p className="text-xs leading-relaxed text-white/50">{paso.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── ESTADO: CON PRUEBA ── */}
        {estado === 'con-prueba' && (
          <>
            {/* TARJETA RESULTADO */}
            <div className="rounded-2xl p-10 flex flex-col gap-6 shadow-lg bg-[#1F252E]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs mb-1 text-[#9FE1CB]/60">ÚLTIMA PRUEBA</p>
                  <h2 className="text-2xl font-bold text-white">
                    Tu perfil cognitivo es <span className="text-[#9FE1CB]">Visual</span>
                  </h2>
                  <p className="text-xs mt-1 text-white/40">
                    20 de mayo 2026 · WebGazer.js
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-[#9FE1CB]">87%</p>
                  <p className="text-xs text-white/40">confianza</p>
                </div>
              </div>

              {/* Barra */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-white/50">
                  <span>Perfil Visual</span>
                  <span>87%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden bg-[#9FE1CB]/20">
                  <div className="h-2 rounded-full bg-[#9FE1CB]" style={{ width: '87%' }} />
                </div>
              </div>

              <button
                onClick={() => navigate('/estudiante/resultados')}
                className="self-start px-5 py-2 rounded-full text-xs font-medium mt-1 transition hover:opacity-90 bg-[#9FE1CB] text-[#1F252E]"
              >
                Ver resultado completo →
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'PRUEBAS REALIZADAS', valor: '8', sub: 'Este semestre' },
                { label: 'CONFIANZA PROMEDIO', valor: '85%', sub: 'Modelo CNN + XGBoost' },
                { label: 'ÚLTIMA PRUEBA', valor: '20 may', sub: 'Perfil Visual · 87%' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-5 text-center shadow-md bg-[#1F252E]"
                >
                  <p className="text-xs mb-2 text-[#9FE1CB]/50">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#9FE1CB]">{stat.valor}</p>
                  <p className="text-xs mt-1 text-white/40">{stat.sub}</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </EstudianteLayout>
  )
}
