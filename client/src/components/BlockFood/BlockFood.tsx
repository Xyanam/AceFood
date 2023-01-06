import React, { FC } from "react";
import classes from "./BlockFood.module.css";
import eda from "../../assets/img/eda.png";

const BlockFood: FC = () => {
  return (
    <div className={classes.block}>
      <img src={eda} alt="food" className={classes.img} />
      <div className={classes.infoFood}>
        <div className={classes.titleBlock}>
          <h1 className={classes.title}>Спагетти карбонара с красным луком</h1>
        </div>
        <div>
          <span className={classes.likes}>120</span>
        </div>
      </div>
    </div>
  );
};

export default BlockFood;
