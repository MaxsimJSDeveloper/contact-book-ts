import { NavLink } from "react-router-dom";

interface AuthNavProps {
  onLinkClick?: () => void;
}

export const AuthNav = ({ onLinkClick }: AuthNavProps) => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative inline-block text-[24px] leading-[14px] text-[#fafafa] transition-colors duration-250 md:leading-[28px] ${
      isActive
        ? "after:absolute after:bottom-[-1px] after:left-0 after:h-[0.5px] after:w-full after:rounded-[2px] after:bg-[#fafafa] md:after:bottom-[-4px] md:after:h-[2px]"
        : ""
    }`;

  return (
    <div className="my-5 flex flex-col items-center justify-center gap-5 md:my-0 md:flex-row md:gap-16">
      <NavLink className={linkClasses} to="/register" onClick={onLinkClick}>
        Register
      </NavLink>
      <NavLink className={linkClasses} to="/login" onClick={onLinkClick}>
        Log In
      </NavLink>
    </div>
  );
};
