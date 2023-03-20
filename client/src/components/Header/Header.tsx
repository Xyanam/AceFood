import { FC, useState } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/acefood.gif";
import arrow from "../../assets/img/arrow.svg";
import profileIcon from "../../assets/img/profile.svg";
import logoutIcon from "../../assets/img/logout.svg";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/slices/userSlice";

const Header: FC = () => {
  const { isAuth } = useAuth();
  const { user, loading, error } = useSelector((state: RootState) => state.user);
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
                  <img src={`data:image/png;base64,${user.image}`} alt="avatar" />
                </div>
                <p className={classes.login}>{user.name}</p>
                <img src={arrow} className={!activeArrow ? classes.arrowActive : classes.arrow} />
                {activeArrow && (
                  <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
                    <div className={classes.infoUser}>
                      <div className={classes.avatarUser}>
                        <img src={`data:image/png;base64,${user.image}`} alt="avatar" />
                      </div>
                      <div className={classes.userData}>
                        <p className={classes.name}>{user.name}</p>
                        <p className={classes.email}>{user.email}</p>
                      </div>
                    </div>
                    <div className={classes.popupItem}>
                      <img src={profileIcon} alt="profileIcon" />
                      <Link to="/recipes">Профиль</Link>
                    </div>
                    <div className={classes.popupItem}>
                      <img src={logoutIcon} alt="profileIcon" />
                      <p
                        onClick={() => {
                          dispatch(logoutUser());
                          setActiveArrow(false);
                        }}>
                        Выйти
                      </p>
                    </div>
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
