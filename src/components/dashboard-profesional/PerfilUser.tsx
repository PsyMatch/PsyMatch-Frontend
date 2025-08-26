'use client';

import { useState, useEffect, useRef } from 'react';
import Input from '../ui/input';
import { Camera, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { envs } from '@/config/envs.config';
import Cookies from 'js-cookie';

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

type UserProfile = {
    id?: string;
    fullName: string;
    alias: string;
    birthDate?: string;
    phone: string;
    address: string;
    email?: string;
    socialWork: string;
    emergencyContact: string;
    profileImage?: string;
};

const fields: { label: string; field: keyof UserProfile; type?: string }[] = [
    { label: 'Nombre Completo', field: 'fullName' },
    { label: 'Alias', field: 'alias' },
    { label: 'Número de teléfono', field: 'phone' },
    { label: 'Dirección', field: 'address' },
    { label: 'Contacto de emergencia', field: 'emergencyContact' },
];

const extractUserFromToken = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            Cookies.remove('auth_token');
            throw new Error('Token expired');
        }
        return {
            id: payload.id || payload.sub || payload.userId,
            email: payload.email,
        };
    } catch (_error) {
        console.error('Error al extraer información del token:', _error);
        Cookies.remove('auth_token');
        throw new Error('Invalid token');
    }
};

const socialWorkOptions = [
    { value: '', label: 'Seleccionar obra social' },
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

const PerfilUser = () => {
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [user, setUser] = useState<UserProfile>({
        id: '',
        fullName: '',
        alias: '',
        phone: '',
        address: '',
        socialWork: '',
        emergencyContact: '',
        profileImage: '',
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Estados para autocompletado de direcciones
    const [addressSuggestions, setAddressSuggestions] = useState<MapboxSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [_selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

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
        setUser((prev) => ({ ...prev, address: suggestion.place_name }));
        setShowSuggestions(false);
        setAddressSuggestions([]);

        setSelectedCoordinates({
            lat: suggestion.center[1],
            lng: suggestion.center[0],
        });
        setSelectedPlaceId(suggestion.id);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUser((prev) => ({ ...prev, address: value }));
        setSelectedCoordinates(null);
        setSelectedPlaceId(null);
        setTimeout(() => {
            if (value && !selectedPlaceId) {
                searchAddresses(value);
            }
        }, 300);
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

    // --- Cargar datos del usuario desde cookies ---
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get('auth_token');
                if (!token) {
                    router.push('/login');
                    return;
                }
                const res = await fetch(`${envs.next_public_api_url}/users/me`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 401) {
                    router.push('/login');
                    return;
                }
                if (!res.ok) {
                    setErrorMsg('Error al obtener usuario');
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                const userData = data.data;
                const userFromToken = extractUserFromToken(token); //token de oAuth
                setUser({
                    id: userData.id || userFromToken.id || '',
                    fullName: userData.fullName || userData.name || '',
                    alias: userData.alias || '',
                    phone: userData.phone || '',
                    address: userData.address || '',
                    email: userData.email || userFromToken.email || '',
                    socialWork: userData.health_insurance || '',
                    emergencyContact: userData.emergencyContact || userData.emergency_contact || '',
                    profileImage: userData.profileImage || userData.profile_picture || '',
                });
                setProfileImage(
                    userData.profileImage ||
                        userData.profile_picture ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName || userData.name || 'Usuario')}`
                );
            } catch (_error) {
                setErrorMsg(`${_error}, Error al obtener usuario`);
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    // --- Manejadores ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileFile(file);
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setSuccessMsg('');
            setErrorMsg('');
            const token = Cookies.get('auth_token');
            if (!token) {
                router.push('/login');
                return;
            }
            if (!user.id) {
                setErrorMsg('No se encontró el ID de usuario.');
                setLoading(false);
                return;
            }
            const formData = new FormData();
            formData.append('name', user.fullName);
            formData.append('alias', user.alias);
            formData.append('phone', user.phone);
            formData.append('address', user.address);
            if (user.socialWork) {
                formData.append('health_insurance', user.socialWork);
            }
            if (user.emergencyContact) {
                formData.append('emergency_contact', user.emergencyContact);
            }
            if (profileFile) {
                formData.append('profile_picture', profileFile);
            }
            const res = await fetch(`${envs.next_public_api_url}/users/me`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (res.status === 401) {
                router.push('/login');
                setLoading(false);
                return;
            }
            if (!res.ok) {
                let errorMsg = 'Error al guardar los datos.';
                try {
                    const errorJson = await res.json();
                    if (errorJson && (errorJson.message || errorJson.error)) {
                        errorMsg = Array.isArray(errorJson.message) ? errorJson.message.join(' ') : errorJson.message || errorJson.error;
                    }
                } catch {
                    const errorText = await res.text();
                    if (errorText) errorMsg = errorText;
                }
                setErrorMsg(errorMsg);
                setLoading(false);
                return;
            }
            const data = await res.json();
            const userData = data.data || {};
            setUser((prev) => ({
                ...prev,
                id: userData.id ?? prev.id,
                fullName: userData.fullName ?? userData.name ?? prev.fullName,
                alias: userData.alias ?? prev.alias,
                phone: userData.phone ?? prev.phone,
                address: userData.address ?? prev.address,
                socialWork: userData.health_insurance ?? prev.socialWork,
                emergencyContact: userData.emergencyContact ?? userData.emergency_contact ?? prev.emergencyContact,
                profileImage: userData.profileImage ?? userData.profile_picture ?? prev.profileImage,
            }));
            setProfileImage(
                userData.profileImage ||
                    userData.profile_picture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName || userData.name || user.fullName || 'Usuario')}`
            );
            setEditable(false);
            setProfileFile(null);
            setSuccessMsg('¡Datos guardados correctamente!');
        } catch (_error) {
            setErrorMsg('Error al guardar los datos.');
            console.error('Error al guardar:', _error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full gap-8 px-2 py-8 md:flex-row bg-white">
            {/* Panel imagen */}
            <div className="flex flex-col items-center w-full md:w-1/2">
                <div className="flex flex-col items-center w-full p-8 bg-white rounded-lg shadow">
                    <div className="relative mb-4">
                        <Image
                            src={
                                profileImage && typeof profileImage === 'string' && profileImage.trim() !== ''
                                    ? profileImage
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'Usuario')}`
                            }
                            alt="profile"
                            width={128}
                            height={128}
                            className="object-cover w-32 h-32 bg-gray-200 rounded-full"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (!target.src.includes('ui-avatars.com')) {
                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'Usuario')}`;
                                }
                            }}
                        />
                        {editable && (
                            <>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="profile-upload" />
                                <label
                                    htmlFor="profile-upload"
                                    className="absolute p-2 bg-gray-200 rounded-full shadow cursor-pointer bottom-2 right-2 hover:bg-gray-300"
                                >
                                    <Camera className="w-5 h-5 text-gray-600" />
                                </label>
                            </>
                        )}
                    </div>
                    <h3 className="mb-1 text-xl font-semibold">{user.fullName}</h3>
                    <p className="mb-2 text-gray-500">{user.email}</p>
                    <div className="mb-2 text-sm text-gray-400">{user.phone}</div>
                    <div className="text-xs text-gray-400">Obra Social: {user.socialWork || 'No especificada'}</div>
                </div>
            </div>

            {/* Panel edición */}
            <div className="flex flex-col w-full md:w-1/2">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Mi cuenta</h2>
                        <button
                            onClick={() => setEditable((e) => !e)}
                            disabled={loading}
                            className={`px-4 py-2 rounded text-white ${editable ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {editable ? 'Cancelar' : 'Editar'}
                        </button>
                    </div>
                    {/* Mensajes de éxito o error */}
                    {successMsg && <div className="px-4 py-2 mb-4 text-green-600 bg-green-100 rounded">{successMsg}</div>}
                    {errorMsg && <div className="px-4 py-2 mb-4 text-red-600 bg-red-100 rounded">{errorMsg}</div>}
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {fields.map(({ label, field, type }) => (
                                <div key={field} className={field === 'address' ? 'relative' : ''}>
                                    <label className="block mb-1 text-sm font-medium">{label}</label>
                                    {field === 'address' ? (
                                        <>
                                            <div ref={addressInputRef}>
                                                <input
                                                    name={field}
                                                    type={type || 'text'}
                                                    className="w-full px-3 py-2 border rounded placeholder:text-gray-400"
                                                    value={user[field] || ''}
                                                    disabled={!editable || loading}
                                                    onChange={handleAddressChange}
                                                    placeholder="Av. Corrientes 123, Buenos Aires, Argentina"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            {showSuggestions && editable && (
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
                                        </>
                                    ) : (
                                        <Input
                                            name={field}
                                            type={type || 'text'}
                                            className="w-full px-3 py-2 border rounded"
                                            value={user[field] || ''}
                                            disabled={!editable || loading}
                                            onChange={handleChange}
                                        />
                                    )}
                                </div>
                            ))}
                            {/* Select para Obra Social */}
                            <div>
                                <label className="block mb-1 text-sm font-medium">Obra Social</label>
                                <select
                                    name="socialWork"
                                    className="w-full px-3 py-2 bg-white border rounded"
                                    value={user.socialWork || ''}
                                    disabled={!editable || loading}
                                    onChange={(e) =>
                                        handleChange({ target: { name: 'socialWork', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)
                                    }
                                >
                                    <option value="">Seleccionar obra social</option>
                                    {socialWorkOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {editable && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={loading}
                                    className={`px-6 py-2 rounded text-white ${
                                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {loading ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};
export default PerfilUser;
