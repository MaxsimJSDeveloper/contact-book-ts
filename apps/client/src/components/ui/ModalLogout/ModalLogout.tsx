import { createPortal } from "react-dom";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/auth";

interface ModalLogoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalLogout = ({ isOpen, onClose }: ModalLogoutProps) => {
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1500] flex items-start justify-end pr-4 pt-20 md:pr-[6vw]"
      onClick={handleOutsideClick}
    >
      <div className="flex h-[63px] items-center rounded-lg bg-white px-[18px] py-[14px] shadow-xl">
        <p className="mr-6 text-[22px] text-gray-800">Log out?</p>

        <div className="flex gap-2.5">
          <button
            className="rounded-[10px] border border-brand-accent px-[18px] py-2.5 text-xs font-semibold text-brand-accent transition-colors hover:bg-teal-50"
            onClick={onClose}
          >
            CANCEL
          </button>
          <button
            className="rounded-[10px] border border-brand-accent bg-brand-accent px-[18px] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-accent/90"
            onClick={() => {
              dispatch(logoutUser());
              onClose();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
