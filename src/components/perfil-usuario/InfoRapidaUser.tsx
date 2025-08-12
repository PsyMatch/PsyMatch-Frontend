import React from "react";
import UserPhoto from "./UserPhoto";

interface InfoRapidaUserProps {
  ciudad: string;
  intereses: string[];
  joinedDate: string;
  name: string;
  photoUrl?: string;
  email: string;
  phone?: string;
}

const InfoRapidaUser: React.FC<InfoRapidaUserProps> = ({ ciudad, intereses, joinedDate, name, photoUrl, email, phone }) => (
  <div className="bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col items-center">
    <UserPhoto photoUrl={photoUrl} name={name} />
    <h2 className="text-xl font-bold mb-4 mt-4">{name}</h2>
    <div className="mb-2 text-gray-700">{email}</div>
    {phone && (
      <div className="mb-2 text-gray-700">
        <span className="font-semibold">Teléfono:</span> {phone}
      </div>
    )}
    <div className="mb-2">
      <span className="font-semibold">Ciudad:</span> {ciudad}
    </div>
    <div className="mb-2">
      <span className="font-semibold">Intereses:</span> {intereses.map((i) => (
        <span key={i} className="inline-block bg-[#5046E7] text-white text-xs rounded-xl px-2 py-1 mx-1">{i}</span>
      ))}
    </div>
    <div>
      <span className="font-semibold">Miembro desde:</span> {joinedDate}
    </div>
  </div>
);

export default InfoRapidaUser;
