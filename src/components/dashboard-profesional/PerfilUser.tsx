'use client';

import { useState, useEffect } from 'react';
import Input from '../ui/input';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { envs } from '@/config/envs.config';

type UserProfile = {
    id?: string;
    fullName: string;
    alias: string;
    birthDate?: string;
    phone: string;
    address: string;
    email: string;
    socialWork: string;
    emergencyContact: string;
    profileImage?: string;
};

const fields: { label: string; field: keyof UserProfile; type?: string }[] = [
    { label: 'Nombre Completo', field: 'fullName' },
    { label: 'Alias', field: 'alias' },
    { label: 'Fecha de nacimiento', field: 'birthDate', type: 'date' },
    { label: 'Número de teléfono', field: 'phone' },
    { label: 'Dirección', field: 'address' },
    { label: 'Correo electrónico', field: 'email' },
    { label: 'Obra Social', field: 'socialWork' },
    { label: 'Contacto de emergencia', field: 'emergencyContact' },
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
        birthDate: '',
        phone: '',
        address: '',
        email: '',
        socialWork: '',
        emergencyContact: '',
        profileImage: '',
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const router = useRouter();

    // --- Cargar datos del usuario desde cookies ---
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('authToken');
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
                setUser({
                    id: userData.id || '',
                    fullName: userData.fullName || userData.name || '',
                    alias: userData.alias || '',
                    birthDate: userData.birthDate || userData.birthdate || '',
                    phone: userData.phone || '',
                    address: userData.address || '',
                    email: userData.email || '',
                    socialWork: userData.socialWork || userData.social_security_number || '',
                    emergencyContact: userData.emergencyContact || userData.emergency_contact || '',
                    profileImage: userData.profileImage || userData.profile_picture || '',
                });
                setProfileImage(
                    userData.profileImage ||
                        userData.profile_picture ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName || userData.name || 'Usuario')}`
                );
            } catch (err) {
                setErrorMsg(`${err}, Error al obtener usuario`);
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
            const token = localStorage.getItem('authToken');
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
            formData.append('email', user.email);
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
            const res = await fetch('${envs.next_public_api_url}/users/me', {
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
                birthDate: userData.birthDate ?? userData.birthdate ?? prev.birthDate,
                phone: userData.phone ?? prev.phone,
                address: userData.address ?? prev.address,
                email: userData.email ?? prev.email,
                socialWork: userData.socialWork ?? userData.social_security_number ?? prev.socialWork,
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
        } catch (error) {
            setErrorMsg('Error al guardar los datos.');
            console.error('Error al guardar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-2 rounded-xl">
            {/* Panel imagen */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center w-full">
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
                            className="w-32 h-32 rounded-full object-cover bg-gray-200"
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
                                    className="absolute bottom-2 right-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full cursor-pointer shadow"
                                >
                                    <Camera className="w-5 h-5 text-gray-600" />
                                </label>
                            </>
                        )}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{user.fullName}</h3>
                    <p className="text-gray-500 mb-2">{user.email}</p>
                    <div className="text-sm text-gray-400 mb-2">{user.phone}</div>
                    <div className="text-xs text-gray-400">Obra Social: {user.socialWork || 'No especificada'}</div>
                </div>
            </div>

            {/* Panel edición */}
            <div className="w-full md:w-1/2 flex flex-col">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-center mb-6">
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
                    {successMsg && <div className="mb-4 text-green-600 bg-green-100 px-4 py-2 rounded">{successMsg}</div>}
                    {errorMsg && <div className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded">{errorMsg}</div>}
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.map(({ label, field, type }) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium mb-1">{label}</label>
                                    <Input
                                        name={field}
                                        type={field === 'birthDate' ? 'date' : type || 'text'}
                                        className="border rounded px-3 py-2 w-full"
                                        value={user[field] || ''}
                                        disabled={!editable || loading}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
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
