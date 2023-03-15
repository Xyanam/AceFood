import { FC } from "react";
import { recipe } from "../../types/TRecipe";
import classes from "./InfoRecipe.module.css";
import IconsIngredientBlock from "./IconsIngredientBlock/IconsIngredientBlock";

type InfoRecipeProps = {
  recipe: recipe;
};

const InfoRecipe: FC<InfoRecipeProps> = ({ recipe }) => {
  return (
    <div className={classes.infoFood}>
      <div className={classes.imageBlock}>
        <div className={classes.image}>
          <img src={`data:image/png;base64,${recipe.recipeImage}`} alt="recipe image" />
        </div>
        <div className={classes.author}>
          <div className={classes.avatarAuthor}>
            <img src={`data:image/png;base64,${recipe.image}`} alt="" />
          </div>
          <div className={classes.infoAuthor}>
            <p>{recipe.name}</p>
            <p>Уровень: Бог кулинарии</p>
          </div>
        </div>
      </div>
      <IconsIngredientBlock />
    </div>
  );
};

export default InfoRecipe;
