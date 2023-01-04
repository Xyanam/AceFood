import React, { FC } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
const Header: FC = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.logo}>
          <h1>
            Ace
            <br />
            Food
          </h1>
        </div>
        <div className={classes.navigation}>
          <div className={classes.navItem}>
            <Link to="/">Рецепты</Link>
          </div>
          <div className={classes.navItem}>
            <Link to="/">Добавить рецепт</Link>
          </div>
          <div className={classes.navItem}>
            <Link to="/">Авторы</Link>
          </div>
          <div className={classes.navItem}>
            <Link to="/">Помощь</Link>
          </div>
        </div>
        <div className={classes.auth}>
          <div className={classes.authBtn}>
            <p>Вход</p>
          </div>
          <div className={classes.registerBtn}>
            <p>Регистрация</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
