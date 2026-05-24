import { useState } from 'react';
import FormReactive, { type FormConfig, type FormField } from '../../components/FormReactive';
import { LoginSerivces } from '../../services/Login';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fields: FormField[] = [
    {
      name: 'email',
      type: 'email', 
      label: 'Email',
      placeholder: 'estudiante@ucn.cl',
      required: true,
      validation: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.cl+$/;
        return emailRegex.test(value) ? null : 'Email inválido';
      }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Contraseña',
      placeholder: 'Tu contraseña',
      required: true,
      validation: (value) => {
        return value.length >= 6 ? null : 'La contraseña debe tener al menos 6 caracteres';
      }
    }
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await LoginSerivces.login(formData.email, formData.password);

      if (response.success && response.data?.token) {
        
        console.log('Login exitoso');
        navigate('/CreateFunt'); 
      } else {
        setErrorMessage(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Error de conexión'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formConfig: FormConfig = {
    title: 'Divine Teatro',
    subtitle: 'Iniciar Sesión',
    fields,
    submitText: 'Ingresar',
    onSubmit: handleSubmit,
    errorMessage,
    isLoading
  };

  return <FormReactive {...formConfig} />;
}

export default Login;
