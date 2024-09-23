import { useEffect, useState, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import css from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [mouseDownOnOverlay, setMouseDownOnOverlay] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setMouseDownOnOverlay(true);
    }
  };

  const handleMouseUp = () => {
    if (mouseDownOnOverlay) {
      onClose();
    }
    setMouseDownOnOverlay(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={css.modalOverlay}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <IoMdClose className={css.icon} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
