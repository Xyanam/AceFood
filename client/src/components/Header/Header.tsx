import { FC, useEffect, useRef, useState } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/acefood.gif";
import arrow from "../../assets/img/arrow.svg";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/slices/userSlice";

const Header: FC = () => {
  const { isAuth } = useAuth();
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [activeArrow, setActiveArrow] = useState(false);

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
            <Link to="/addrecipe">Добавить рецепт</Link>
          </li>
          <li className={classes.navItem}>
            <Link to="/">Помощь</Link>
          </li>
        </ul>
        <div className={classes.auth}>
          {!loading ? (
            isAuth ? (
              <div className={classes.user} onClick={() => setActiveArrow(!activeArrow)}>
                <div className={classes.avatar}>
                  <img src={`data:image/png;base64,${user.image}`} alt="" />
                </div>
                <p className={classes.login}>{user.name}</p>
                <img src={arrow} className={!activeArrow ? classes.arrowActive : classes.arrow} />
                {activeArrow && (
                  <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
                    <Link to="/recipes" className={classes.popupItem}>
                      Профиль
                    </Link>
                    <p
                      className={classes.popupItem}
                      onClick={() => {
                        dispatch(logoutUser());
                        setActiveArrow(false);
                      }}>
                      Выйти
                    </p>
                  </div>
                )}
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
            )
          ) : (
            <p>Загрузка</p>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
