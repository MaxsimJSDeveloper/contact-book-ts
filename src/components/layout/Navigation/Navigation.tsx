import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "@/redux/auth";

import css from "./Navigation.module.css";

interface NavigationProps {
  onLinkClick?: () => void;
}

export const Navigation = ({ onLinkClick }: NavigationProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.activeLink}` : css.link
        }
        to="/"
        onClick={onLinkClick}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.activeLink}` : css.link
          }
          to="/contacts"
          onClick={onLinkClick}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

