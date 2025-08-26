'use client';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

interface FormData {
    email: string;
}

interface Errors {
    email?: string;
}

const validate = (input: FormData) => {
    const errors: Errors = { email: '' };
    if (!input.email) errors.email = 'Email es requerido';
    return errors;
};

const SendMail = () => {
    const router = useRouter();
    const notifications = useNotifications();

    const [formData, setFormData] = useState<FormData>({ email: '' });

    const [errors, setErrors] = useState<Errors>({});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newFormData = { email: value };
        setFormData(newFormData);
        setErrors(validate(newFormData));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validate(formData);
        setErrors(newErrors);
        if (newErrors.email) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
            }),
        });
        const response = await res.json();

        const _mail = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/emails/new-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
            }),
        });

        notifications.success(`${response.message}`);
        setTimeout(() => {
            router.push('/');
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center min-h-screen gap-4 pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <form className="flex flex-col items-center h-56 w-[30%]" onSubmit={onSubmit}>
                <h1 className="text-[26px] font-bold mb-5">¿Olvidaste tu contraseña?</h1>
                <div className="flex flex-col w-full mb-6 space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Ingresa tu email registrado
                    </label>
                    <Input
                        onChange={onChange}
                        name="email"
                        value={formData.email}
                        type="text"
                        id="email"
                        className={`w-full placeholder:text-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="tu@email.com"
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </div>
                <span className="text-xs text-center">Te enviaremos un correo con las instrucciones para restablecer tu contraseña</span>
                <div className="flex flex-col pt-2 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <Button type="submit" className="w-full mt-3 text-white bg-blue-600 sm:flex-1 hover:bg-blue-700 disabled:opacity-50">
                        Enviar enlace de recuperación
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SendMail;
