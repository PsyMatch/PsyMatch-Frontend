"use client"
import { createContext, useContext, useState } from "react";


interface ModalContextProps {
    modal: boolean
    cerrarModal: () => void;
    abrirModal: () => void
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(true);
  }

  const cerrarModal = () => {
    setModal(false);
  }

  return (
    <ModalContext.Provider value={{ modal, abrirModal, cerrarModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useFormContext debe usarse dentro de FormProvider");
  return context;
};