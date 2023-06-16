import { useEffect } from "react";
import classes from "./AdminPage.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  deleteRecipe,
  fetchRecipesForAdmin,
  updateRecipeStatus,
} from "../../redux/slices/recipeSlice";
import BlockFood from "../../components/BlockFood/BlockFood";

const AdminPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { recipes, loading } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    if (!isAuth && user.role !== "admin") {
      navigate("/");
    }

    dispatch(fetchRecipesForAdmin());
  }, [isAuth]);

  if (loading) {
    return <h1>Загразка...</h1>;
  }

  const handleAcceptRecipe = (data) => {
    dispatch(updateRecipeStatus(data));
    dispatch(fetchRecipesForAdmin());
  };

  const handleDeleteRecipe = (data) => {
    dispatch(deleteRecipe(data));
    dispatch(fetchRecipesForAdmin());
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Админ панель</h2>
        </div>
        <div className={classes.recipes}>
          {recipes.map((recipe) => (
            <div className={classes.recipe}>
              {recipe.moderated === "pending" && <span>На модерации</span>}
              <BlockFood recipe={recipe} key={recipe.id} />
              <div className={classes.buttons}>
                {recipe.moderated === "pending" && (
                  <>
                    <button
                      className={classes.accept}
                      onClick={() =>
                        handleAcceptRecipe({
                          status: "approved",
                          recipeId: recipe.id,
                        })
                      }>
                      Одобрить
                    </button>
                    <button
                      className={classes.cancel}
                      onClick={() => handleDeleteRecipe({ recipeId: recipe.id })}>
                      Отклонить
                    </button>
                  </>
                )}
                {recipe.moderated === "approved" && (
                  <>
                    <button
                      className={classes.cancel}
                      onClick={() => handleDeleteRecipe({ recipeId: recipe.id })}>
                      Удалить
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
