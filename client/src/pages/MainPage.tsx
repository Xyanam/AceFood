import React, { FC } from "react";
import classes from "./MainPage.module.css";

const MainPage: FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <h1 className={classes.textBanner}>
          Разнообразные
          <br /> рецепты со <br /> всего мира
        </h1>
      </div>
      <h1 className={classes.title}>Популярные блюда</h1>
    </div>
  );
};

export default MainPage;
