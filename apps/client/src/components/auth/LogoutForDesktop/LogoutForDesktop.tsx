import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectIsLoggedIn } from "@/redux/auth";
import { ModalLogout } from "@/components/ui";

export const LogoutForDesktop = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 768);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLoggedIn || !isDesktop) return null;

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-[124px] items-center justify-center rounded-lg bg-[#b31818] text-[18px] leading-relaxed text-[#fafafa] transition-colors hover:bg-[#841c1c]"
        type="button"
      >
        Log out
      </button>
      <ModalLogout isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
