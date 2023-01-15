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
        <div className={classes.navigation}>
          <div className={classes.navItem}>
            <Link to="/recipes">Рецепты</Link>
          </div>
          <div className={classes.navItem}>
            <Link to="/">Добавить рецепт</Link>
          </div>
          <div className={classes.navItem}>
            <Link to="/">Помощь</Link>
          </div>
        </div>
        <div className={classes.auth}>
          <Link to="/login" className={classes.authBtn}>
            <p>Вход</p>
          </Link>
          <div className={classes.registerBtn}>
            <p>Регистрация</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
