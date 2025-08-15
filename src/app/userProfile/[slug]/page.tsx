import React from 'react';
import InfoRapidaUser from '@/components/perfil-usuario/InfoRapidaUser';
import { IUser, getProfessionalById } from '@/services/prrofessionalProfile';
import { cookies } from 'next/headers';

export default async function UserProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const id = (await params).slug;

    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    const userData: IUser | null = (await getProfessionalById(id, token)) as IUser;

    if (!userData) {
        return <div>No se encontró el usuario</div>;
    }

    return (
        <div className="flex justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[80%] flex flex-col items-center">
                <div className="w-full md:w-[60%] mt-10">
                    <InfoRapidaUser
                        role={userData.role}
                        name={userData.name}
                        email={userData.email}
                        created_at={userData.created_at}
                        photoUrl="/person-gray-photo-placeholder-woman.webp"
                        address={userData.address}
                        phone={userData.phone}
                        health_insurance={userData.health_insurance}
                    />
                </div>
            </div>
        </div>
    );
}
