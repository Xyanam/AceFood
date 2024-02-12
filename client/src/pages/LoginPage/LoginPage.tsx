import React, { FC, useEffect, useState } from "react";
import classes from "./LoginPage.module.css";
import Input from "../../components/UI/Input/Input";
import PinkButton from "../../components/UI/PinkButton/PinkButton";
import { RootState, useAppDispatch } from "../../redux/store";
import { loginUser, selectUser } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector(selectUser);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      password,
    };
    dispatch(loginUser(data)).then((resp) => {
      if (resp.meta.requestStatus === "rejected") {
        return;
      } else {
        navigate("/recipes");
        toast.success("🍕Успешная авторизация!", {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
      }
    });
  };

  return (
    <div className={classes.container}>
      <h1>Вход</h1>
      <form className={classes.form} onSubmit={handleLogin}>
        <div className={classes.formItem}>
          <Input
            type="text"
            placeholder="Введите логин"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && error["name"] ? <p className={classes.error}>{error["name"][0]}</p> : ""}
        </div>
        <div className={classes.formItem}>
          <Input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && error["password"] ? <p className={classes.error}>{error["password"]}</p> : ""}
        </div>
        <div className={classes.formItem}>
          <PinkButton width="350px" height="50px" fontSize="20px">
            Войти
          </PinkButton>
        </div>
        <div className={classes.noAccount}>
          <p>У вас нет аккаунта?</p>
          <Link to="/register">Зарегистрируйтесь</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
