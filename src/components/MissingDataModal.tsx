"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UpdateUserData } from '@/services/users';
import { toast } from 'react-toastify';

interface MissingDataModalProps {
  open: boolean;
  onSave: (data: UpdateUserData) => Promise<void>;
  onClose?: () => void; // Callback opcional para cerrar el modal
}

const healthInsuranceOptions = [
    { value: 'none', label: 'Seleccionar obra social' },
    { value: 'OSDE', label: 'OSDE' },
    { value: 'Swiss Medical', label: 'Swiss Medical' },
    { value: 'IOMA', label: 'IOMA' },
    { value: 'PAMI', label: 'PAMI' },
    { value: 'Unión Personal', label: 'Unión Personal' },
    { value: 'OSDEPYM', label: 'OSDEPYM' },
    { value: 'Luis Pasteur', label: 'Luis Pasteur' },
    { value: 'Jerárquicos Salud', label: 'Jerárquicos Salud' },
    { value: 'Sancor Salud', label: 'Sancor Salud' },
    { value: 'OSECAC', label: 'OSECAC' },
    { value: 'OSMECON Salud', label: 'OSMECON Salud' },
    { value: 'Apross', label: 'Apross' },
    { value: 'OSPRERA', label: 'OSPRERA' },
    { value: 'OSPAT', label: 'OSPAT' },
    { value: 'ASE Nacional', label: 'ASE Nacional' },
    { value: 'OSPIP', label: 'OSPIP' },
];

export const MissingDataModal: React.FC<MissingDataModalProps> = ({ open, onSave, onClose }) => {
  const [formData, setFormData] = useState<UpdateUserData>({
    alias: '',
    phone: '',
    birthdate: '',
    address: '',
    emergency_contact: '',
    health_insurance: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.alias?.trim()) {
      newErrors.alias = 'El alias es obligatorio';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\+?[1-9]\d{8,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Formato de teléfono inválido (ej: +5411123456789)';
    }

    if (!formData.birthdate?.trim()) {
      newErrors.birthdate = 'La fecha de nacimiento es obligatoria';
    } else {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 100) {
        newErrors.birthdate = 'Debe ser mayor de 18 años y menor de 100';
      }
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'La dirección es obligatoria';
    } else if (formData.address.length < 3) {
      newErrors.address = 'La dirección debe tener al menos 3 caracteres';
    }

    if (formData.emergency_contact?.trim() && formData.emergency_contact.length < 10) {
      newErrors.emergency_contact = 'Debe incluir nombre, teléfono y relación (ej: María Pérez - +5411987654321 - Madre)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UpdateUserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      
      // Mostrar mensaje de éxito
      toast.success('Datos guardados exitosamente');
      
      // Limpiar formulario
      setFormData({
        alias: '',
        phone: '',
        birthdate: '',
        address: '',
        emergency_contact: '',
        health_insurance: '',
      });
      
      // Cerrar modal si se proporciona la función
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 1000); // Dar tiempo para ver el mensaje de éxito
      }
      
    } catch (error) {
      console.error('Error al guardar datos:', error);
      toast.error('Error al guardar los datos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Completa tu perfil
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Para continuar, necesitamos que completes algunos datos adicionales de tu perfil.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Alias */}
          <div className="space-y-2">
            <Label htmlFor="alias" className="text-sm font-medium text-gray-700">
              Alias *
            </Label>
            <Input
              id="alias"
              type="text"
              placeholder="Ej: Juan123"
              value={formData.alias || ''}
              onChange={(e) => handleInputChange('alias', e.target.value)}
              className={errors.alias ? 'border-red-500' : ''}
            />
            {errors.alias && <p className="text-sm text-red-500">{errors.alias}</p>}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Teléfono *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ej: +5411123456789"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* Fecha de nacimiento */}
          <div className="space-y-2">
            <Label htmlFor="birthdate" className="text-sm font-medium text-gray-700">
              Fecha de nacimiento *
            </Label>
            <Input
              id="birthdate"
              type="date"
              value={formData.birthdate || ''}
              onChange={(e) => handleInputChange('birthdate', e.target.value)}
              className={errors.birthdate ? 'border-red-500' : ''}
            />
            {errors.birthdate && <p className="text-sm text-red-500">{errors.birthdate}</p>}
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Dirección *
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Ej: Av. Corrientes 1234, Buenos Aires"
              value={formData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          {/* Contacto de emergencia */}
          <div className="space-y-2">
            <Label htmlFor="emergency_contact" className="text-sm font-medium text-gray-700">
              Contacto de emergencia (opcional)
            </Label>
            <Input
              id="emergency_contact"
              type="text"
              placeholder="Ej: María Pérez - +5411987654321 - Madre (opcional)"
              value={formData.emergency_contact || ''}
              onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
              className={errors.emergency_contact ? 'border-red-500' : ''}
            />
            {errors.emergency_contact && <p className="text-sm text-red-500">{errors.emergency_contact}</p>}
          </div>

          {/* Obra social */}
          <div className="space-y-2">
            <Label htmlFor="health_insurance" className="text-sm font-medium text-gray-700">
              Obra social (opcional)
            </Label>
            <Select
              value={formData.health_insurance || 'none'}
              onValueChange={(value) => handleInputChange('health_insurance', value === 'none' ? '' : value)}
            >
              <SelectTrigger className={errors.health_insurance ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecciona tu obra social (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {healthInsuranceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.health_insurance && <p className="text-sm text-red-500">{errors.health_insurance}</p>}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Guardando...' : 'Guardar y continuar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};