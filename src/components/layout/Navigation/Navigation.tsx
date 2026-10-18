import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectIsLoggedIn } from "@/redux/auth";

interface NavigationProps {
  onLinkClick?: () => void;
}

export const Navigation = ({ onLinkClick }: NavigationProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative inline-block text-[24px] leading-[14px] text-[#fafafa] transition-colors duration-250 md:leading-[28px] ${
      isActive
        ? "after:absolute after:bottom-[-1px] after:left-0 after:h-[0.5px] after:w-full after:rounded-[2px] after:bg-[#fafafa] md:after:bottom-[-4px] md:after:h-[2px]"
        : ""
    }`;

  return (
    <nav className="mt-5 flex flex-col items-center justify-center gap-5 md:mt-0 md:flex-row md:gap-16">
      <NavLink className={linkClasses} to="/" onClick={onLinkClick}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={linkClasses} to="/contacts" onClick={onLinkClick}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
