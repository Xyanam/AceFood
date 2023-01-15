import React, { FC, useState } from "react";
import classes from "./LoginPage.module.css";
import foodLeft from "../../assets/img/loginfoodleft.png";
import foodRight from "../../assets/img/loginfoodright.png";
import Input from "../../components/UI/Input/Input";
import PinkButton from "../../components/UI/PinkButton/PinkButton";
import { Link } from "react-router-dom";

const LoginPage: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={classes.container}>
      <div className={classes.images}>
        <img src={foodLeft} alt="food" className={classes.img} />
        <img src={foodRight} alt="food" className={classes.img} />
      </div>
      <div className={classes.formBlock}>
        <h1>Вход</h1>
        <form className={classes.form}>
          <div className={classes.formItem}>
            <Input
              placeholder="Введите логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <Input
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <PinkButton width="350px" height="50px" fontSize="20px">
              Войти
            </PinkButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
