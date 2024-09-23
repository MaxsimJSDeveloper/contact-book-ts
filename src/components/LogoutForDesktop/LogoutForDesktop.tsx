import { useState, useEffect } from "react";
import css from "./LogoutForDesktop.module.css";
import ModalLogout from "../ModalLogout/ModalLogout";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export const LogoutForDesktop = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 768);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  return isLoggedIn && isDesktop ? (
    <div className={css.wrapper}>
      <button onClick={handleClickOpen} className={css.button} type="button">
        Log out
      </button>
      <ModalLogout isOpen={isOpen} onClose={handleClickClose} />
    </div>
  ) : null;
};
