'use client';

import { useState, useRef, useEffect } from 'react';

interface CalendarProps {
    value?: string;
    onChange?: (date: string) => void;
    placeholder?: string;
    minDate?: string; // Fecha mínima permitida (formato dd/mm/yyyy). Por defecto es hoy.
    format?: 'mm-dd-yyyy' | 'dd-mm-yyyy' | 'yyyy-mm-dd' | 'iso-8601';
    className?: string;
    availableDays?: string[]; // Días disponibles del psicólogo (ej: ['Lunes', 'Miércoles', 'Viernes'])
}

export default function Calendario({
    value = '',
    onChange,
    placeholder = 'Elije el día',
    minDate,
    format = 'iso-8601',
    className = 'placeholder:text-gray-400',
    availableDays,
}: CalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const calendarRef = useRef<HTMLDivElement>(null);

    // Configurar fecha mínima - por defecto es hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear horas para comparación correcta

    const minDateObj = minDate ? new Date(minDate.split('/').reverse().join('-')) : today;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        switch (format) {
            case 'dd-mm-yyyy':
                return `${day}-${month}-${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month}-${day}`;
            case 'iso-8601':
                // Para ISO-8601, usar toISOString y tomar solo la parte de la fecha
                return date.toISOString().split('T')[0];
            default:
                return `${month}-${day}-${year}`;
        }
    };

    const parseDate = (dateString: string): Date | null => {
        if (!dateString) return null;

        // Para ISO-8601, usar directamente el constructor Date
        if (format === 'iso-8601') {
            const date = new Date(dateString + 'T00:00:00');
            return isNaN(date.getTime()) ? null : date;
        }

        const parts = dateString.split('-');
        if (parts.length !== 3) return null;

        let day, month, year;
        switch (format) {
            case 'dd-mm-yyyy':
                [day, month, year] = parts;
                break;
            case 'yyyy-mm-dd':
                [year, month, day] = parts;
                break;
            default:
                [month, day, year] = parts;
        }

        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };

    const getDaysInMonth = (date: Date): (Date | null)[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days: (Date | null)[] = [];

        // Días de la semana anterior
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        // Días del mes actual
        for (let day = 1; day <= lastDay.getDate(); day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const handleDateSelect = (date: Date) => {
        if (isDateDisabled(date)) return;

        // Crear una nueva fecha asegurándose de que esté en zona horaria local
        const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const formattedDate = formatDate(localDate);
        setSelectedDate(formattedDate);
        onChange?.(formattedDate);
        setIsOpen(false);
    };

    // Mapeo de días en español a números (0 = Domingo, 1 = Lunes, etc.)
    const dayNameToNumber = (dayName: string): number => {
        const dayMap: { [key: string]: number } = {
            'Domingo': 0,
            'Lunes': 1,
            'Martes': 2,
            'Miércoles': 3,
            'Jueves': 4,
            'Viernes': 5,
            'Sábado': 6,
        };
        return dayMap[dayName] ?? -1;
    };

    const isDateDisabled = (date: Date): boolean => {
        // Verificar fecha mínima
        if (date < minDateObj) return true;

        // Si no hay días disponibles especificados, permitir todos los días
        if (!availableDays || availableDays.length === 0) return false;

        // Verificar si el día de la semana está en los días disponibles
        const dayOfWeek = date.getDay();
        const availableDayNumbers = availableDays.map(dayNameToNumber).filter(day => day !== -1);
        return !availableDayNumbers.includes(dayOfWeek);
    };

    const isToday = (date: Date): boolean => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isSelected = (date: Date): boolean => {
        const selected = parseDate(selectedDate);
        return selected ? date.toDateString() === selected.toDateString() : false;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const days = getDaysInMonth(currentMonth);

    return (
        <div className={`relative max-w-sm ${className}`} ref={calendarRef}>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            <input
                type="text"
                value={selectedDate}
                onClick={() => setIsOpen(true)}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5
                   cursor-pointer placeholder:text-gray-400"
                placeholder={placeholder}
            />

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
                    {/* Header del calendario */}
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => navigateMonth('prev')} className="p-1 hover:bg-gray-100 rounded" type="button">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        <span className="text-sm font-medium">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>

                        <button onClick={() => navigateMonth('next')} className="p-1 hover:bg-gray-100 rounded" type="button">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map((day) => (
                            <div key={day} className="text-xs text-gray-500 text-center p-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Días del mes */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((date, index) => {
                            if (!date) {
                                return <div key={index} className="p-2"></div>;
                            }

                            const disabled = isDateDisabled(date);
                            const today = isToday(date);
                            const selected = isSelected(date);

                            return (
                                <button
                                    key={index}
                                    onClick={() => !disabled && handleDateSelect(date)}
                                    disabled={disabled}
                                    className={`
                    p-2 text-sm rounded hover:bg-gray-100 transition-colors
                    ${disabled ? 'text-gray-300 cursor-not-allowed hover:bg-transparent' : 'text-gray-900 cursor-pointer'}
                    ${today ? 'bg-blue-100 text-blue-600' : ''}
                    ${selected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                    `}
                                    type="button"
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
                        <button
                            onClick={() => {
                                const today = new Date();
                                if (today >= minDateObj) {
                                    handleDateSelect(today);
                                }
                            }}
                            className="text-sm text-blue-600 hover:text-blue-800"
                            type="button"
                        >
                            Hoy
                        </button>
                        <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500 hover:text-gray-700" type="button">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
