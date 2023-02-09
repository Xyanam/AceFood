import React, { FC, useEffect, useState } from "react";
import qs from "qs";
import classes from "./Sidebar.module.css";
import Select from "react-select";
import PinkButton from "../UI/PinkButton/PinkButton";
import axios from "axios";
import { useAppDispatch } from "../../redux/store";
import { fetchRecipes, setRecipes } from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";

type TOptionsCategory = {
  id: string;
  category: string;
};

type TOptionsKitchen = {
  id: string;
  kitchen: string;
};

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [optionsCategoryState, setOptionsCategoryState] = useState<TOptionsCategory[]>([]);
  const [optionsKitchenState, setOptionsKitchenState] = useState<TOptionsKitchen[]>([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [kitchenValue, setKitchenValue] = useState("");

  useEffect(() => {
    axios
      .get<TOptionsCategory[]>("http://127.0.0.1:8000/api/category")
      .then((response) => setOptionsCategoryState(response.data));

    axios
      .get<TOptionsKitchen[]>("http://127.0.0.1:8000/api/kitchen")
      .then((resp) => setOptionsKitchenState(resp.data));
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

    axios
      .get(`http://127.0.0.1:8000/api/recipes?kitchen=${kitchenValue}&?category=${categoryValue}`)
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
