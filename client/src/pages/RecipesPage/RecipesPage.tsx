import React, { FC, useEffect, useState } from "react";
import classes from "./RecipesPage.module.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { recipe } from "../../types/TRecipe";
import { fetchRecipes, setRecipes } from "../../redux/slices/recipeSlice";
import BlockFood from "../../components/BlockFood/BlockFood";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import qs from "qs";

const RecipesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { recipes, loading } = useSelector((state: RootState) => state.recipes);

  const [searchValue, setSearchValue] = useState("");
  const [loader, setLoader] = useState(false);

  const queryParams = qs.parse(window.location.search.substring(1));

  const kitchen = queryParams.kitchen === "" ? "" : `?kitchen=${queryParams.kitchen}`;
  const category =
    queryParams.category === ""
      ? ""
      : kitchen === ""
      ? `?category=${queryParams.category}`
      : `&category=${queryParams.category}`;

  useEffect(() => {
    setLoader(true);
    if (window.location.search) {
      axios.get(`http://127.0.0.1:8000/api/recipes${kitchen}${category}`).then((response) => {
        dispatch(setRecipes(response.data));
        setLoader(false);
      });
    } else {
      const search = searchValue === "" ? "" : `?search=${searchValue}`;
      axios.get(`http://127.0.0.1:8000/api/recipes${search}`).then((resp) => {
        dispatch(setRecipes(resp.data));
        setLoader(false);
      });
    }
  }, [searchValue, dispatch, kitchen, category]);

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8000/api/recipes?search=${searchValue}`)
  //     .then((resp) => dispatch(setRecipes(resp.data)));
  // }, [searchValue, dispatch]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.headerBlock}>
        <h1 className={classes.title}>Все рецепты</h1>
        <div className={classes.searchBlock}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={classes.searchInput}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className={classes.container}>
        <Sidebar />
        <div className={classes.recipes}>
          {loading || loader ? (
            <h1>Загрузка...</h1>
          ) : (
            recipes.map((recipe: recipe) => <BlockFood key={recipe.id} recipe={recipe} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
