import React, { FC } from "react";
import classes from "./BlockFood.module.css";
import { recipe } from "../../types/TRecipe";
import { Link } from "react-router-dom";
import userIcon from "../../assets/img/profile.svg";

type BlockFoodProps = {
  recipe: recipe;
};

const BlockFood: FC<BlockFoodProps> = ({ recipe }) => {
  return (
    <div className={classes.block}>
      <Link to={`/recipe/${recipe.id}`}>
        <img
          src={`data:image/png;base64,${recipe.recipeImage}`}
          alt="food"
          className={classes.img}
        />
        <div className={classes.infoFood}>
          <div className={classes.titleBlock}>
            <h1 className={classes.title}>{recipe.title}</h1>
          </div>
          <div className={classes.descFood}>
            <div className={classes.leftDesc}>
              <div className={classes.descItem}>
                <p>{recipe.name}</p>
              </div>
              <p>{recipe.cookingTime} минут</p>
            </div>
            <div className={classes.rightDesc}>
              <p>0 лайков</p>
              <p>{recipe.kitchen}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlockFood;
