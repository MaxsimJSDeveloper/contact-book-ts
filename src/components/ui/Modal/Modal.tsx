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
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/50"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="relative flex justify-end rounded-[5px] px-3 py-6 md:px-6 md:py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2.5 top-2.5 z-[1550] text-[#005358] transition-colors hover:text-brand-accent"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
