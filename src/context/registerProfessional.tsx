'use client';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface IUser {
    name: string;
    email: string;
    birthdate: Date;
    dni: number;
    profile_picture: string | null;
    license_number: number;
    office_address: string;
    specialities: string[];
    insurance_accepted: string[];
}

interface RegisterResponse {
    message: string;
    data: {
        id: string;
        name: string;
        profile_picture: string | null;
        phone: number;
        birthdate: Date;
        dni: number;
        health_insurance: null;
        address: null;
        emergency_contact: null;
        latitude: number;
        longitude: number;
        email: string;
        role: string;
        office_address: string;
        verified: string;
        license_number: number;
        specialities: string[];
        insurance_accepted: string[];
    };
    token: string;
}

type AuthContextType = {
    isAuth: boolean | null;
    user: IUser | null;
    token: string | null;
    saveUserData: (data: RegisterResponse) => void;
    resetUserData: () => void;
    setIsAuth: (value: boolean) => void;
};

export const AuthProfessionalContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProfessionalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Al montar, chequea si hay cookie o token guardado
        const cookieStr = Cookies.get('responseData');
        const cookiesToken = Cookies.get('auth_token');

        if (cookieStr && cookiesToken) {
            const data = JSON.parse(cookieStr);
            setUser({
                name: data.data.name,
                email: data.data.email,
                birthdate: new Date(data.data.birthdate),
                dni: data.data.dni,
                profile_picture: data.data.profile_picture,
                license_number: data.data.license_number,
                office_address: data.data.office_address,
                specialities: data.data.specialities,
                insurance_accepted: data.data.insurance_accepted,
            });
            setToken(cookiesToken);
            setIsAuth(true);
        } else {
            if (!token) {
                return;
            }
        }
    }, [token]);

    const saveUserData = (data: RegisterResponse) => {
        setToken(data.token);
        setIsAuth(true);

        Cookies.set('responseData', JSON.stringify(data));
    };

    const resetUserData = () => {
        setUser(null);
        setToken(null);
        setIsAuth(false);

        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        Cookies.remove('verified');
        Cookies.remove('userDataCompleta');
        Cookies.remove('auth_token');
        Cookies.remove('role');
        window.location.reload();
    };

    return (
        <AuthProfessionalContext.Provider value={{ user, isAuth, saveUserData, token, resetUserData, setIsAuth }}>
            {children}
        </AuthProfessionalContext.Provider>
    );
};

export const useAuthProfessionalContext = () => {
    const context = useContext(AuthProfessionalContext);
    if (!context) {
        throw new Error('useAuthProfessionalContext debe usarse dentro de un AuthProvider');
    }
    return context;
};
