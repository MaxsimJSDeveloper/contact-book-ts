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
    <header className="relative mb-[36px] mt-[37px] flex items-center justify-end px-6 md:mt-[30px]">
      {isMobile ? (
        <>
          <Menu
            className="h-9 w-9 cursor-pointer text-[#d9ebee]"
            onClick={handleOpen}
          />
          <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="w-[180px] rounded-2xl bg-[#00242A] p-6 pt-10">
              <Navigation onLinkClick={handleClose} />
              {!isLoggedIn && <AuthNav onLinkClick={handleClose} />}
              {isLoggedIn && <Logout onClose={handleClose} />}
            </div>
          </Modal>
        </>
      ) : (
        <div className="mx-auto flex items-center rounded-2xl bg-brand-accent/85 px-10 py-3 gap-12">
          <Navigation />
          {!isLoggedIn && <AuthNav />}
        </div>
      )}

      {isLoggedIn && !isMobile && (
        <div className="hidden md:block md:absolute md:right-[5%] md:top-0">
          <LogoutForDesktop />
        </div>
      )}
    </header>
  );
};
