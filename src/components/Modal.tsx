import React from "react";

interface ModalAction {
  label: string;
  onClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeLabel?: string;
  lang?: string;
  action?: ModalAction; 
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  closeLabel = "Close", 
  lang = "en",
  action = null,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white-500/75">
      <div className="bg-white border border-[#324681] shadow-lg max-w-md w-full p-6 relative" style={{ borderRadius: 0 }}>
        {/* Top close button */}
        <button
          onClick={onClose}
          className={`absolute top-2 ${lang === "he" ? "left-2" : "right-2"} bg-white text-2xl font-bold focus:outline-none`}
          aria-label={closeLabel}
          style={{ borderRadius: 0 }}
        >
          &times;
        </button>
        <div className="mb-6">{children}</div>
        {/* Action button */}
        {action && (
          <button
            onClick={action.onClick}
            /* className="mt-2 px-4 py-2 bg-[#324681] text-white rounded-none hover:bg-[#22315a]" */
            className="mt-4 px-4 py-2 bg-[#d70d0e] text-white rounded-none hover:bg-[#b80b0b]"
            style={{ borderRadius: 0 }}
          >
            {action.label}
          </button>
        )}
        {/* Bottom close button */}
        <button
          onClick={onClose}
          className="mt-4 mr-2 ml-2 px-4 py-2 bg-white border border-[#d70d0e] text-[#d70d0e] rounded-none hover:bg-[#d70d0e] hover:text-white"
          style={{ borderRadius: 0 }}
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
};

export default Modal;