import React, { FC } from "react";
import classes from "./Sidebar.module.css";
import Select from "react-select";
import PinkButton from "../UI/PinkButton/PinkButton";

const Sidebar: FC = () => {
  const optionsKitchen = [
    { value: "Узбекская", label: "Узбекская" },
    { value: "Японская", label: "Японская" },
    { value: "Китайская", label: "Китайская" },
    { value: "Грузинская", label: "Грузинская" },
  ];
  const optionsCategory = [
    { value: "Десерт", label: "Десерт" },
    { value: "Десерт", label: "Десерт" },
    { value: "Десерт", label: "Десерт" },
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
