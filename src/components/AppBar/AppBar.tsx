import { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";

import css from "./AppBar.module.css";

import Logout from "../Logout/Logout";
import { LogoutForDesktop } from "../LogoutForDesktop/LogoutForDesktop";
import Modal from "../Modal/Modal";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <header
      className={`${css.header} ${isLoggedIn ? css.loggedIn : css.loggedOut} ${
        isMobile ? css.mobile : ""
      }`}
    >
      {isMobile ? (
        <>
          <RxHamburgerMenu className={css.hamburger} onClick={handleOpen} />
          <Modal isOpen={isOpen} onClose={handleClose}>
            <div
              style={{
                backgroundColor: "#00242A",
                borderRadius: 12,
                padding: 20,
                width: 150,
              }}
            >
              <Navigation onLinkClick={handleClose} />
              {!isLoggedIn && <AuthNav onLinkClick={handleClose} />}
              {isLoggedIn && <Logout onClose={handleClose} />}
            </div>
          </Modal>
        </>
      ) : (
        <>
          <Navigation />
          {!isLoggedIn && <AuthNav />}
          <LogoutForDesktop />
        </>
      )}
    </header>
  );
};

export default AppBar;
