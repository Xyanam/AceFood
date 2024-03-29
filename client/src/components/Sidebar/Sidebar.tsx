import React, { FC, useEffect, useState } from "react";
import qs from "qs";
import classes from "./Sidebar.module.css";
import Select from "react-select";
import PinkButton from "../UI/PinkButton/PinkButton";
import { useAppDispatch } from "../../redux/store";
import { fetchRecipes, setRecipes } from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../http/axios-client";

type TSelectOptions = {
  label: string;
  value: number;
};

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [optionsCategory, setOptionsCategory] = useState<TSelectOptions[]>([
    { value: 0, label: "Нет" },
  ]);
  const [optionsKitchen, setOptionsKitchen] = useState<TSelectOptions[]>([
    { value: 0, label: "Нет" },
  ]);

  const [categoryValue, setCategoryValue] = useState<Number>(0);
  const [kitchenValue, setKitchenValue] = useState<Number>(0);
  const [minCookingTime, setminCookingTime] = useState("");
  const [maxCookingTime, setmaxCookingTime] = useState("");

  useEffect(() => {
    axiosClient
      .get<TSelectOptions[]>("/category")
      .then((response) => setOptionsCategory((prev) => [...prev, ...response.data]));
    axiosClient
      .get<TSelectOptions[]>("/kitchen")
      .then((resp) => setOptionsKitchen((prev) => [...prev, ...resp.data]));
  }, []);

  const onSubmitFilter = () => {
    const queryString = qs.stringify({
      kitchen: kitchenValue,
      category: categoryValue,
      minCookingTime,
      maxCookingTime,
    });
    navigate(`?${queryString}`);

    axiosClient
      .get(
        `/recipes?kitchen=${kitchenValue}&category=${categoryValue}&minCookingTime=${minCookingTime}&maxCookingTime=${maxCookingTime}`
      )
      .then((response) => {
        dispatch(setRecipes(response.data));
      });
  };

  const resetFilter = () => {
    navigate("/recipes");
    setminCookingTime("");
    setmaxCookingTime("");
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
          <p className={classes.title}>Время готовки</p>
          <div className={classes.inputsCalories}>
            <input
              type="text"
              placeholder="От"
              className={classes.calories}
              value={minCookingTime}
              onChange={(e) => setminCookingTime(e.target.value)}
            />
            <input
              type="text"
              placeholder="До"
              className={classes.calories}
              value={maxCookingTime}
              onChange={(e) => setmaxCookingTime(e.target.value)}
            />
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
