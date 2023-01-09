import React, { FC } from "react";
import classes from "./BlockFood.module.css";
import { recipe } from "../../types/TRecipe";

type BlockFoodProps = {
  recipe: recipe;
};

const BlockFood: FC<BlockFoodProps> = ({ recipe }) => {
  return (
    <div className={classes.block}>
      <img src={recipe.image} alt="food" className={classes.img} />
      <div className={classes.infoFood}>
        <div className={classes.titleBlock}>
          <h1 className={classes.title}>{recipe.title}</h1>
        </div>
        <div>
          <span className={classes.likes}>{recipe.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default BlockFood;
