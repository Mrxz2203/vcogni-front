# V-COGNI · Frontend

Sistema web de identificación de estilos cognitivos mediante biometría ocular. Este repositorio contiene el frontend desarrollado en **React + Vite + TailwindCSS**.

---

## ¿Qué hace este sistema?

V-COGNI analiza el comportamiento visual del estudiante mientras lee un texto, usando la webcam del dispositivo a través de **WebGazer.js**. Con los datos de gaze (fijaciones y sacadas), el sistema clasifica el perfil cognitivo del estudiante como **Visual** o **Verbal**.

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18+ | Framework de UI |
| Vite | 6+ | Bundler y servidor de desarrollo |
| TailwindCSS | 4+ | Estilos utilitarios |
| React Router DOM | 6+ | Navegación entre páginas |
| Axios | 1+ | Llamadas HTTP al backend |
| WebGazer.js | 2+ | Seguimiento ocular con webcam |

---

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Backend V-COGNI corriendo en `http://localhost:8000`
- Navegador con acceso a cámara (Chrome recomendado)

---

## Instalación

**1. Clona el repositorio o abre la carpeta FrontCogni:**

```bash
cd FrontCogni
```

**2. Instala las dependencias:**

```bash
npm install
```

**3. Instala las dependencias adicionales si no están:**

```bash
npm install react-router-dom axios tailwindcss @tailwindcss/vite webgazer
```

**4. Inicia el servidor de desarrollo:**

```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## Estructura del proyecto

```
FrontCogni/
├── src/
│   ├── assets/                 ← Imágenes del sistema
│   │   ├── analisis.png
│   │   └── cogni.png
│   ├── components/
│   │   ├── Navbar.jsx          ← Barra de navegación pública
│   │   ├── Sidebar.jsx         ← Sidebar del dashboard estudiante
│   │   └── EstudianteLayout.jsx← Layout con sidebar incluido
│   ├── context/
│   │   └── AuthContext.jsx     ← Manejo de sesión y JWT
│   ├── pages/
│   │   ├── public/
│   │   │   ├── LandingPage.jsx ← Página principal
│   │   │   ├── LoginPage.jsx   ← Inicio de sesión
│   │   │   └── RegisterPage.jsx← Registro de usuario
│   │   └── estudiante/
│   │       ├── Dashboard.jsx       ← Inicio del estudiante
│   │       ├── PruebaPage.jsx      ← Prueba biométrica con WebGazer
│   │       ├── ResultadosPage.jsx  ← Resultados del perfil cognitivo
│   │       ├── HistorialPage.jsx   ← Historial de pruebas
│   │       └── PerfilPage.jsx      ← Perfil y configuración
│   ├── routes/
│   │   └── ProtectedRoute.jsx  ← Protección de rutas por rol
│   ├── services/
│   │   └── api.js              ← Llamadas al backend (Axios)
│   ├── App.jsx                 ← Enrutador principal
│   ├── main.jsx                ← Punto de entrada
│   └── index.css               ← Estilos globales + Tailwind
├── index.html
├── vite.config.js
└── package.json
```

---

## Flujo del estudiante

```
Landing → Registro → Login → Dashboard
  └── Prueba Biométrica
        ├── Bienvenida
        ├── Calibración WebGazer (9 puntos)
        ├── Sesión activa (lectura + gaze tracking)
        ├── Modal de éxito
        └── Resultados del perfil
  └── Historial de pruebas
  └── Mi perfil
  └── Cerrar sesión
```

---

## Rutas disponibles

| Ruta | Página | Acceso |
|---|---|---|
| `/` | Landing Page | Público |
| `/login` | Login | Público |
| `/registro` | Registro | Público |
| `/estudiante/inicio` | Dashboard | Estudiante |
| `/estudiante/prueba` | Prueba Biométrica | Estudiante |
| `/estudiante/resultados` | Resultados | Estudiante |
| `/estudiante/historial` | Historial | Estudiante |
| `/estudiante/perfil` | Mi Perfil | Estudiante |

---

## Paleta de colores

| Color | Hex | Uso |
|---|---|---|
| Dark | `#1F252E` | Fondo sidebar, cards, botones primarios |
| Mint | `#9FE1CB` | Color principal, acentos, textos activos |
| White | `#FFFFFF` | Fondos claros, textos sobre oscuro |
| Black | `#000000` | Textos base |

---

## Variables de entorno

No requiere archivo `.env`. La URL del backend se configura directamente en `src/services/api.js`:

```js
const api = axios.create({
  baseURL: 'http://localhost:8000'
})
```

Cambia el `baseURL` si el backend corre en otro puerto o servidor.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run preview` | Previsualiza el build de producción |

---

## Notas importantes

- WebGazer.js requiere **permiso de cámara** en el navegador. Solo funciona en `localhost` o con HTTPS.
- La calibración requiere hacer clic en **9 puntos** en orden antes de iniciar la sesión de lectura.
- Los datos de gaze **no se graban como video** — solo se capturan coordenadas X,Y de la mirada.
- El token JWT se almacena en `localStorage` y expira en 8 horas.

---

## Autor

Desarrollado como parte del paper académico **V-COGNI: Sistema de identificación de estilos cognitivos mediante biometría ocular** · 2026