import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { useAppSelector } from "@/redux/hooks";
import { selectIsLoggedIn } from "@/redux/auth";

import { AuthNav, Logout, LogoutForDesktop } from "@/components/auth";
import { Navigation } from "@/components/layout";
import { Modal } from "@/components/ui";

import css from "./AppBar.module.css";

export const AppBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [isOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

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
          {isLoggedIn && <LogoutForDesktop />}
        </>
      )}
    </header>
  );
};
