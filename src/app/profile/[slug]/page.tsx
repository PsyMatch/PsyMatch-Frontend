import { Suspense } from 'react';
import Professional from '../../../components/perfil-profesional/Professional';
import SobreMi from '../../../components/perfil-profesional/SobreMi';
import InfoRapida from '../../../components/perfil-profesional/InfoRapida';
import Ubicacion from '../../../components/perfil-profesional/Ubicacion';
import Contacto from '../../../components/perfil-profesional/Contacto';
import InfoRapidaUser from '@/components/perfil-usuario/InfoRapidaUser';
import { getProfessionalById, type IUser } from '@/services/prrofessionalProfile';
import { cookies } from 'next/headers';
import type { IProfessional } from '@/services/prrofessionalProfile';
import Reseñas from '@/components/perfil-profesional/Reseñas';
import CrearReseñas from '@/components/perfil-profesional/CrearReseñas';

function ProfileSkeleton() {
    return (
        <div className="w-full flex justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[80%] flex flex-col animate-pulse">
                <div className="w-full mt-10 bg-white border-2 border-gray-200 h-56 mb-10 rounded-xl"></div>
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-[60%_37.5%]">
                    <div className="flex flex-col gap-6">
                        <div className="w-full bg-white border-2 border-gray-200 h-40 rounded-xl"></div>
                        <div className="w-full bg-white border-2 border-gray-200 h-32 rounded-xl"></div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="w-full bg-white border-2 border-gray-200 h-48 rounded-xl"></div>
                        <div className="w-full bg-white border-2 border-gray-200 h-32 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfessionalLayout({ professional }: { professional: IProfessional }) {
    return (
        <div className="w-full flex justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[90%] lg:w-[80%] flex flex-col">
                <div>
                    <Professional data={professional} />
                </div>
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-[60%_37.5%]">
                    <div className="flex flex-col">
                        <SobreMi data={professional} />
                        <InfoRapida data={professional} />
                        <Reseñas data={professional} />
                    </div>
                    <div>
                        <Ubicacion data={professional} />
                        <Contacto data={professional} />
                        <CrearReseñas psychologistId={professional.id} psychologistName={professional.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserLayout({ user }: { user: IUser }) {
    return (
        <div className="flex justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-[90%] lg:w-[80%] flex flex-col items-center">
                <div className="w-full md:w-[60%] mt-10">
                    <InfoRapidaUser
                        role={user.role}
                        name={user.name}
                        email={user.email}
                        created_at={user.created_at}
                        photoUrl="/person-gray-photo-placeholder-woman.webp"
                        address={user.address}
                        phone={user.phone}
                        health_insurance={user.health_insurance}
                    />
                </div>
            </div>
        </div>
    );
}

function ProfileNotFound() {
    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center p-8 bg-white rounded-xl border-2 border-gray-200 shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Perfil no encontrado</h1>
                <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar el perfil que buscas.</p>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Volver atrás
                </button>
            </div>
        </div>
    );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const id = (await params).slug;

    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    const profesionalSeleccionado: IProfessional | IUser | null = await getProfessionalById(id, token);

    if (!profesionalSeleccionado) {
        return <ProfileNotFound />;
    }

    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <main role="main" aria-label="Perfil profesional">
                {profesionalSeleccionado.role === 'Psicólogo' ? (
                    <ProfessionalLayout professional={profesionalSeleccionado as IProfessional} />
                ) : (
                    <UserLayout user={profesionalSeleccionado as IUser} />
                )}
            </main>
        </Suspense>
    );
}
