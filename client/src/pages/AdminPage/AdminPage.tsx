import { useEffect, useState } from "react";
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
import { selectUser } from "../../redux/slices/userSlice";
import Loader from "../../components/Loader/Loader";
import { Ban, CheckIcon, Heading1, TrashIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import axiosClient from "@/http/axios-client";

const AdminPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useSelector(selectUser);
  const { recipes, loading } = useSelector((state: RootState) => state.recipes);
  const [pendingRecipes, setPendingRecipes] = useState([]);

  const reverseRecipes = [...recipes].reverse();

  useEffect(() => {
    if (!isAuth || user.role !== "admin") {
      navigate("/");
    }

    dispatch(fetchRecipesForAdmin());
    axiosClient.get("/pendingRecipes").then((resp) => setPendingRecipes(resp.data));
  }, [isAuth]);

  if (loading) return <h1 className="mx-auto mt-10 text-2xl">Загрузка...</h1>;

  const handleAcceptRecipe = async (data) => {
    dispatch(updateRecipeStatus(data)).then(() => {
      dispatch(fetchRecipesForAdmin());
      axiosClient.get("/pendingRecipes").then((resp) => setPendingRecipes(resp.data));
    });
  };

  const handleDeleteRecipe = async (data) => {
    await dispatch(deleteRecipe(data));
    await dispatch(fetchRecipesForAdmin());
    axiosClient.get("/pendingRecipes").then((resp) => setPendingRecipes(resp.data));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Tabs defaultValue="recipes" className="mt-12 justify-center items-center">
          <TabsList>
            <TabsTrigger value="recipes">Все рецепты</TabsTrigger>
            <TabsTrigger value="moderate" className="relative">
              На модерации{" "}
              {pendingRecipes.length > 0 && (
                <span className="bg-red-500 w-5 h-5 rounded-full text-white flex justify-center items-center absolute -top-1 -right-2">
                  {pendingRecipes.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recipes" className={cn(classes.recipes, "w-full")}>
            {reverseRecipes.map((recipe) => (
              <div className={classes.recipe}>
                <BlockFood recipe={recipe} key={recipe.id} />
                <div className={classes.buttons}>
                  {recipe.moderated === "approved" && (
                    <div>
                      <button
                        className={classes.cancel}
                        onClick={() => handleDeleteRecipe({ recipeId: recipe.id })}>
                        <TrashIcon className={classes.trashIcon} /> Удалить
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="moderate" className="flex justify-start flex-wrap items-center">
            {pendingRecipes.length ? (
              pendingRecipes?.map((recipe) => (
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
                          Одобрить <CheckIcon className={classes.trashIcon} />
                        </button>
                        <button
                          className={classes.cancel}
                          onClick={() => handleDeleteRecipe({ recipeId: recipe.id })}>
                          Отклонить
                          <Ban className={classes.trashIcon} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-gray-600 text-xl">Рецептов на модерации нет!</h1>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
