import { useState, useEffect } from "react";

import AuthNav from "../AuthNav/AuthNav";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

import css from "./AppBar.module.css";
import Navigation from "../Navigation/Navigation";
import { RxHamburgerMenu } from "react-icons/rx";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
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
          <RxHamburgerMenu
            className={css.hamburger}
            onClick={handleModalOpen}
          />
          {isModalOpen && (
            <div className={css.modalOverlay} onClick={handleModalClose}>
              <div
                className={css.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <Navigation onLinkClick={handleModalClose} />
                {!isLoggedIn && <AuthNav onLinkClick={handleModalClose} />}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Navigation />
          {!isLoggedIn && <AuthNav />}
        </>
      )}
    </header>
  );
};

export default AppBar;
