import { useState } from 'react';
import './FormReactive.css';

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'textarea'; //Agrega cualquier otro tipo que necesites;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | null;
}

export interface FormConfig {
  title: string;
  subtitle?: string;
  fields: FormField[];
  submitText?: string;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  errorMessage?: string | null;
  isLoading?: boolean;
}

export default function FormReactive({
    title,
    subtitle,
    fields,
    submitText = 'Enviar',
    onSubmit,
    errorMessage = null,
    isLoading = false
}: FormConfig) {

    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Limpiar error del campo cuando el usuario empieza a escribir
        if (fieldErrors[name]) {
        setFieldErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        fields.forEach(field => {
            const value = formData[field.name];

            // Validación requerida
            if (field.required && !value.trim()) {
                errors[field.name] = `${field.label} es requerido`;
                return;
            }

            // Validación por tipo
            if (value) {
                if (field.type === 'email') {
                    const emailRegex = /^ [^\s@]+ @ [^\s@] + \. [^\s@]+ $/;
                    if (!emailRegex.test(value)) {
                        errors[field.name] = 'Email inválido';
                    }
                }

                if (field.type === 'tel') {
                    const telRegex = /^ \d{8} | \d{11} $/;
                    if (!telRegex.test(value.replace(/\D/g, ''))) {
                        errors[field.name] = 'Teléfono inválido';
                    }
                }

                if (field.type === 'url') {
                    try {
                        new URL(value);
                    } catch {
                        errors[field.name] = 'URL inválida';
                    }
                }
            }

            // Validación personalizada
            if (field.validation && value) {
                const customError = field.validation(value);
                if (customError) {
                    errors[field.name] = customError;
                }
            }
        });

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            await onSubmit(formData);
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-reactive-container">
        <div className="form-reactive-box">
            <h1 className="form-reactive-title">{title}</h1>
                {subtitle && <h2 className="form-reactive-subtitle">{subtitle}</h2>}

            {(errorMessage || isLoading) && (
                <div className={`form-reactive-alert ${errorMessage ? 'error' : 'info'}`}>
                    {errorMessage || 'Procesando...'}
                </div>
            )}

            <form onSubmit={handleSubmit} className="form-reactive">
            {fields.map(field => (
                <div key={field.name} className="form-reactive-group">
                <label htmlFor={field.name} className="form-reactive-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                </label>

                {field.type === 'textarea' ? (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`form-reactive-input textarea ${
                            fieldErrors[field.name] ? 'error' : ''
                        }`}
                        disabled={loading || isLoading}
                        rows={4}
                    />
                ) : (
                    <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`form-reactive-input ${
                            fieldErrors[field.name] ? 'error' : ''
                        }`}
                        disabled={loading || isLoading}
                        required={field.required}
                    />
                )}

                {fieldErrors[field.name] && (
                    <span className="form-reactive-error">{fieldErrors[field.name]}</span>
                )}
                </div>
            ))}

            <button
                type="submit"
                className="form-reactive-submit"
                disabled={loading || isLoading}
            >
                {loading || isLoading ? 'Procesando...' : submitText}
            </button>
            </form>
        </div>
        </div>
    );
}