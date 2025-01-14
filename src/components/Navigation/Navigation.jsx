import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { MdLocalMovies } from "react-icons/md";
import { LuSearchCheck } from "react-icons/lu";

const Navigation = () => {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <nav className={s.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
            <span className={s.logo}>Kinoshka</span>
            <MdLocalMovies />
          </NavLink>

          <p className={s.headerText}>
            {" "}
            Looking for a movie?{" "}
            <NavLink
              to="/movies"
              className={({ isActive }) => (isActive ? s.activeLink : s.link)}
            >
              Click here
              <LuSearchCheck />
            </NavLink>
          </p>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
