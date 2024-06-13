import React, { FC, useEffect, useState } from "react";
import classes from "./RegisterPage.module.css";
import Input from "../../components/ui/Input/Input";
import PinkButton from "../../components/ui/PinkButton/PinkButton";
import { useAppDispatch } from "../../redux/store";
import { registerUser, selectUser } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DataRegister } from "../../services/AuthService";
import { Checkbox } from "@/components/ui/checkbox";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useSelector(selectUser);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<string | Blob>("");
  const [isAccept, setIsAccept] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("profilePicture", image);

    const data: DataRegister = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      password_confirmation: formData.get("password_confirmation") as string,
      profilePicture: formData.get("profilePicture") as File,
      role: "user",
      banned: 0,
    };

    e.preventDefault();
    dispatch(registerUser(data)).then((resp) => {
      if (resp.meta.requestStatus === "rejected") {
        return;
      } else {
        navigate("/");
        toast.success("🌭Успешная регистрация!", {
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
      <div className={classes.formBlock}>
        <h1 className="text-2xl">Регистрация</h1>
        <form className={classes.form} onSubmit={handleRegister}>
          <div className={classes.formItem}>
            <Input
              type="text"
              placeholder="Введите логин"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-comforta placeholder:font-multiround"
            />
            {error && error["name"] ? <p className={classes.error}>{error["name"][0]}</p> : ""}
          </div>
          <div className={classes.formItem}>
            <Input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-comforta placeholder:font-multiround"
            />
            {error && error["email"] ? <p className={classes.error}>{error["email"][0]}</p> : ""}
          </div>
          <div className={classes.formItem}>
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-comforta placeholder:font-multiround"
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
              className="font-comforta placeholder:font-multiround"
            />
          </div>
          <div className={classes.formItem}>
            <input
              type="file"
              accept="image/*"
              onChange={(e: any) => setImage(e.target.files[0])}
              className={classes.imageInput}
            />
            {error && error["profilePicture"] ? (
              <p className={classes.error}>{error["profilePicture"][0]}</p>
            ) : (
              ""
            )}
          </div>
          <div className={classes.formItem}>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" checked={isAccept} onCheckedChange={setIsAccept} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-comforta leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Я подтверждаю согласие на обработку персональных данных и ознакомлением с
                  <a
                    href="https://jmp.sh/pAInPTIx"
                    target="_blank"
                    className="underline ml-1 font-medium">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
            </div>
          </div>
          <div className={classes.formItem}>
            <PinkButton width="350px" height="50px" fontSize="20px" disabled={!isAccept}>
              Зарегистрироваться
            </PinkButton>
          </div>
          <div className={classes.noAccount}>
            <p>У вас есть аккаунт?</p>
            <Link to="/login" className="underline">
              Авторизируйтесь
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
