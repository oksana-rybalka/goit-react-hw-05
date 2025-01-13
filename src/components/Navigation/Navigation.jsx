import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Kinoshka
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Click here
      </NavLink>
    </nav>
  );
};

export default Navigation;
