import { FC, useMemo } from "react";
import classes from "./IconsIngredientBlock.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const IconsIngredientBlock: FC = () => {
  const { ingredients, recipe } = useSelector((state: RootState) => state.recipes);

  const calories = useMemo(() => {
    return ingredients.reduce((a, b) => Math.round(a + (b.calories / 100) * +b.amount), 0);
  }, [ingredients]);

  const proteins = useMemo(() => {
    return ingredients.reduce((a, b) => Math.round(a + (b.proteins / 100) * +b.amount), 0);
  }, [ingredients]);

  const fats = useMemo(() => {
    return ingredients.reduce((a, b) => Math.round(a + (b.fats / 100) * +b.amount), 0);
  }, [ingredients]);
  const carbohydrates = useMemo(() => {
    return ingredients.reduce((a, b) => Math.round(a + (b.carbohydrates / 100) * +b.amount), 0);
  }, [ingredients]);

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
      <div className={classes.cooking__method}>
        <div className={classes.title}>
          <h1>Способ приготовления</h1>
        </div>
        <div className={classes.steps}>
          <p>{recipe.text}</p>
        </div>
      </div>
    </div>
  );
};

export default IconsIngredientBlock;
