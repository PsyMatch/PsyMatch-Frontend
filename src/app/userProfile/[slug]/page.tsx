import React from "react";
import InfoRapidaUser from "@/components/perfil-usuario/InfoRapidaUser";

// Simulación de datos de usuario. Reemplaza esto con tu lógica de obtención de datos.

const userData = {
  name: "Juan Pérez",
  email: "juan.perez@email.com",
  joinedDate: "Enero 2024",
  phone: "555-123-4567",
  about: "Soy un usuario entusiasta de la plataforma, me gusta aprender y conectar con profesionales.",
  photoUrl: "/person-gray-photo-placeholder-woman.webp", // Usa una imagen de ejemplo de public/
  ciudad: "Buenos Aires, Argentina",
  intereses: ["Psicología", "Bienestar", "Mindfulness"]
};

const UserProfilePage = () => {
  return ( 
    <div className="w-full flex justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-[80%] flex flex-col items-center">
        <div className="w-full md:w-[60%] mt-10">
          <InfoRapidaUser
            name={userData.name}
            email={userData.email}
            joinedDate={userData.joinedDate}
            photoUrl={userData.photoUrl}
            ciudad={userData.ciudad}
            intereses={userData.intereses}
            phone={userData.phone}
          />
        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;
