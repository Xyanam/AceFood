import React, { FC, useState } from "react";
import classes from "./LoginPage.module.css";
import foodLeft from "../../assets/img/loginfoodleft.png";
import foodRight from "../../assets/img/loginfoodright.png";
import Input from "../../components/UI/Input/Input";
import PinkButton from "../../components/UI/PinkButton/PinkButton";
import { RootState, useAppDispatch } from "../../redux/store";
import { loginUser } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state: RootState) => state.user);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      password,
    };
    dispatch(loginUser(data));
  };

  return (
    <div className={classes.container}>
      <div className={classes.images}>
        <img src={foodLeft} alt="food" className={classes.img} />
        <img src={foodRight} alt="food" className={classes.img} />
      </div>
      <div className={classes.formBlock}>
        <h1>Вход</h1>
        <form className={classes.form} onSubmit={handleLogin}>
          <div className={classes.formItem}>
            <Input
              placeholder="Введите логин"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && error["name"] ? <p className={classes.error}>{error["name"][0]}</p> : ""}
          </div>
          <div className={classes.formItem}>
            <Input
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
