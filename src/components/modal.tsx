// Modal.tsx
import React, { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="relative bg-white p-8 rounded-md shadow-lg max-w-md w-full">
          <button className="absolute top-0 right-0 p-4" onClick={onClose}>
            <RxCross2 size={24} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
