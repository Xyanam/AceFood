import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/slices/recipeSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { recipe } from "../../types/TRecipe";
import BlockFood from "../BlockFood/BlockFood";
import classes from "./PopularFood.module.css";
import { cn } from "@/lib/utils";

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
          recipes.slice(0, 5).map((recipe: recipe, index: number) => (
            <div
              key={recipe.id}
              className={cn(index % 2 === 0 ? "2xl:-mt-[100px]" : "2xl:mt-[100px]")}>
              <BlockFood recipe={recipe} />
            </div>
          ))
        )}
      </div>
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default PopularFood;
