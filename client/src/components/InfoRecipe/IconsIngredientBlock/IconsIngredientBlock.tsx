import { FC } from "react";
import classes from "./IconsIngredientBlock.module.css";
import { recipe } from "../../../types/TRecipe";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

type IconsIngredientBlockProps = {
  recipe: recipe;
};

const IconsIngredientBlock: FC<IconsIngredientBlockProps> = ({ recipe }) => {
  const { ingredients } = useSelector((state: RootState) => state.recipes);

  const calories = ingredients.reduce((a, b) => {
    return Math.round((a + b.calories * +b.amount) / 100);
  }, 0);

  const proteins = ingredients.reduce((a, b) => {
    return Math.round((a + b.proteins * +b.amount) / 100);
  }, 0);

  const fats = ingredients.reduce((a, b) => {
    return Math.round((a + b.fats * +b.amount) / 100);
  }, 0);
  const carbohydrates = ingredients.reduce((a, b) => {
    return Math.round((a + b.carbohydrates * +b.amount) / 100);
  }, 0);

  return (
    <div className={classes.iconsIngredientBlock}>
      <div className={classes.icons}>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src="" alt="" />
          </div>
          <p>да</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src="" alt="" />
          </div>
          <p>{recipe.kitchen}</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src="" alt="" />
          </div>
          <p>{proteins} гр</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src="" alt="" />
          </div>
          <p>{fats} гр</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src="" alt="" />
          </div>
          <p>{carbohydrates} гр</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src="" alt="" />
          </div>
          <p>{calories} ккал</p>
        </div>
      </div>
      <div className={classes.ingredients}>
        {ingredients.map((ingredient, index) => (
          <p key={index}>
            {ingredient.ingredient}: {ingredient.amount} {ingredient.measure}
          </p>
        ))}
      </div>
    </div>
  );
};

export default IconsIngredientBlock;
