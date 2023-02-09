import React, { FC } from "react";
import PopularFood from "../../components/PopularFood/PopularFood";
import classes from "./MainPage.module.css";

const MainPage: FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <h1 className={classes.textBanner}>
          Разнообразные
          <br /> рецепты <br /> со всего мира
        </h1>
      </div>
      <h1 className={classes.title}>Популярные блюда</h1>
      <PopularFood />
    </div>
  );
};

export default MainPage;
