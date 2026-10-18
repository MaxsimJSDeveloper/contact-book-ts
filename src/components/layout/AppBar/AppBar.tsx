import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { useAppSelector } from "@/redux/hooks";
import { selectIsLoggedIn } from "@/redux/auth";

import { AuthNav, Logout, LogoutForDesktop } from "@/components/auth";
import { Navigation } from "@/components/layout";
import { Modal } from "@/components/ui";

export const AppBar = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [isOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <header
      className={`
        mb-[72px] mt-[37px] ml-auto flex items-center justify-end gap-6
        md:mx-auto md:mb-[72px] md:mt-[30px] md:w-max md:justify-center md:gap-12 md:rounded-2xl md:bg-brand-accent/85 md:px-10 md:py-3
      `}
    >
      {isMobile ? (
        <>
          <Menu
            className="h-9 w-9 cursor-pointer text-[#d9ebee]"
            onClick={handleOpen}
          />
          <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="w-[150px] rounded-xl bg-[#00242A] p-5">
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
