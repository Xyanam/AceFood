import React, { FC } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/acefood.gif";
import logo2 from "../../assets/img/acefood2.gif";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/slices/userSlice";

const Header: FC = () => {
  const { isAuth } = useAuth();

  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to="/" className={classes.logo}>
          <img src={logo2} alt="logo" />
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
          {isAuth ? (
            <div className={classes.user}>
              <p>{user.name}</p>
              <button onClick={() => dispatch(logoutUser())}>Выйти</button>
            </div>
          ) : (
            <>
              <div className={classes.authBtn}>
                <Link to="/login">Вход</Link>
              </div>
              <div className={classes.registerBtn}>
                <Link to="/register">Регистрация</Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
