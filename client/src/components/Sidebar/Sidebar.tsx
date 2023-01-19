import React, { FC, useEffect, useState } from "react";
import classes from "./Sidebar.module.css";
import Select from "react-select";
import PinkButton from "../UI/PinkButton/PinkButton";
import axios from "axios";

type TOptionsCategory = {
  category_id: string;
  category: string;
};

type TOptionsKitchen = {
  kitchen_id: string;
  kitchen: string;
};

const Sidebar: FC = () => {
  const [optionsCategoryState, setOptionsCategoryState] = useState<TOptionsCategory[]>([]);
  const [optionsKitchenState, setOptionsKitchenState] = useState<TOptionsKitchen[]>([]);

  const [categoryValue, setCategoryValue] = useState("");
  const [kitchenValue, setKitchenValue] = useState("");

  useEffect(() => {
    axios
      .get<TOptionsCategory[]>("http://acefood/acefood.ru/category")
      .then((response) => setOptionsCategoryState(response.data));

    axios
      .get<TOptionsKitchen[]>("http://acefood/acefood.ru/kitchen")
      .then((resp) => setOptionsKitchenState(resp.data));
  }, []);

  const optionsCategory = optionsCategoryState.map((option) => ({
    label: option.category,
    value: option.category_id,
  }));

  const optionsKitchen = optionsKitchenState.map((kitchen) => ({
    label: kitchen.kitchen,
    value: kitchen.kitchen_id,
  }));

  return (
    <div className={classes.sidebar}>
      <div className={classes.options}>
        <div className={classes.optionItem}>
          <p className={classes.title}>Кухня</p>
          <Select
            options={optionsKitchen}
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
            options={optionsCategory}
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
        <PinkButton width="200px">Применить</PinkButton>
      </div>
    </div>
  );
};

export default Sidebar;
