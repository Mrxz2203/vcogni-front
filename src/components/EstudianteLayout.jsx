import Sidebar from './Sidebar'

export default function EstudianteLayout({ children }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#9FE1CB' }}>
      <Sidebar />
      {/* Contenido desplazado a la derecha del sidebar */}
      <main className="flex-1 ml-48 p-8">
        {children}
      </main>
    </div>
  )
}