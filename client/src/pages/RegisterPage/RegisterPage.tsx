import React, { FC, useEffect, useState } from "react";
import classes from "./RegisterPage.module.css";
import foodLeft from "../../assets/img/loginfoodleft.png";
import foodRight from "../../assets/img/loginfoodright.png";
import Input from "../../components/UI/Input/Input";
import PinkButton from "../../components/UI/PinkButton/PinkButton";
import { RootState, useAppDispatch } from "../../redux/store";
import { registerUser } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useSelector((state: RootState) => state.user);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      password_confirmation,
    };
    dispatch(registerUser(data)).then((resp) => {
      if (resp.meta.requestStatus === "rejected") {
        return;
      } else {
        navigate("/");
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.formBlock}>
        <h1>Регистрация</h1>
        <form className={classes.form} onSubmit={handleRegister}>
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
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && error["email"] ? <p className={classes.error}>{error["email"][0]}</p> : ""}
          </div>
          <div className={classes.formItem}>
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && error["password"] ? (
              <p className={classes.error}>{error["password"][0]}</p>
            ) : (
              ""
            )}
          </div>
          <div className={classes.formItem}>
            <Input
              type="password"
              placeholder="Повторите пароль"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <PinkButton width="350px" height="50px" fontSize="20px">
              Зарегистрироваться
            </PinkButton>
          </div>
          <div className={classes.noAccount}>
            <p>У вас есть аккаунт?</p>
            <Link to="/login">Авторизируйтесь</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
