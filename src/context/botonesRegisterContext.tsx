"use client"
import { createContext, useContext, useState } from "react";


interface FormContextProps {
  pasoActual: number;
  avanzarPaso: () => void;
  retrocederPaso: () => void;
  profileImageFile: File | null;
  profileImagePreview: string | null;
  setProfileImage: (file: File | null, preview?: string) => void;
}

const BotonesRegisterContext = createContext<FormContextProps | undefined>(undefined);

export const BotonesRegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pasoActual, setPasoActual] = useState(1);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const avanzarPaso = () => {
    setPasoActual((p) => Math.min(p + 1, 3));
  }

  const retrocederPaso = () => {
    setPasoActual((p) => Math.max(p - 1, 1));
  }

  const setProfileImage = (file: File | null, preview?: string) => {
    setProfileImageFile(file);
    setProfileImagePreview(preview ?? null);
  };

  return (
    <BotonesRegisterContext.Provider value={{ pasoActual, avanzarPaso, retrocederPaso, profileImageFile, profileImagePreview, setProfileImage }}> 
      {children}
    </BotonesRegisterContext.Provider>
  );
};

export const useBotonesRegisterContext = () => {
  const context = useContext(BotonesRegisterContext);
  if (!context) throw new Error("useFormContext debe usarse dentro de FormProvider");
  return context;
};
