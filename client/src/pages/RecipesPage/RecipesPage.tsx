import { FC, useCallback, useEffect, useState } from "react";
import classes from "./RecipesPage.module.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { recipe } from "../../types/TRecipe";
import { setRecipes } from "../../redux/slices/recipeSlice";
import BlockFood from "../../components/BlockFood/BlockFood";
import Sidebar from "../../components/Sidebar/Sidebar";
import debounce from "lodash.debounce";

import qs from "qs";
import axiosClient from "../../http/axios-client";
import Skeleton from "../../components/SkeletonRecipe/SkeletonRecipe";
import { Frown } from "lucide-react";

const RecipesPage: FC = () => {
  const dispatch = useAppDispatch();

  const { recipes, loading, error } = useSelector((state: RootState) => state.recipes);
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);

  const queryParams = qs.parse(window.location.search.substring(1));

  const kitchen =
    queryParams.kitchen === "" || queryParams.kitchen === undefined
      ? ""
      : `kitchen=${queryParams.kitchen}`;
  const category =
    queryParams.category === "" || queryParams.category === undefined
      ? ""
      : `category=${queryParams.category}`;
  const search =
    queryParams.search === "" || inputValue === "" ? "" : `search=${queryParams.search}`;

  const debounceSearch = useCallback(
    debounce((e: string) => setSearchValue(e), 250),
    []
  );

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debounceSearch(e.target.value);
  };

  useEffect(() => {
    setLoader(true);
    if (window.location.search) {
      axiosClient.get(`/recipes?${search}&${kitchen}&${category}`).then((response) => {
        dispatch(setRecipes(response.data));
        setLoader(false);
      });
    } else {
      axiosClient.get(`/recipes?search=${searchValue}`).then((response) => {
        dispatch(setRecipes(response.data));
        setLoader(false);
      });
    }
  }, [searchValue, dispatch, kitchen, category]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.headerBlock}>
        <h1 className={classes.title}>Все рецепты</h1>
        <div className={classes.searchBlock}>
          <input
            type="text"
            value={inputValue}
            onChange={onChangeSearchInput}
            className={classes.searchInput}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className={classes.container}>
        <Sidebar />
        <div className={classes.recipes}>
          {error && <h1>{error}</h1>}
          {loading || loader
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : recipes.map((recipe: recipe) => <BlockFood key={recipe.id} recipe={recipe} />)}
          {!recipes.length && !loading && !loader && (
            <h1 style={{ marginLeft: "50px", opacity: 0.7 }} className="flex gap-2 mt-6 text-xl">
              Ничего не найдено <Frown />
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
