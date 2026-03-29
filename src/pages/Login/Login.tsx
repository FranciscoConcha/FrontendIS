import { useState } from 'react';
import {LoginSerivces} from '../../services/Login';
import './Login.css';
//Función principal donde se ejecutara el código de JS y React
function Login() {
  // Estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  // Manejar envío del formulario
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    try {
      // Llamar al servicio de login
      const data = await LoginSerivces.login(email, password);
      console.log('Login exitoso:', data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error en login:', err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Divine teatro</h1>
        <h2>Iniciar Sesión</h2>

        {error && <div className="error-message">{error}</div>}

        {/* Formulario HTML básico */}
        <form onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="estudiante@ucn.cl"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
            />
          </div>

          {/* Botón Submit */}
          <button 
            type="submit" 
            disabled={cargando}
            className="btn-submit"
          >
            {cargando ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default Login;
