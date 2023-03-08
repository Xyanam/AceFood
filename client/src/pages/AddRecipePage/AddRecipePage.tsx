import { FC, useEffect, useState } from "react";
import Select, { CSSObjectWithLabel } from "react-select";
import axiosClient from "../../http/axios-client";
import classes from "./AddRecipePage.module.css";

type TOptionsCategory = {
  id: number;
  category: string;
};

type TOptionsKitchen = {
  id: number;
  kitchen: string;
};

type TSelectOptions = {
  label: string;
  value: string;
};

const AddRecipePage: FC = () => {
  const stylesSelect = {
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      width: "200px",
      "&:hover": { borderColor: "gray" },
      border: "1px solid lightgray",
      boxShadow: "none",
      borderRadius: "10px",
    }),
  };

  const [optionsCategoryState, setOptionsCategoryState] = useState<TOptionsCategory[]>([
    { id: 0, category: "Нет" },
  ]);
  const [optionsKitchenState, setOptionsKitchenState] = useState<TOptionsKitchen[]>([
    { id: 0, kitchen: "Нет" },
  ]);

  const [categoryValue, setCategoryValue] = useState<Number>(0);
  const [kitchenValue, setKitchenValue] = useState<Number>(0);
  const [selectIngredients, setSelectValues] = useState(Array(3).fill(null));
  const [selectCountIngredients, setSelectCountIngredients] = useState(1);

  const selectIngredientsChange = (index: number) => (value: TSelectOptions) => {
    const newValues = [...selectIngredients];
    newValues[index] = value;
    setSelectValues(newValues);
  };

  const selectIngredientsOptions = [
    { value: "1", label: "test1" },
    { value: "12", label: "test12" },
  ];

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

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <h1>
          Поделитесь вашим
          <br /> любимым рецептом
        </h1>
      </div>
      <div className={classes.container}>
        <form className={classes.form}>
          <div className={classes.formItem}>
            <p>1. Введите название блюда</p>
            <input type="text" placeholder="Название блюда" />
          </div>
          <div className={classes.formItem}>
            <p>2. Выберите кухню и категорию</p>
            <div className={classes.formSelect}>
              <Select
                styles={stylesSelect}
                placeholder="Кухня"
                options={optionsKitchen}
                onChange={(e) => {
                  e !== null && setKitchenValue(e.value);
                }}
              />
              <Select
                styles={stylesSelect}
                placeholder="Категория"
                options={optionsCategory}
                onChange={(e) => {
                  e !== null && setCategoryValue(e.value);
                }}
              />
            </div>
          </div>
          <div className={classes.formItem}>
            <p>
              3. Укажите время на приготовление
              <br /> вашего блюда <br /> (в минутах)
            </p>
            <input type="number" placeholder="Минут(А)(Ы)" />
          </div>
          <div className={classes.formItem}>
            <p>4. Выберите ингредиенты</p>
            <>
              {selectIngredients.map((_, index) => (
                <div className={classes.ingredientsSelect}>
                  <Select
                    value={selectIngredients[index]}
                    onChange={selectIngredientsChange(index)}
                    options={optionsCategory}
                  />
                  <Select
                    value={selectIngredients[index]}
                    onChange={selectIngredientsChange(index)}
                    options={selectIngredientsOptions}
                  />
                </div>
              ))}
            </>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
