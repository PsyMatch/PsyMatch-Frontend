import React from "react";
import UserPhoto from "./UserPhoto";
import { IUser } from "@/services/prrofessionalProfile";



const InfoRapidaUser: React.FC<IUser> = ({ address, joinedDate, name, photoUrl, email, phone, role }) => (
  <div className="flex flex-col items-center p-6 bg-white border-2 border-gray-200 rounded-xl">
    <UserPhoto photoUrl={photoUrl} name={name} />
    <h2 className="mt-4 mb-4 text-xl font-bold">{name}</h2>
    <div className="mb-2 text-gray-700">{email}</div>
    {phone && (
      <div className="mb-2 text-gray-700">
        <span className="font-semibold">Teléfono:</span> {phone}
      </div>
    )}
    <div className="mb-2">
      <span className="font-semibold">Ciudad:</span> {address}
    </div>
    <div>
      <span className="font-semibold">Miembro desde:</span> {joinedDate}
    </div>
  </div>
);

export default InfoRapidaUser;
