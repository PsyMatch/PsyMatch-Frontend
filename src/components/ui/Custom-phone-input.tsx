import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Label } from '@/components/ui/label';

interface CustomPhoneInputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    className?: string;
    placeholder?: string;
    onChange: (phone: string) => void;
    onBlur: () => void;
    error?: string | false;
    disabled?: boolean;
}

export default function CustomPhoneInput({
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    className,
    placeholder,
    error,
    disabled = false,
}: CustomPhoneInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </Label>
            <PhoneInput
                country={'ar'}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                placeholder={placeholder}
                className={`w-full placeholder:text-gray-400 ${error ? 'border-red-500' : ''} ${className}`}
                inputProps={{
                    id: id,
                    name: name,
                }}
                inputStyle={{
                    width: '100%',
                    height: '40px',
                    paddingLeft: '45px',
                    padding: '8px 12px',
                    border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                }}
                buttonStyle={{
                    borderTop: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
                    borderLeft: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
                    borderBottom: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
                    borderRight: 'none',
                    borderRadius: '6px 0 0 6px',
                    backgroundColor: 'white',
                }}
                dropdownStyle={{
                    width: '600%',
                    maxHeight: '200px',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
                regions={['south-america']}
            />
            {error && <div className="text-red-500 text-xs">{error}</div>}
        </div>
    );
}
