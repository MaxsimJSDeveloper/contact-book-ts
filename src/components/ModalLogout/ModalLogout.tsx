import { useDispatch } from "react-redux";

import css from "./ModalLogout.module.css";
import { logoutUser } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";

const ModalLogout = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
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

export default ModalLogout;
