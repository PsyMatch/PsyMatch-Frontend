import React from "react";

interface ContactoUserProps {
  phone?: string;
  email: string;
}

const ContactoUser: React.FC<ContactoUserProps> = ({ phone, email }) => (
  <div className="p-4 bg-white rounded-lg shadow mb-4">
    <h2 className="text-xl font-bold mb-2">Contacto</h2>
    <p><span className="font-semibold">Correo:</span> {email}</p>
    {phone && <p><span className="font-semibold">Teléfono:</span> {phone}</p>}
  </div>
);

export default ContactoUser;
