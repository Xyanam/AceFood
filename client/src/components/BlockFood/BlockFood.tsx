import React, { FC } from "react";
import classes from "./BlockFood.module.css";
import { recipe } from "../../types/TRecipe";
import { Link } from "react-router-dom";

type BlockFoodProps = {
  recipe: recipe;
};

const BlockFood: FC<BlockFoodProps> = ({ recipe }) => {
  return (
    <div className={classes.block}>
      <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.image} alt="food" className={classes.img} />
        <div className={classes.infoFood}>
          <div className={classes.titleBlock}>
            <h1 className={classes.title}>{recipe.title}</h1>
          </div>
          <div className={classes.descFood}>
            <p>Автор: Алексей</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlockFood;
