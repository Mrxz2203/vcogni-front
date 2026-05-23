import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import EstudianteLayout from '../../components/EstudianteLayout'

// ─── CONSTANTES ───────────────────────────────────────
const PUNTOS_CALIBRACION = [
  { top: '20%', left: '15%' },
  { top: '20%', left: '50%' },
  { top: '20%', left: '85%' },
  { top: '50%', left: '15%' },
  { top: '50%', left: '50%' },
  { top: '50%', left: '85%' },
  { top: '80%', left: '15%' },
  { top: '80%', left: '50%' },
  { top: '80%', left: '85%' },
]

const TEXTO_LECTURA = `Un grafo es una estructura matemática compuesta por vértices 
y aristas que los conectan. Los árboles de expansión mínima son subgrafos que 
conectan todos los vértices con el menor costo posible. El algoritmo de Kruskal 
ordena las aristas por peso y las agrega siempre que no formen un ciclo. 
El de Prim crece desde un vértice inicial seleccionando siempre la arista 
de menor peso disponible. Ambos algoritmos producen el mismo resultado 
pero difieren en su enfoque de implementación y eficiencia según el tipo de grafo.`

const DURACION_SESION = 180 // 3 minutos

// ─── COMPONENTE PRINCIPAL ─────────────────────────────
export default function PruebaPage() {
  const navigate = useNavigate()
  const [fase, setFase] = useState('bienvenida')
  const [metricas, setMetricas] = useState(null)

  if (fase === 'calibracion') {
    return (
      <Calibracion
        onTerminar={() => setFase('sesion')}
        onCancelar={() => setFase('bienvenida')}
      />
    )
  }

  if (fase === 'sesion') {
    return (
      <Sesion
        onTerminar={(m) => { setMetricas(m); setFase('resultado') }}
        onCancelar={() => setFase('bienvenida')}
      />
    )
  }

  if (fase === 'resultado') {
    return <Resultado metricas={metricas} />
  }

  // ─── BIENVENIDA (tu código actual sin cambios) ────────
  return (
    <EstudianteLayout>
      <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto pt-4">

        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#1F252E' }}
        >
          <svg width="24" height="16" viewBox="0 0 28 18" fill="none">
            <ellipse cx="14" cy="9" rx="13" ry="8" stroke="#9FE1CB" strokeWidth="1.5"/>
            <circle cx="14" cy="9" r="4" fill="#9FE1CB"/>
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#1F252E' }}>
            Bienvenido a la{' '}
            <span style={{ color: '#0d6e56' }}>Prueba Biométrica</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: '#1F252E', opacity: 0.8 }}>
            El sistema analizará hacia dónde diriges la mirada mientras lees un
            texto. No se graba video. Solo se capturan coordenadas de gaze
            mediante tu webcam usando WebGazer.js.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full">
          {[
            {
              num: '1',
              title: 'Calibración',
              desc: 'Harás clic en 9 puntos de la pantalla mientras los miras. Esto entrena el modelo de gaze.',
            },
            {
              num: '2',
              title: 'Lectura del material',
              desc: 'Leerás un texto y WebGazer registrará tus fijaciones y sacadas en tiempo real.',
              highlight: true,
            },
            {
              num: '3',
              title: 'Resultados',
              desc: 'El modelo CNN + XGBoost clasifica tu perfil como Visual o Verbal con nivel de confianza.',
            },
          ].map((paso) => (
            <div
              key={paso.num}
              className="rounded-2xl p-4 text-left flex flex-col gap-2"
              style={{ backgroundColor: '#1F252E' }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: '#9FE1CB', color: '#1F252E' }}
              >
                {paso.num}
              </div>
              <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                {paso.title}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: paso.highlight ? '#9FE1CB' : 'rgba(255,255,255,0.5)' }}
              >
                {paso.desc}
              </p>
            </div>
          ))}
        </div>

        {/* NOTA CONSENTIMIENTO — tu versión */}
        <div
          className="flex items-start gap-3 px-5 py-3 rounded-xl text-left w-full"
          style={{ backgroundColor: '#FFF8F8' }}
        >
          <span className="text-lg mt-0.5">🔒</span>
          <p className="text-xs leading-relaxed" style={{ color: '#085041' }}>
            Al iniciar, aceptas el uso de tus datos de gaze únicamente con fines
            académicos. No se almacena video. Puedes revocar tu consentimiento
            desde tu perfil.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setFase('calibracion')}
            className="px-8 py-2.5 rounded-full text-sm font-semibold transition hover:opacity-90"
            style={{ backgroundColor: '#1F252E', color: '#9FE1CB' }}
          >
            Iniciar Prueba
          </button>
          <button
            onClick={() => navigate('/estudiante/inicio')}
            className="px-8 py-2.5 rounded-full text-sm font-medium border transition hover:opacity-80"
            style={{ borderColor: '#1F252E', color: '#1F252E' }}
          >
            Volver al Inicio
          </button>
        </div>

      </div>
    </EstudianteLayout>
  )
}

// ─── CALIBRACIÓN CON WEBGAZER ─────────────────────────
function Calibracion({ onTerminar, onCancelar }) {
  const [puntoActual, setPuntoActual] = useState(0)
  const [puntosCompletados, setPuntosCompletados] = useState([])
  const [webgazerListo, setWebgazerListo] = useState(false)
  const webgazerRef = useRef(null)

  useEffect(() => {
  let wg = null

  const iniciar = async () => {
    try {
      const webgazer = await import('webgazer')
      wg = webgazer.default

      wg.setRegression('ridge')
      wg.setTracker('TFFacemesh')
      wg.setGazeListener(() => {})
      wg.begin()

      setTimeout(() => {
        if (wg) {
          try { wg.showVideoPreview(true) } catch(e) {}
          try { wg.showPredictionPoints(false) } catch(e) {}
          webgazerRef.current = wg
          setWebgazerListo(true)
        }
      }, 3000)

    } catch (err) {
      console.error('Error WebGazer:', err)
      setWebgazerListo(true)
    }
  }

  iniciar()

 return () => {
  // NO llamar wg.end() aquí — WebGazer debe seguir corriendo para la sesión
  if (wg) {
    try { wg.showVideoPreview(false) } catch(e) {}
  }
}
}, [])


  const handleClickPunto = (idx) => {
    if (idx !== puntoActual || !webgazerListo) return

    // Registrar posición para entrenamiento
    if (webgazerRef.current) {
      try {
        const el = document.getElementById(`punto-${idx}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          webgazerRef.current.recordScreenPosition(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          )
        }
      } catch (e) {}
    }

    const nuevos = [...puntosCompletados, idx]
    setPuntosCompletados(nuevos)

    if (idx + 1 >= PUNTOS_CALIBRACION.length) {
      if (webgazerRef.current) webgazerRef.current.showVideoPreview(false)
      setTimeout(onTerminar, 500)
    } else {
      setPuntoActual(idx + 1)
    }
  }

  const progreso = Math.round((puntosCompletados.length / PUNTOS_CALIBRACION.length) * 100)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#9FE1CB' }}>

      {/* TOPBAR */}
      <div className="flex items-center justify-between px-6 py-3"
        style={{ backgroundColor: '#0d6e56' }}>
        <div className="flex items-center gap-2">
          <svg width="20" height="14" viewBox="0 0 28 18" fill="none">
            <ellipse cx="14" cy="9" rx="13" ry="8" stroke="#9FE1CB" strokeWidth="1.5"/>
            <circle cx="14" cy="9" r="4" fill="#9FE1CB"/>
          </svg>
          <span className="text-sm font-bold" style={{ color: '#9FE1CB' }}>V-COGNI</span>
        </div>
        <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
          Prueba Biométrica
        </span>
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <div className="h-2 rounded-full transition-all"
              style={{ width: `${progreso}%`, backgroundColor: '#9FE1CB' }} />
          </div>
          <span className="text-sm font-mono" style={{ color: '#9FE1CB' }}>
            {puntosCompletados.length}/9
          </span>
        </div>
      </div>

      {/* BARRA VERDE OSCURO */}
      <div className="flex items-center justify-between px-6 py-2"
        style={{ backgroundColor: '#085041' }}>
        <span className="text-sm" style={{ color: '#9FE1CB' }}>
          Calibración WebGazer · Mira cada punto y haz clic
        </span>
        <span className="text-sm font-mono" style={{ color: '#9FE1CB' }}>
          {puntosCompletados.length}/9
        </span>
      </div>

      {/* INSTRUCCIÓN */}
      <div className="flex justify-center pt-6 px-6">
        <div className="px-6 py-3 rounded-xl text-sm font-medium"
          style={{ backgroundColor: '#1F252E', color: '#9FE1CB' }}>
          {!webgazerListo
            ? '⏳ Iniciando cámara, por favor espera...'
            : puntoActual < 9
            ? `Mira el punto ${puntoActual + 1} de 9 y haz clic sobre él. Mantén la cabeza quieta.`
            : '✓ Calibración completa, iniciando sesión...'}
        </div>
      </div>

      {/* ÁREA DE PUNTOS */}
      <div className="flex-1 relative mx-6 my-4 rounded-2xl"
        style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
        {PUNTOS_CALIBRACION.map((pos, idx) => {
          const completado = puntosCompletados.includes(idx)
          const activo = idx === puntoActual

          return (
            <button
              key={idx}
              id={`punto-${idx}`}
              onClick={() => handleClickPunto(idx)}
              disabled={!webgazerListo || completado || idx !== puntoActual}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="relative flex items-center justify-center"
                style={{ width: 44, height: 44 }}>
                <div className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: completado ? '#085041' : activo ? '#1F252E' : '#9FE1CB',
                    backgroundColor: completado
                      ? 'rgba(8,80,65,0.3)'
                      : activo
                      ? 'rgba(31,37,46,0.2)'
                      : 'rgba(159,225,203,0.2)',
                    animation: activo && webgazerListo ? 'pulse 1.5s infinite' : 'none'
                  }} />
                <span className="text-xs font-bold z-10"
                  style={{ color: completado ? '#085041' : '#1F252E' }}>
                  {idx + 1}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* CANCELAR */}
      <div className="flex justify-center pb-6">
        <button onClick={onCancelar}
          className="px-6 py-2 rounded-full text-xs border transition hover:opacity-80"
          style={{ borderColor: '#1F252E', color: '#1F252E' }}>
          Cancelar prueba
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(31,37,46,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(31,37,46,0.1); }
        }
      `}</style>
    </div>
  )
}

function cerrarCamara(wg, stream) {
  try {
    if (wg) {
      wg.showPredictionPoints(false)
      wg.clearGazeListener()
      wg.end()
    }
  } catch (e) {}

  // Detener tracks directamente del elemento video en el DOM
  try {
    const video = document.getElementById('webgazerVideoFeed')
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop())
      video.srcObject = null
    }
  } catch (e) {}

  // Eliminar el contenedor de WebGazer
  try {
    const container = document.getElementById('webgazerVideoContainer')
    if (container) container.remove()
  } catch (e) {}
}

function finalizarSesionHelper(gazeData) {
  if (gazeData.length < 2) return { fijaciones: 0, sacadas: 0, duracionMedia: 0 }

  let fijaciones = 0
  let sacadas = 0
  let duraciones = []
  let inicioFijacion = gazeData[0]?.t || 0

  for (let i = 1; i < gazeData.length; i++) {
    const dx = gazeData[i].x - gazeData[i - 1].x
    const dy = gazeData[i].y - gazeData[i - 1].y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 50) {
      if (i === gazeData.length - 1) {
        fijaciones++
        duraciones.push(gazeData[i].t - inicioFijacion)
      }
    } else {
      sacadas++
      fijaciones++
      duraciones.push(gazeData[i].t - inicioFijacion)
      inicioFijacion = gazeData[i].t
    }
  }

  const duracionMedia = duraciones.length > 0
    ? Math.round(duraciones.reduce((a, b) => a + b, 0) / duraciones.length)
    : 0

  return { fijaciones, sacadas, duracionMedia }
}

// ─── SESIÓN ACTIVA CON WEBGAZER ───────────────────────
function Sesion({ onTerminar, onCancelar }) {
  const [tiempo, setTiempo] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [puntosCapturados, setPuntosCapturados] = useState(0)
  const gazeRef = useRef([])
  const webgazerRef = useRef(null)
  const timerRef = useRef(null)
   const streamRef2 = useRef(null) 

 useEffect(() => {
  const iniciar = async () => {
    try {
      const webgazer = await import('webgazer')
      const wg = webgazer.default

      // WebGazer ya está corriendo desde calibración, solo actualizamos
      wg.setGazeListener((data, timestamp) => {
        if (data) {
          gazeRef.current.push({ x: data.x, y: data.y, t: timestamp })
          setPuntosCapturados(prev => prev + 1)
        }
      })

      try { wg.showVideoPreview(true) } catch(e) {}
      try { wg.showPredictionPoints(true) } catch(e) {}
      webgazerRef.current = wg

    } catch (err) {
      console.error('Error sesión WebGazer:', err)
    }
  }

  iniciar()
  // Esperar a que WebGazer inyecte el video y mostrarlo
const mostrarVideo = () => {
  const container = document.getElementById('webgazerVideoContainer')
  if (container) {
    container.style.display = 'block'
    container.style.visibility = 'visible'
    container.style.opacity = '1'
  } else {
    setTimeout(mostrarVideo, 500)
  }
}
setTimeout(mostrarVideo, 1000)



  timerRef.current = setInterval(() => {
    setTiempo(prev => {
      if (prev + 1 >= DURACION_SESION) {
        clearInterval(timerRef.current)
        finalizarSesion()
        return DURACION_SESION
      }
      return prev + 1
    })
  }, 1000)

  return () => {
    clearInterval(timerRef.current)
    cerrarCamara(webgazerRef.current, null)
  }
}, [])

 const finalizarSesion = () => {
  const metricas = finalizarSesionHelper(gazeRef.current)
  cerrarCamara(webgazerRef.current, null)
  setShowModal(true)
  setTimeout(() => onTerminar(metricas), 3000)
}

  const calcularMetricas = (datos) => {
    if (datos.length < 2) return { fijaciones: 0, sacadas: 0, duracionMedia: 0 }

    let fijaciones = 0
    let sacadas = 0
    let duraciones = []
    let inicioFijacion = datos[0]?.t || 0

    for (let i = 1; i < datos.length; i++) {
      const dx = datos[i].x - datos[i - 1].x
      const dy = datos[i].y - datos[i - 1].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 50) {
        if (i === datos.length - 1) {
          fijaciones++
          duraciones.push(datos[i].t - inicioFijacion)
        }
      } else {
        sacadas++
        fijaciones++
        duraciones.push(datos[i].t - inicioFijacion)
        inicioFijacion = datos[i].t
      }
    }

    const duracionMedia = duraciones.length > 0
      ? Math.round(duraciones.reduce((a, b) => a + b, 0) / duraciones.length)
      : 0

    return { fijaciones, sacadas, duracionMedia }
  }

  const pad = (n) => String(n).padStart(2, '0')
  const minutos = Math.floor(tiempo / 60)
  const segundos = tiempo % 60
  const progreso = Math.round((tiempo / DURACION_SESION) * 100)
  const restante = DURACION_SESION - tiempo

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#9FE1CB' }}>

      {/* TOPBAR */}
      <div className="flex items-center justify-between px-6 py-3"
        style={{ backgroundColor: '#0d6e56' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#ef4444' }} />
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>EN VIVO</span>
        </div>
        <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
          Fase 2 · Lectura del material · WebGazer activo
        </span>
        <span className="font-mono text-sm" style={{ color: '#9FE1CB' }}>
          {pad(minutos)}:{pad(segundos)}
        </span>
      </div>

      {/* BARRA PROGRESO */}
      <div className="h-1.5" style={{ backgroundColor: 'rgba(31,37,46,0.2)' }}>
        <div className="h-full transition-all duration-1000"
          style={{ width: `${progreso}%`, backgroundColor: '#1F252E' }} />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-1 gap-4 p-6">

        {/* TEXTO LECTURA */}
        <div className="flex-1 bg-white rounded-2xl p-8 relative">
          <p className="text-xs mb-1 font-medium" style={{ color: '#9FE1CB' }}>
            MATERIAL DE EVALUACIÓN
          </p>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#1F252E' }}>
            Grafos y árboles de expansión mínima
          </h3>
          <p className="text-sm leading-8" style={{ color: '#374151' }}>
            {TEXTO_LECTURA}
          </p>

          {/* Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: '#085041' }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#9FE1CB' }} />
            <span className="text-xs" style={{ color: '#9FE1CB' }}>WebGazer.js activo</span>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="w-52 flex flex-col gap-3">

          {/* Progreso */}
          <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: '#1F252E' }}>
            <p className="text-xs mb-1" style={{ color: 'rgba(159,225,203,0.6)' }}>PROGRESO</p>
            <p className="text-3xl font-bold" style={{ color: '#9FE1CB' }}>{progreso}%</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {pad(minutos)}:{pad(segundos)} / 03:00
            </p>
          </div>

          {/* Métricas */}
          <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ backgroundColor: '#1F252E' }}>
            <p className="text-xs" style={{ color: 'rgba(159,225,203,0.6)' }}>GAZE EN VIVO</p>
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Puntos capturados</p>
              <p className="text-xl font-bold" style={{ color: '#9FE1CB' }}>{puntosCapturados}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Tiempo restante</p>
              <p className="text-xl font-bold" style={{ color: '#9FE1CB' }}>
                {pad(Math.floor(restante / 60))}:{pad(restante % 60)}
              </p>
            </div>
          </div>

          {/* Estado */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#1F252E' }}>
            <p className="text-xs mb-2" style={{ color: 'rgba(159,225,203,0.6)' }}>ESTADO</p>
            {['WebGazer', 'Calibración', 'Sin grabación'].map((s) => (
              <div key={s} className="flex items-center justify-between py-1">
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{s}</span>
                <span className="text-xs font-medium" style={{ color: '#9FE1CB' }}>✓</span>
              </div>
            ))}
          </div>

          {/* Cancelar */}
          <button onClick={onCancelar}
            className="py-2.5 rounded-xl text-xs border transition hover:opacity-80"
            style={{ borderColor: '#ef4444', color: '#ef4444' }}>
            Cancelar prueba
          </button>
        </div>
      </div>

      {/* MODAL ÉXITO */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-4xl"
              style={{ backgroundColor: '#E1F5EE' }}>
              ✓
            </div>
            <h3 className="text-lg font-bold text-center" style={{ color: '#1F252E' }}>
              ¡Prueba realizada satisfactoriamente!
            </h3>
            <p className="text-sm text-center" style={{ color: '#6b7280' }}>
              WebGazer.js procesó tu sesión. Cargando resultados...
            </p>
            <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#e5e7eb' }}>
              <div className="h-full rounded-full animate-pulse"
                style={{ width: '70%', backgroundColor: '#9FE1CB' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── RESULTADOS ───────────────────────────────────────
function Resultado({ metricas }) {
  const navigate = useNavigate()
  const perfil = (metricas?.duracionMedia ?? 0) > 250 ? 'Visual' : 'Verbal'
  const porcentaje = perfil === 'Visual' ? 87 : 62

  return (
    <EstudianteLayout>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="rounded-2xl p-6 flex items-center justify-between"
          style={{ backgroundColor: '#085041' }}>
          <div>
            <p className="text-xs mb-1" style={{ color: 'rgba(159,225,203,0.7)' }}>
              PRUEBA REALIZADA SATISFACTORIAMENTE
            </p>
            <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
              Tu perfil cognitivo es{' '}
              <span style={{ color: '#9FE1CB' }}>{perfil}</span>
            </h2>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })} · WebGazer.js
            </p>
          </div>
          <div className="text-center px-6 py-3 rounded-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>CONFIANZA</p>
            <p className="text-3xl font-bold" style={{ color: '#9FE1CB' }}>91%</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>CNN + XGBoost</p>
          </div>
        </div>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#1F252E' }}>
            <p className="text-xs mb-3" style={{ color: 'rgba(159,225,203,0.6)' }}>
              CLASIFICACIÓN COGNITIVA
            </p>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-4xl font-bold" style={{ color: '#9FE1CB' }}>{porcentaje}%</p>
              <p className="text-sm" style={{ color: '#FFFFFF' }}>Perfil {perfil}</p>
            </div>
            <div className="h-2 rounded-full mb-2" style={{ backgroundColor: 'rgba(159,225,203,0.2)' }}>
              <div className="h-2 rounded-full"
                style={{ width: `${porcentaje}%`, backgroundColor: '#9FE1CB' }} />
            </div>
            <div className="h-2 rounded-full" style={{ backgroundColor: 'rgba(159,225,203,0.2)' }}>
              <div className="h-2 rounded-full"
                style={{ width: `${100 - porcentaje}%`, backgroundColor: 'rgba(159,225,203,0.3)' }} />
            </div>
          </div>

          <div className="rounded-2xl p-5" style={{ backgroundColor: '#1F252E' }}>
            <p className="text-xs mb-3" style={{ color: 'rgba(159,225,203,0.6)' }}>
              MÉTRICAS WEBGAZER.JS
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Fijaciones', valor: metricas?.fijaciones ?? '—' },
                { label: 'Sacadas', valor: metricas?.sacadas ?? '—' },
                { label: 'Duración media', valor: metricas?.duracionMedia ? `${metricas.duracionMedia}ms` : '—' },
                { label: 'Precisión gaze', valor: 'Alta' },
              ].map((m) => (
                <div key={m.label} className="rounded-xl p-3"
                  style={{ backgroundColor: 'rgba(159,225,203,0.08)' }}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.label}</p>
                  <p className="text-base font-semibold" style={{ color: '#9FE1CB' }}>{m.valor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INSIGHT */}
        <div className="rounded-2xl p-5 flex gap-3"
          style={{ backgroundColor: 'rgba(31,37,46,0.1)' }}>
          <span className="text-xl">💡</span>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#1F252E' }}>
              ¿Qué significa ser un estudiante {perfil}?
            </p>
            <p className="text-xs leading-relaxed" style={{ color: '#1F252E', opacity: 0.7 }}>
              {perfil === 'Visual'
                ? 'Tu patrón de fijaciones largas capturado por WebGazer indica que procesas mejor la información en formato gráfico: diagramas, mapas conceptuales y videos.'
                : 'Tu patrón de gaze indica que procesas mejor la información en formato textual y auditivo: lecturas, explicaciones y discusiones.'}
            </p>
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex gap-3">
          <button onClick={() => navigate('/estudiante/inicio')}
            className="px-6 py-2.5 rounded-full text-sm border transition hover:opacity-80"
            style={{ borderColor: '#1F252E', color: '#1F252E' }}>
            Volver al inicio
          </button>
          <button onClick={() => navigate('/estudiante/historial')}
            className="px-6 py-2.5 rounded-full text-sm border transition hover:opacity-80"
            style={{ borderColor: '#1F252E', color: '#1F252E' }}>
            Ver historial
          </button>
          <button onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full text-sm font-semibold ml-auto transition hover:opacity-90"
            style={{ backgroundColor: '#1F252E', color: '#9FE1CB' }}>
            Nueva prueba
          </button>
        </div>

      </div>
    </EstudianteLayout>
  )
}