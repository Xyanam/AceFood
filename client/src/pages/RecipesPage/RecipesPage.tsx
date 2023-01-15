import React, { FC, useEffect } from "react";
import classes from "./RecipesPage.module.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { recipe } from "../../types/TRecipe";
import { fetchRecipes } from "../../redux/slices/recipeSlice";
import BlockFood from "../../components/BlockFood/BlockFood";
import Sidebar from "../../components/Sidebar/Sidebar";

const RecipesPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const { recipes, loading } = useSelector((state: RootState) => state.recipes);
  return (
    <div className={classes.wrapper}>
      <div className={classes.headerBlock}>
        <h1 className={classes.title}>Все рецепты</h1>
        <div className={classes.searchBlock}>
          <input
            type="text"
            className={classes.searchInput}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className={classes.container}>
        <Sidebar />
        <div className={classes.recipes}>
          {loading ? (
            <h1>Загрузка...</h1>
          ) : (
            recipes.map((recipe: recipe) => (
              <BlockFood key={recipe.recipe_id} recipe={recipe} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
