import { FC } from "react";
import classes from "./BlockFood.module.css";
import { recipe } from "../../types/TRecipe";
import { Link } from "react-router-dom";
import { ChefHat, Clock, Heart, UserIcon } from "lucide-react";

type BlockFoodProps = {
  recipe: recipe;
  style?: any;
};

const BlockFood: FC<BlockFoodProps> = ({ recipe, style }) => {
  return (
    <div className={classes.block} style={style}>
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
                <UserIcon className={classes.icon} />
                <p>{recipe.name}</p>
              </div>
              <div className={classes.descItem}>
                <Clock className={classes.icon} />
                <p>{recipe.cookingTime} минут</p>
              </div>
            </div>
            <div className={classes.rightDesc}>
              <div className={classes.descItem}>
                <Heart className={classes.icon} />
                <p>{recipe.like_count}</p>
              </div>
              <div>
                <div className={classes.descItem}>
                  <ChefHat className={classes.icon} />
                  <p>{recipe.kitchen}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlockFood;
