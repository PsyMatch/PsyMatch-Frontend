import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Label } from '@/components/ui/label';
import { useField } from 'formik';

interface CustomPhoneInputProfessionalProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  validate?: (value: string) => string | undefined | Promise<string | undefined>;
}

export default function CustomPhoneProfessionalInput({
  label,
  id,
  name,
  placeholder,
  className,
  disabled = false,
  validate,   // 👈 agregalo
}: CustomPhoneInputProfessionalProps) {
  const [field, meta, helpers] = useField({ name, validate });

  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <PhoneInput
        country="ar"
        value={field.value}
        onChange={(phone) => helpers.setValue(phone)} 
        onBlur={() => helpers.setTouched(true)}  
        disabled={disabled}
        placeholder={placeholder}
        inputProps={{
          id,
          name,
        }}
        inputStyle={{
          width: '100%',
          height: '40px',
          paddingLeft: '45px',
          padding: '8px 12px',
          border: `1px solid ${meta.touched && meta.error ? '#ef4444' : '#d1d5db'}`,
          borderRadius: '6px',
          fontSize: '14px',
          outline: 'none',
        }}
        buttonStyle={{
          borderTop: `1px solid ${meta.touched && meta.error ? '#ef4444' : '#d1d5db'}`,
          borderLeft: `1px solid ${meta.touched && meta.error ? '#ef4444' : '#d1d5db'}`,
          borderBottom: `1px solid ${meta.touched && meta.error ? '#ef4444' : '#d1d5db'}`,
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
      {/* {meta.touched && meta.error && (
        <div className="text-xs text-red-500">{meta.error}</div>
      )} */}
    </div>
  );
}
