import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentsBlock from "../../components/CommentsBlock/CommentsBlock";
import InfoRecipe from "../../components/InfoRecipe/InfoRecipe";
import { fetchIngredientsByRecipe, fetchRecipeById } from "../../redux/slices/recipeSlice";
import { fetchCommentsByRecipe } from "../../redux/slices/commentsSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import classes from "./InfoRecipePage.module.css";
const InfoRecipePage: FC = () => {
  const dispatch = useAppDispatch();
  const { recipe, loading } = useSelector((state: RootState) => state.recipes);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
      dispatch(fetchIngredientsByRecipe(id));
      dispatch(fetchCommentsByRecipe(id));
    }
  }, []);
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {loading ? (
          <h1>Загразка...</h1>
        ) : (
          <>
            <div className={classes.title}>
              <h1>{recipe.title}</h1>
            </div>
            <InfoRecipe recipe={recipe} />
            <CommentsBlock />
          </>
        )}
      </div>
    </div>
  );
};

export default InfoRecipePage;
