import React from "react";

interface SobreMiUserProps {
  about: string;
}

const SobreMiUser: React.FC<SobreMiUserProps> = ({ about }) => (
  <div className="p-4 bg-white rounded-lg shadow mb-4">
    <h2 className="text-xl font-bold mb-2">Sobre mí</h2>
    <p>{about}</p>
  </div>
);

export default SobreMiUser;
