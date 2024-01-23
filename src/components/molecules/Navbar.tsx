import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../atoms/Logo";
import { logOut } from "../../utils/authentication";
import useAuth from "../../hooks/useAuth";
import styles from "../../styles/molecules/Navbar.module.scss";
import Button from "../atoms/Button";

type NavbarProps = {
  header: string;
};

const Navbar = (props: NavbarProps) => {
  const { auth } = useAuth();

  return (
    <nav className={styles["navbar"]}>
      {auth?.email ? (
        <>
          <h1>{props.header}</h1>
          <Button onClick={logOut}>Log out</Button>
        </>
      ) : (
        <>
          <Logo showName={true}/>
          <div className={styles["nav-elements"]}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
