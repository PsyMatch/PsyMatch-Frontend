'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UpdateUserData } from '@/services/users';
import { useNotifications } from '@/hooks/useNotifications';
import { MapPinIcon } from 'lucide-react';
import { envs } from '@/config/envs.config';

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

interface MapboxSuggestion {
    id: string;
    place_name: string;
    center: [number, number]; // [lng, lat]
    place_type: string[];
    relevance: number;
    context?: Array<{
        id: string;
        text: string;
        short_code?: string;
    }>;
    properties?: {
        address?: string;
    };
}

export const MissingDataModal: React.FC<MissingDataModalProps> = ({ open, onSave, onClose }) => {
    const notifications = useNotifications();
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

    // Estados para autocompletado de direcciones
    const [addressSuggestions, setAddressSuggestions] = useState<MapboxSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [_selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

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
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const searchAddresses = async (query: string) => {
        if (query.length < 3) {
            setAddressSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const MAPBOX_TOKEN = envs.next_public_mapbox_token;
        if (!MAPBOX_TOKEN) {
            console.error('Mapbox access token no configurado');
            return;
        }

        setIsLoadingSuggestions(true);
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
                    `access_token=${MAPBOX_TOKEN}&` +
                    `country=AR&` +
                    `language=es&` +
                    `limit=8&` +
                    `types=address,poi,place&`
            );

            if (response.ok) {
                const data = await response.json();
                setAddressSuggestions(data.features || []);
                setShowSuggestions(true);
            } else {
                setAddressSuggestions([]);
            }
        } catch (_error) {
            setAddressSuggestions([]);
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    const selectAddress = (suggestion: MapboxSuggestion) => {
        handleInputChange('address', suggestion.place_name);
        setShowSuggestions(false);
        setAddressSuggestions([]);

        setSelectedCoordinates({
            lat: suggestion.center[1],
            lng: suggestion.center[0],
        });
        setSelectedPlaceId(suggestion.id);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !addressInputRef.current?.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            notifications.error('Por favor, corrige los errores en el formulario');
            return;
        }

        setLoading(true);
        try {
            await onSave(formData);

            // Mostrar mensaje de éxito
            notifications.success('Datos guardados exitosamente');

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
            notifications.error('Error al guardar los datos. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Completa tu perfil</DialogTitle>
                    <DialogDescription className="text-gray-600">
                        ¡Bienvenido! Como te registraste con Google, necesitamos algunos datos adicionales para completar tu perfil y brindarte la
                        mejor experiencia.
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
                            className={errors.alias ? 'border-red-500 placeholder:text-gray-400' : 'placeholder:text-gray-400'}
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
                            className={errors.phone ? 'border-red-500 placeholder:text-gray-400' : 'placeholder:text-gray-400'}
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
                    <div className="space-y-2 relative">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                            Dirección *
                        </Label>
                        <div ref={addressInputRef}>
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Av. Corrientes 123, Buenos Aires, Argentina"
                                value={formData.address || ''}
                                onChange={(e) => {
                                    handleInputChange('address', e.target.value);
                                    setSelectedCoordinates(null);
                                    setSelectedPlaceId(null);
                                    setTimeout(() => {
                                        if (e.target.value && !selectedPlaceId) {
                                            searchAddresses(e.target.value);
                                        }
                                    }, 300);
                                }}
                                className={errors.address ? 'border-red-500 placeholder:text-gray-400' : 'placeholder:text-gray-400'}
                                autoComplete="off"
                            />
                        </div>

                        {showSuggestions && (
                            <div
                                ref={suggestionsRef}
                                className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1"
                            >
                                {isLoadingSuggestions ? (
                                    <div className="p-3 text-sm font-medium flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        Buscando direcciones en Argentina...
                                    </div>
                                ) : addressSuggestions.length > 0 ? (
                                    addressSuggestions.map((suggestion) => (
                                        <button
                                            key={suggestion.id}
                                            type="button"
                                            className="w-full text-left p-3 hover:bg-gray-50 text-sm border-b border-gray-200 last:border-b-0 transition-colors"
                                            onClick={() => selectAddress(suggestion)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <MapPinIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm flex items-center gap-2">{suggestion.place_name}</div>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-3 text-sm text-gray-600 text-center">
                                        No se encontraron direcciones en Argentina. Intente con una búsqueda más específica.
                                    </div>
                                )}
                            </div>
                        )}
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
                            className={errors.emergency_contact ? 'border-red-500 placeholder:text-gray-400' : 'placeholder:text-gray-400'}
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
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            {loading ? 'Guardando...' : 'Guardar y continuar'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
