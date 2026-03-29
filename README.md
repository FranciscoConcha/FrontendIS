# Sistema de Tarjeta Estudiantil DISC - Guía Paso a Paso

**Objetivo:** Crear un proyecto React + TypeScript con autenticación (login) y comunicación con el backend.

---

## 1. Instalación de Dependencias y Entorno

```bash
#Instalar NODE
https://nodejs.org/es/download
#Instalar npm
npm install -g npm
# Crear proyecto React + TypeScript
npm create vite@latest frontend -- --template react-ts
cd frontend

# Instalar todas las dependencias necesarias
npm install axios                          # HTTP client
npm install tailwindcss @tailwindcss/vite  # Estilos CSS
npm install react-router-dom               # Rutas
npm install @types/react-router-dom        # Tipos para React Router
npm install js-cookie                      # Manejo de cookies
npm install --save-dev @types/js-cookie    # Tipos para cookies
```

### ¿Qué hace cada comando?

| Dependencia | Propósito |
|-------------|----------|
| `vite` | Servidor de desarrollo rápido y compilación |
| `axios` | Comunicación HTTP con el backend |
| `tailwindcss` | Framework CSS para estilos rápidos |
| `react-router-dom` | Manejo de rutas (URLs) en la app |
| `js-cookie` | Guardar token en cookie segura |

---

## 2. Estructura de Carpetas

Crea esta estructura en tu carpeta `src/`:

```
src/
├── admin/                    # Rutas protegidas (requieren token)
├── assets/                   # Imágenes, íconos, etc.
│   ├── images/
│   └── icons/
│
├── components/               # Componentes reutilizables
│   └── Header.tsx
│
├── config/                   # Configuración de la API
│   └── config.ts
│
├── interfaces/               # Tipos TypeScript
│   └── Login.types.ts
│
├── pages/                    # Páginas principales
│   ├── Login/
│       ├── Login.tsx
│       └── Login.css
│
├── services/                 # Lógica HTTP
│   ├── api.ts               # Instancia de axios
│   └── authService.ts       # Servicio de autenticación
│
├── App.tsx                   # Componente principal
├── App.css
├── main.tsx                  # ⭐ Punto de entrada
├── index.css
└── vite-env.d.ts
```

---

## 3. Configuración Inicial

### 3.1 Modificar `main.tsx`

En `src/main.tsx`, envuelve `<App />` con `<BrowserRouter>` y a la vez con `<StrictMode>`:

### 3.2 Modificar `App.tsx`

En `src/App.tsx`, prepara las rutas:

```typescript

import {  Route, Routes } from 'react-router-dom';
import './App.css';

function App(): JSX.Element {
  return (
    <Routes>
      {/* Agregar más rutas aquí */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
```

---

## 4. Crear las Interfaces (Tipos TypeScript)

### 4.1 `src/interfaces/User.types.ts`

```typescript
export interface loginData {
    email: string,
    token: string,
    rol: string
}

export interface LoginResponse {
    message: string,
    data: loginData |null
}

```



---

## 5. Configurar el Archivo de Configuración

### `src/config/config.ts`

Centraliza todas las URLs y endpoints:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.BASE_URL || 'http://localhost:3000/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: 'auth/login',
    }
  },
};
```

Crea un archivo `.env` en la raíz del proyecto:

```
BASE_URL=http://localhost:3000/api
```

---

## 6. Crear los Servicios

### 6.1 `src/services/api.ts` - Instancia de Axios

Visualizar el archivo correspondiente.

### 6.2 `src/services/authService.ts` - Servicio de Autenticación

Visualizar el archivo correspondiente.



---

## 7. Crear la Página de Login

### `src/pages/Login/Login.tsx`

Visualizar archivo correspondiente.

### `src/pages/Login/Login.css`

Visualizar archiv correspondiente
---

## 8. Finalización: Actualizar App.tsx

Agrega la ruta del login y protege otras rutas:

ver app.jsx correspondiente

---

## 10. Pruebas

1. Inicia el servidor: `npm run dev`
2. Abre http://localhost:5173
3. Intenta hacer login con credenciales válidas
4. Verifica en DevTools → Cookies que el token se guardó

---

## Notas Importantes

⚠️ **main.tsx DEBE tener `<BrowserRouter>`** - Sin esto, las rutas no funcionan  
⚠️ **App.tsx DEBE tener `return`** - Sin esto, React recibe undefined  
⚠️ **Token en Cookie** - Más seguro que localStorage  
⚠️ **Interceptores automáticos** - El token se agrega solo en cada petición  

---


---

## Comandos Útiles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Ver compilación localmente
npm run type-check   # Verificar tipos TypeScript
```

---

**¡Éxito! Si tienes dudas, revisa los archivos de referencia rápida.**
