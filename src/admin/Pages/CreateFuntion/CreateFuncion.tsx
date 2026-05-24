import { useState } from 'react';
import FormReactive, { type FormConfig, type FormField } from '../../../components/FormReactive';
import {  FuncionServices} from '../../services/Funcion';
function CreateFuncion() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fields: FormField[] = [
    {
      name: 'Name',
      type: 'text', 
      label: 'Nombre de la función',
      placeholder: 'Nombre de la función',
      required: true,
      validation: (value: string) => {
        return value.trim() !== '' ? null : 'El nombre es requerido';
      }
    },
    {
      name: 'Description',
      type: 'text',
      label: 'Descripción',
      placeholder: 'Descripción de la función',
      required: true,
      validation: (value) => {
        return value.length >= 6 ? null : 'La descripción debe tener al menos 6 caracteres';
      }
    },
    {
        name: 'DateFunction',
        type: 'date',
        label: 'Fecha de la función',
        required: true,
        validation: (value) => {
            return value ? null : 'La fecha es requerida';
        }
    },
    {
        name: 'TimeFunction',
        type: 'text',
        label: 'Hora de la función',
        placeholder: 'HH:mm',
        required: true,
        validation: (value) => {
            const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
            return timeRegex.test(value) ? null : 'La hora debe estar en formato HH:mm';
        }
    },
    {
        name: 'Image',
        type: 'file',
        label: 'Imagen',
        placeholder: 'Selecciona una imagen',
        required: false,
        validation: (value) => {
            if (!value) return null; 
            const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            return allowedExtensions.test(value) ? null : 'Solo se permiten archivos de imagen (jpg, jpeg, png)';
        }
    }
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await FuncionServices.Create({
        Name: formData.Name,
        Description: formData.Description,
        DateFunction: formData.DateFunction,
        TimeFunction: formData.TimeFunction,
        Image: (formData.Image as unknown) as File
      });

      if (response.success ) {
        
        console.log('Creación exitosa');
         
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
    subtitle: 'Crear Función',
    fields,
    submitText: 'Crear Función',
    onSubmit: handleSubmit,
    errorMessage,
    isLoading
  };

  return <FormReactive {...formConfig} />;
}

export default CreateFuncion;
