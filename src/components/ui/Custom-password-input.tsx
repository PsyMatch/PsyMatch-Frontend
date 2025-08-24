import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface CustomPasswordInputProps {
    label: string;
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    value: string | number;
    error?: string | false;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export default function CustomPasswordInput({
    label,
    id,
    name,
    onChange,
    onBlur,
    value,
    error,
    placeholder,
    className = '',
    disabled = false,
}: CustomPasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    className={`w-full pr-10 ${error ? 'border-red-500' : ''} ${className}`}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center" tabIndex={-1}>
                    {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                </button>
            </div>
            {error && <div className="text-red-500 text-xs">{error}</div>}
        </div>
    );
}
