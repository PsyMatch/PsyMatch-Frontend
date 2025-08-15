import React from "react";
import InfoRapidaUser from "@/components/perfil-usuario/InfoRapidaUser";
import { IUser } from "@/services/prrofessionalProfile";


const UserProfilePage = ({ data }: { data: IUser }) => {
  return ( 
    <div className="flex justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-[80%] flex flex-col items-center">
        <div className="w-full md:w-[60%] mt-10">
          <InfoRapidaUser
            role={data.role}
            name={data.name}
            email={data.email}
            created_at={data.created_at}
            photoUrl="/person-gray-photo-placeholder-woman.webp"
            address={data.address}
            phone={data.phone}
            health_insurance={data.health_insurance}
          />
        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;
