import React from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white px-6 rounded-lg max-w-sm lg:max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-3xl bg-transparent border-none cursor-pointer text-gray-500"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
