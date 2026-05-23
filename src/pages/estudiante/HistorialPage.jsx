import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EstudianteLayout from '../../components/EstudianteLayout'

// Data temporal — luego vendrá del backend
const HISTORIAL_DATA = [
  { id: 1, fecha: '20 may 2026', hora: '10:34 am', perfil: 'Visual', porcentaje: 87, confianza: 91, duracion: '3:12', fijaciones: 34, sacadas: 28, duracionMedia: 347 },
  { id: 2, fecha: '10 may 2026', hora: '09:15 am', perfil: 'Visual', porcentaje: 82, confianza: 85, duracion: '3:05', fijaciones: 29, sacadas: 22, duracionMedia: 312 },
  { id: 3, fecha: '02 may 2026', hora: '11:50 am', perfil: 'Verbal', porcentaje: 61, confianza: 78, duracion: '2:58', fijaciones: 18, sacadas: 31, duracionMedia: 198 },
  { id: 4, fecha: '24 abr 2026', hora: '08:40 am', perfil: 'Visual', porcentaje: 79, confianza: 83, duracion: '3:20', fijaciones: 31, sacadas: 25, duracionMedia: 298 },
  { id: 5, fecha: '15 abr 2026', hora: '10:05 am', perfil: 'Verbal', porcentaje: 70, confianza: 80, duracion: '3:00', fijaciones: 21, sacadas: 29, duracionMedia: 221 },
  { id: 6, fecha: '05 abr 2026', hora: '09:30 am', perfil: 'Visual', porcentaje: 84, confianza: 88, duracion: '3:15', fijaciones: 33, sacadas: 24, duracionMedia: 334 },
]

export default function HistorialPage() {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState('todos')
  const [seleccionado, setSeleccionado] = useState(null)

  const datos = filtro === 'todos'
    ? HISTORIAL_DATA
    : HISTORIAL_DATA.filter(h => h.perfil.toLowerCase() === filtro)

  const totalPruebas = HISTORIAL_DATA.length
  const visuales = HISTORIAL_DATA.filter(h => h.perfil === 'Visual').length
  const confPromedio = Math.round(HISTORIAL_DATA.reduce((a, b) => a + b.confianza, 0) / totalPruebas)
  const ultima = HISTORIAL_DATA[0]

  return (
    <EstudianteLayout>
      <div className="flex flex-col gap-5">

        {/* STATS */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'TOTAL DE PRUEBAS', valor: totalPruebas, sub: 'Realizadas' },
            { label: 'PERFIL DOMINANTE', valor: 'Visual', sub: `En ${visuales} de ${totalPruebas} pruebas` },
            { label: 'CONFIANZA PROMEDIO', valor: `${confPromedio}%`, sub: 'Modelo CNN + XGBoost' },
            { label: 'ÚLTIMA PRUEBA', valor: ultima.fecha, sub: `Perfil ${ultima.perfil} · ${ultima.porcentaje}%` },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4"
              style={{ backgroundColor: '#1F252E' }}>
              <p className="text-xs mb-2" style={{ color: 'rgba(159,225,203,0.5)' }}>{s.label}</p>
              <p className="text-xl font-bold" style={{ color: '#9FE1CB' }}>{s.valor}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* FILTROS */}
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: '#1F252E' }}>Filtrar por perfil:</span>
          {['todos', 'visual', 'verbal'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all"
              style={{
                backgroundColor: filtro === f ? '#1F252E' : 'rgba(31,37,46,0.1)',
                color: filtro === f ? '#9FE1CB' : '#1F252E'
              }}
            >
              {f === 'todos' ? 'Todas' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* TABLA */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#1F252E' }}>

          {/* Cabecera */}
          <div className="grid grid-cols-7 gap-2 px-5 py-3"
            style={{ backgroundColor: 'rgba(159,225,203,0.08)' }}>
            {['#', 'FECHA Y HORA', 'PERFIL', 'RESULTADO', 'CONFIANZA', 'DURACIÓN', ''].map((h) => (
              <p key={h} className="text-xs font-medium"
                style={{ color: 'rgba(159,225,203,0.5)' }}>{h}</p>
            ))}
          </div>

          {/* Filas */}
          {datos.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSeleccionado(item)}
              className="grid grid-cols-7 gap-2 px-5 py-3 cursor-pointer transition-all items-center"
              style={{
                borderTop: '0.5px solid rgba(159,225,203,0.08)',
                backgroundColor: seleccionado?.id === item.id
                  ? 'rgba(159,225,203,0.08)'
                  : 'transparent'
              }}
            >
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{idx + 1}</p>
              <div>
                <p className="text-xs font-medium" style={{ color: '#FFFFFF' }}>{item.fecha}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.hora}</p>
              </div>
              <span
                className="text-xs font-medium px-3 py-1 rounded-full w-fit"
                style={{
                  backgroundColor: item.perfil === 'Visual'
                    ? 'rgba(159,225,203,0.15)'
                    : 'rgba(83,74,183,0.2)',
                  color: item.perfil === 'Visual' ? '#9FE1CB' : '#a89ff5'
                }}
              >
                {item.perfil}
              </span>
              <p className="text-sm font-bold"
                style={{ color: item.perfil === 'Visual' ? '#9FE1CB' : '#a89ff5' }}>
                {item.porcentaje}%
              </p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.confianza}%</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.duracion} min</p>
              <button
                onClick={(e) => { e.stopPropagation(); setSeleccionado(item) }}
                className="text-xs px-3 py-1 rounded-full border w-fit transition hover:opacity-80"
                style={{ borderColor: '#9FE1CB', color: '#9FE1CB' }}
              >
                Ver
              </button>
            </div>
          ))}
        </div>

        {/* BOTÓN NUEVA PRUEBA */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate('/estudiante/prueba')}
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition hover:opacity-90"
            style={{ backgroundColor: '#1F252E', color: '#9FE1CB' }}
          >
            + Nueva prueba
          </button>
        </div>

      </div>

      {/* MODAL DETALLE */}
      {seleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSeleccionado(null)}>
          <div
            className="rounded-2xl overflow-hidden w-full max-w-md mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="p-5" style={{ backgroundColor: '#085041' }}>
              <p className="text-xs mb-1" style={{ color: 'rgba(159,225,203,0.6)' }}>
                PRUEBA BIOMÉTRICA
              </p>
              <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                Perfil {seleccionado.perfil} · {seleccionado.porcentaje}%
              </h3>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {seleccionado.fecha} · {seleccionado.hora} · Confianza {seleccionado.confianza}%
              </p>
              <div className="flex items-center gap-2 mt-2 w-fit px-2 py-1 rounded"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#9FE1CB' }} />
                <span className="text-xs" style={{ color: '#9FE1CB' }}>WebGazer.js</span>
              </div>
            </div>

            {/* Body modal */}
            <div className="p-5 flex flex-col gap-4" style={{ backgroundColor: '#1F252E' }}>
              <p className="text-xs" style={{ color: 'rgba(159,225,203,0.5)' }}>MÉTRICAS DE GAZE</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Fijaciones totales', valor: seleccionado.fijaciones },
                  { label: 'Duración fijación', valor: `${seleccionado.duracionMedia} ms` },
                  { label: 'Sacadas totales', valor: seleccionado.sacadas },
                  { label: 'Duración sesión', valor: `${seleccionado.duracion} min` },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl p-3"
                    style={{ backgroundColor: 'rgba(159,225,203,0.06)' }}>
                    <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.label}</p>
                    <p className="text-base font-semibold" style={{ color: '#9FE1CB' }}>{m.valor}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(159,225,203,0.08)' }}>
                <p className="text-xs leading-relaxed" style={{ color: '#9FE1CB' }}>
                  {seleccionado.perfil === 'Visual'
                    ? 'Perfil Visual confirmado. Tus fijaciones largas indican procesamiento visual activo.'
                    : 'Perfil Verbal confirmado. Tu patrón de gaze indica procesamiento textual predominante.'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSeleccionado(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm border transition hover:opacity-80"
                  style={{ borderColor: 'rgba(159,225,203,0.3)', color: 'rgba(255,255,255,0.6)' }}
                >
                  Cerrar
                </button>
                <button
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: '#9FE1CB', color: '#1F252E' }}
                >
                  Ver resultado completo →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </EstudianteLayout>
  )
}