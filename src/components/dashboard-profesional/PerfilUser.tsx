import { useState } from "react"
import { Pencil } from "lucide-react"
import Input from "../ui/input"
import { Camera } from "lucide-react"

const PerfilUser = () => {
    const [editable, setEditable] = useState(false)
    const [profileImage, setProfileImage] = useState<string>("https://ui-avatars.com/api/?name=User&background=E0E7FF&color=3730A3")
    // Simulación de datos de usuario
    const user = {
        fullName: "killer",
        birthDate: "12/05/1998",
        phone: "+1 555 123 4567",
        dni: "12345678",
        address: "Calle Falsa 123, Buenos Aires",
        email: "jesse@example.com",
        socialWork: "OSDE",
        emergencyContact: "+1 555 987 6543",
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    return(
       <div className="flex flex-col md:flex-row gap-8 w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-2 rounded-xl">
                {/* Panel superior: imagen y datos principales */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center w-full">
                        <div className="relative mb-4">
                            <img src={profileImage} alt="profile" className="w-32 h-32 rounded-full object-cover bg-gray-200" />
                            {editable && (
                                <>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="profile-upload"
                                    />
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
                {/* Panel inferior: formulario de edición */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Mi cuenta</h2>
                            <button onClick={() => setEditable((e) => !e)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                {editable ? 'Cancelar' : 'Editar'}
                            </button>
                        </div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nombre Completo</label>
                                    <Input
                                        className="border rounded px-3 py-2 w-full"
                                        value={user.fullName}
                                        disabled={!editable}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
                                    <input
                                        className="border rounded px-3 py-2 w-full"
                                        value={user.birthDate}
                                        disabled={!editable}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Número de teléfono</label>
                                    <Input
                                        className="border rounded px-3 py-2 w-full"
                                        value={user.phone}
                                        disabled={!editable}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                                    <Input
                                        className="border rounded px-3 py-2 w-full"
                                        value={user.email}
                                        disabled={!editable}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">DNI</label>
                                    <Input
                                        className="border rounded px-3 py-2 w-full"
                                        value={user.dni}
                                        disabled={!editable}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Dirección</label>
                                    <Input
                                        className="border rounded px-3 py-2 w-full"
                                        value={user.address}
                                        disabled={!editable}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Obra Social</label>
                                    <Input
                                        className="border rounded px-3 py-2 w-full"
                                        value={user.socialWork}
                                        disabled={!editable}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Contacto de Emergencia</label>
                                    <Input
                                        className="border rounded px-3 py-2 w-full"
                                        value={user.emergencyContact}
                                        disabled={!editable}
                                    />
                                </div>
                            </div>
                            {editable && (
                                <div className="flex justify-end">
                                    <button type="button" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
                                        Guardar
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default PerfilUser
