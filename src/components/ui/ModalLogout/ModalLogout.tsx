import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/auth";

import css from "./ModalLogout.module.css";

interface ModalLogoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalLogout = ({ isOpen, onClose }: ModalLogoutProps) => {
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOutsideClick}>
      <div className={css.modal}>
        <p className={css.out}>Log out?</p>
        <div className={css.btnWrap}>
          <button className={`${css.btn} ${css.close}`} onClick={onClose}>
            CANCEL
          </button>
          <button
            className={`${css.btn} ${css.approved}`}
            onClick={() => {
              dispatch(logoutUser());
              onClose();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
