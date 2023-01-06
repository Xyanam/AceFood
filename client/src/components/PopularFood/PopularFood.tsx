import React, { FC } from "react";
import BlockFood from "../BlockFood/BlockFood";
import classes from "./PopularFood.module.css";
import eda from "../../assets/img/eda.png";

const PopularFood: FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.food}>
        <BlockFood />
        <BlockFood />
        <BlockFood />
        <BlockFood />
      </div>
    </div>
  );
};

export default PopularFood;
