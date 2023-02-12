import React, { FC, useEffect, useState } from "react";
import qs from "qs";
import classes from "./Sidebar.module.css";
import Select from "react-select";
import PinkButton from "../UI/PinkButton/PinkButton";
import { useAppDispatch } from "../../redux/store";
import { fetchRecipes, setRecipes } from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../http/axios-client";

type TOptionsCategory = {
  id: number;
  category: string;
};

type TOptionsKitchen = {
  id: number;
  kitchen: string;
};

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [optionsCategoryState, setOptionsCategoryState] = useState<TOptionsCategory[]>([
    { id: 0, category: "Нет" },
  ]);
  const [optionsKitchenState, setOptionsKitchenState] = useState<TOptionsKitchen[]>([
    { id: 0, kitchen: "Нет" },
  ]);

  const [categoryValue, setCategoryValue] = useState<Number>();
  const [kitchenValue, setKitchenValue] = useState<Number>();

  useEffect(() => {
    axiosClient
      .get<TOptionsCategory[]>("/category")
      .then((response) => setOptionsCategoryState((prev) => [...prev, ...response.data]));
    axiosClient
      .get<TOptionsKitchen[]>("/kitchen")
      .then((resp) => setOptionsKitchenState((prev) => [...prev, ...resp.data]));
  }, []);

  const optionsCategory = optionsCategoryState.map((option) => ({
    label: option.category,
    value: option.id,
  }));

  const optionsKitchen = optionsKitchenState.map((kitchen) => ({
    label: kitchen.kitchen,
    value: kitchen.id,
  }));

  const onSubmitFilter = () => {
    const queryString = qs.stringify({
      kitchen: kitchenValue,
      category: categoryValue,
    });
    navigate(`?${queryString}`);

    axiosClient
      .get(`/recipes?kitchen=${kitchenValue}&category=${categoryValue}`)
      .then((response) => {
        dispatch(setRecipes(response.data));
      });
  };

  const resetFilter = () => {
    navigate("/recipes");
    dispatch(fetchRecipes());
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.options}>
        <div className={classes.optionItem}>
          <p className={classes.title}>Кухня</p>
          <Select
            styles={{
              control: (base) => ({
                ...base,
                "&:hover": { borderColor: "gray" },
                border: "1px solid lightgray",
                boxShadow: "none",
              }),
            }}
            options={optionsKitchen}
            noOptionsMessage={({ inputValue }) => (!inputValue ? "Не найдено" : "Не найдено")}
            className={classes.select}
            placeholder="Выберите кухню"
            onChange={(e) => {
              e !== null && setKitchenValue(e.value);
            }}
          />
        </div>
        <div className={classes.optionItem}>
          <p className={classes.title}>Категория</p>
          <Select
            styles={{
              control: (base) => ({
                ...base,
                "&:hover": { borderColor: "gray" },
                border: "1px solid lightgray",
                boxShadow: "none",
              }),
            }}
            options={optionsCategory}
            noOptionsMessage={({ inputValue }) => (!inputValue ? "Не найдено" : "Не найдено")}
            className={classes.select}
            placeholder="Выберите категорию"
            onChange={(e) => {
              e !== null && setCategoryValue(e.value);
            }}
          />
        </div>
        <div className={classes.optionItem}>
          <p className={classes.title}>Кол-во калорий</p>
          <div className={classes.inputsCalories}>
            <input type="text" className={classes.calories} />
            <input type="text" className={classes.calories} />
          </div>
          <div className={classes.inputRange}>
            <input type="range" className={classes.inputRange} />
          </div>
        </div>
        <PinkButton width="200px" onClick={onSubmitFilter}>
          Применить
        </PinkButton>
        <button onClick={resetFilter} className={classes.resetFilter}>
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
