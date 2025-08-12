import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CustomInputProps {
  label: string
  id: string
  type?: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  value: string | number
  error?: string | false
  placeholder?: string
  className?: string
  disabled?: boolean;
}

export default function CustomInput({
  label,
  id,
  type = "text",
  name,
  onChange,
  onBlur,
  value,
  error,
  placeholder,
  className = "",
  disabled = false
}: CustomInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`w-full ${error ? 'border-red-500' : ''} ${className}`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && (
        <div className="text-red-500 text-xs">
          {error}
        </div>
      )}
    </div>
  )
}