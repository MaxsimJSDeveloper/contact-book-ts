import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [mouseDownOnOverlay, setMouseDownOnOverlay] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setMouseDownOnOverlay(true);
  };

  const handleMouseUp = () => {
    if (mouseDownOnOverlay) onClose();
    setMouseDownOnOverlay(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute right-3 top-3 z-[1550] rounded-full p-1 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          onClick={onClose}
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
