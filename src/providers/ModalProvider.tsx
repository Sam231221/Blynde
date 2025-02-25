import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider."
    );
  }
  return context;
}

interface ModalContextProviderProps {
  children: ReactNode;
}

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    console.log("sd:", isModalOpen);
    setContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, content, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
