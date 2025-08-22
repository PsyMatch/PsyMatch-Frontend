"use client"
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  email: string;
}

interface Errors {
  email?: string;
}

const validate = (input: FormData) => {
    const errors: Errors = { email: "" };
    if(!input.email) errors.email = "Email es requerido"
    return errors
}

const SendMail = () => {
    const router = useRouter();
    
    const [formData, setFormData] = useState<FormData>({email: ''});

    const [errors, setErrors] = useState<Errors>({});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newFormData = { email: value };
        setFormData(newFormData);
        setErrors(validate(newFormData))
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors = validate(formData);
        setErrors(newErrors);
        if (newErrors.email) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email
            })
        });
        const response = await res.json();
        console.log("Respuesta", response)

        
        toast.success(`${response.message}`, {
            position: "top-center",
            type: 'success',
            isLoading: false,
            autoClose: 2500,
            closeOnClick: true,
            draggable: true,
        });
        setTimeout(() => {
            router.push("/")
        },3200)
    }

    return (
        <div className="flex flex-col items-center min-h-screen gap-4 pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
            <form className="flex flex-col items-center h-56 w-[30%]" onSubmit={onSubmit}>
                <h1 className="text-[26px] font-bold mb-5">¿Olvidaste tu contraseña?</h1>
                <div className="flex flex-col w-full mb-6">
                    <label htmlFor="email">Ingresa tu email registrado</label>
                    <Input 
                        onChange={onChange}
                        name="email" 
                        value={formData.email} 
                        type="text" 
                        id="email" 
                        className="h-8 mb-1" 
                        placeholder="correo electrónico"
                    />
                   {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </div>
            <span className="text-xs text-center">Te enviaremos un correo con las instrucciones para restablecer tu contraseña</span>
            <Button type="submit" className="mt-2 text-black w-fit bg-violet-300">Enviar enlace de recuperación</Button>
        </form>
    </div>
    );
};

export default SendMail;