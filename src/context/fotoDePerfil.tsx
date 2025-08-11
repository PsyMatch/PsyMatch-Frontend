"use client"
import React, { createContext, useContext, useState } from "react";

interface FotoDePerfilContextProps {
  profileImageFile: File | null;
  profileImagePreview: string | null;
  setProfileImageFile: (file: File | null) => void;
  setProfileImagePreview: (preview: string | null) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FotoDePerfilContext = createContext<FotoDePerfilContextProps | undefined>(undefined);

export const FotoDePerfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setProfileImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImagePreview(null);
    }
  };

  return (
    <FotoDePerfilContext.Provider
      value={{ profileImageFile, profileImagePreview, setProfileImageFile, setProfileImagePreview, handleImageUpload }}
    >
      {children}
    </FotoDePerfilContext.Provider>
  );
};

export const useFotoDePerfil = () => {
  const context = useContext(FotoDePerfilContext);
  if (!context) throw new Error("useFotoDePerfil debe usarse dentro de FotoDePerfilProvider");
  return context;
};
