import { FC, useMemo, useState } from "react";
import classes from "./IconsIngredientBlock.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Ingredient } from "../../../types/TIngredient";
import { recipe } from "../../../types/TRecipe";
import carbohydratesIcon from "../../../assets/img/carbo.svg";
import fatsIcon from "../../../assets/img/fats.svg";
import proteinsIcon from "../../../assets/img/proteins.svg";
import caloriesIcon from "../../../assets/img/calories.svg";
import timeIcon from "../../../assets/img/time.svg";
import kitchenIcon from "../../../assets/img/kitchen.png";
import { cn } from "@/lib/utils";

const IconsIngredientBlock: FC = () => {
  const { ingredients, recipe } = useSelector((state: RootState) => state.recipes);

  const [portion, setPortion] = useState(recipe.portion);
  const ingredientsRecipe = ingredients.map((ingredient, index) => {
    const amountPerPortion = +ingredient.amount / recipe.portion;
    const newAmount = Math.round(amountPerPortion * portion * 2) / 2;

    return (
      <p key={index}>
        {ingredient.ingredient}: {ingredient.measure !== "По вкусу" && newAmount}{" "}
        {ingredient.measure}
      </p>
    );
  });

  const calculateTotal = (ingredients: Ingredient[], recipe: recipe[], property: string) => {
    const weightPerPortion = recipe.weight / recipe.portion;
    const weightAllIngredients = 100 * ingredients.length;

    return useMemo(() => {
      return ingredients
        .reduce((total, ingredient) => {
          const value = ingredient[property];
          return total + (value * weightPerPortion) / weightAllIngredients;
        }, 0)
        .toFixed(1);
    }, [ingredients, recipe, property, weightPerPortion, weightAllIngredients]);
  };

  const decrementPortion = () => {
    if (portion > 1) {
      setPortion((prev) => prev - 1);
    }
  };
  const incrementPortion = () => {
    if (portion < 12) {
      setPortion((prev) => prev + 1);
    }
  };

  return (
    <div className={classes.iconsIngredientBlock}>
      <div className={classes.icons}>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src={timeIcon} alt="time" />
          </div>
          <p>{recipe.cookingTime} минут</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src={kitchenIcon} alt="kitchen" className={classes.time} />
          </div>
          <p>{recipe.kitchen}</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src={proteinsIcon} alt="proteins" />
          </div>
          <p>{calculateTotal(ingredients, recipe, "proteins")} гр</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src={fatsIcon} alt="fats" />
          </div>
          <p>{calculateTotal(ingredients, recipe, "fats")} гр</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src={carbohydratesIcon} alt="carbohydrates" />
          </div>
          <p>{calculateTotal(ingredients, recipe, "carbohydrates")} гр</p>
        </div>
        <div className={classes.iconItem}>
          <div className={classes.icon}>
            <img src={caloriesIcon} alt="calories" />
          </div>
          <p>{calculateTotal(ingredients, recipe, "calories")} ккал</p>
        </div>
      </div>
      <p className={classes.kbzu}>
        КБЖУ расчитано на 1 порцию (~{(+recipe.weight / recipe.portion).toFixed(1)} гр)
      </p>
      <div className={classes.ingredients}>{ingredientsRecipe}</div>
      <div className={classes.calculatePortion}>
        <p style={{ fontSize: "12px" }}>Порции</p>
        <div className={classes.calculate} onClick={decrementPortion}>
          -
        </div>
        <div className={classes.portion}>{portion}</div>
        <div className={classes.calculate} onClick={incrementPortion}>
          +
        </div>
      </div>
      <div className={classes.cooking__method}>
        <div className={classes.title}>
          <h1>Способ приготовления</h1>
        </div>
        <div className={cn(classes.steps, "mt-10")}>
          <p>{recipe.text}</p>
        </div>
      </div>
    </div>
  );
};

export default IconsIngredientBlock;
