import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfoRecipe from "../../components/InfoRecipe/InfoRecipe";
import { fetchRecipeById } from "../../redux/slices/recipeSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import classes from "./InfoRecipePage.module.css";
const InfoRecipePage: FC = () => {
  const dispatch = useAppDispatch();
  const { recipe, loading } = useSelector((state: RootState) => state.recipes);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>{recipe.title}</h1>
      </div>
      <InfoRecipe recipe={recipe} />
    </div>
  );
};

export default InfoRecipePage;
