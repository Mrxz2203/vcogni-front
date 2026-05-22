# Proyecto FrontCogni - Guía rápida

## 1. Crear proyecto con Vite + React
npm create vite@latest . -- --template react

# Durante la configuración:
# - Nombre del paquete: frontcogni
# - Framework: React
# - Variante: JavaScript
# - Instalar dependencias: Yes

## 2. Instalar dependencias adicionales
npm install react-router-dom
npm install axios
npm install tailwindcss @tailwindcss/vite

## 3. Ejecutar servidor de desarrollo
npm run dev

# El servidor se levantará en:
# ➜ Local:   http://localhost:5173/
# ➜ Network: use --host to expose

## 4. Errores comunes
- Si aparece "Expected corresponding JSX closing tag":
  Revisa que todos los <div>, <main>, etc. tengan su cierre correcto.
- Si aparece "Unexpected token }":
  Verifica que no haya llaves sobrantes en el JSX.

## 5. Notas
- Usa `npm fund` para ver paquetes que buscan financiamiento.
- Usa `npm audit` para revisar vulnerabilidades.
- Si algún directorio queda bloqueado (EBUSY), reinicia el terminal o cierra procesos que usen esos archivos.
