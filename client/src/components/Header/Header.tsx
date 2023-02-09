import React, { FC } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/acefood.gif";

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to="/" className={classes.logo}>
          <img src={logo} alt="logo" />
        </Link>
        <ul className={classes.navigation}>
          <li className={classes.navItem}>
            <Link to="/recipes">Рецепты</Link>
          </li>
          <li className={classes.navItem}>
            <Link to="/">Добавить рецепт</Link>
          </li>
          <li className={classes.navItem}>
            <Link to="/">Помощь</Link>
          </li>
        </ul>
        <div className={classes.auth}>
          <div className={classes.authBtn}>
            <Link to="/login">Вход</Link>
          </div>
          <div className={classes.registerBtn}>
            <Link to="/login">Регистрация</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
