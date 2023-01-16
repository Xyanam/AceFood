import React, { FC, useEffect, useState } from "react";
import classes from "./Sidebar.module.css";
import Select from "react-select";
import PinkButton from "../UI/PinkButton/PinkButton";
import axios from "axios";

type TOptionsCategory = {
  category_id: string;
  category: string;
};

const Sidebar: FC = () => {
  const [optionsCategoryState, setOptionsCategoryState] = useState<
    TOptionsCategory[]
  >([]);

  const optionsCategory = optionsCategoryState.map((option) => ({
    label: option.category,
    value: option.category_id,
  }));

  useEffect(() => {
    axios
      .get<TOptionsCategory[]>("http://acefood/acefood.ru/category")
      .then((response) => setOptionsCategoryState(response.data));
  }, []);

  const optionsKitchen = [
    { value: "Узбекская", label: "Узбекская" },
    { value: "Японская", label: "Японская" },
    { value: "Китайская", label: "Китайская" },
    { value: "Грузинская", label: "Грузинская" },
  ];
  return (
    <div className={classes.sidebar}>
      <div className={classes.options}>
        <div className={classes.optionItem}>
          <p className={classes.title}>Кухня</p>
          <Select
            options={optionsKitchen}
            className={classes.select}
            placeholder="Выберите кухню"
          />
        </div>
        <div className={classes.optionItem}>
          <p className={classes.title}>Категория</p>
          <Select
            options={optionsCategory}
            className={classes.select}
            placeholder="Выберите категорию"
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
