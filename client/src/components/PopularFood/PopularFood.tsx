import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/slices/recipeSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { recipe } from "../../types/TRecipe";
import BlockFood from "../BlockFood/BlockFood";
import classes from "./PopularFood.module.css";

const PopularFood: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const { recipes, loading, error } = useSelector((state: RootState) => state.recipes);

  return (
    <div className={classes.container}>
      <div className={classes.food}>
        {loading ? (
          <h1>Загрузка...</h1>
        ) : (
          recipes.map((recipe: recipe) => <BlockFood key={recipe.id} recipe={recipe} />)
        )}
      </div>
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default PopularFood;
