import { FC, useEffect, useState } from "react";
import Select, { CSSObjectWithLabel } from "react-select";
import axiosClient from "../../http/axios-client";
import classes from "./AddRecipePage.module.css";

type TSelectOptions = {
  label: string;
  value: number;
};

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

const AddRecipePage: FC = () => {
  // Options select
  const [optionsCategory, setOptionsCategory] = useState<TSelectOptions[]>([]);
  const [optionsKitchen, setOptionsKitchen] = useState<TSelectOptions[]>([]);
  const [selectIngredientsOptions, setSelectIngredientsOptions] = useState<TSelectOptions[]>([]);
  const [selectMeasuresOptions, setSelectMeasuresOptions] = useState<TSelectOptions[]>([]);

  // Value select
  const [categoryValue, setCategoryValue] = useState<Number>(0);
  const [kitchenValue, setKitchenValue] = useState<Number>(0);
  const [selectCountIngredients, setSelectCountIngredients] = useState(2);
  const [selectIngredients, setSelectIngredients] = useState(
    Array(selectCountIngredients).fill(null)
  );
  const [selectMeasure, setSelectMeasure] = useState(Array(selectCountIngredients).fill(null));

  // Inputs value
  const [searchIngredient, setSearchIngredient] = useState("");
  const [amountValue, setAmountValue] = useState<string[]>([]);
  const [titleRecipe, setTitleRecipe] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const list = [...amountValue];
    list[index] = value;
    setAmountValue(list);
  };

  const selectIngredientsChange = (index: number) => (value: TSelectOptions) => {
    const newValues = [...selectIngredients];
    newValues[index] = value;
    setSelectIngredients(newValues);
  };

  const selectMeasureChange = (index: number) => (value: TSelectOptions) => {
    const newValues = [...selectMeasure];
    newValues[index] = value;
    setSelectMeasure(newValues);
  };

  const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectIngredients([...selectIngredients, null]);
    setSelectCountIngredients(selectCountIngredients + 1);
  };

  const handleRemoveIngredient = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const ingredients = [...selectIngredients];
    ingredients.splice(index, 1);
    setSelectIngredients(ingredients);
    setSelectCountIngredients(selectCountIngredients - 1);
  };

  const sendData = () => {
    const recipeData = {
      recipeName: titleRecipe,
      kitchen: kitchenValue,
      category: categoryValue,
      cookingTime,
      ingredients: selectIngredients.map((ingredient, index) => ({
        ingredient_id: ingredient.value,
        amount: amountValue[index],
        measure: selectMeasure[index].value,
      })),
    };
    console.log(recipeData);
  };

  useEffect(() => {
    axiosClient
      .get<TSelectOptions[]>("/category")
      .then((response) => setOptionsCategory((prev) => [...prev, ...response.data]));
    axiosClient
      .get<TSelectOptions[]>("/kitchen")
      .then((resp) => setOptionsKitchen((prev) => [...prev, ...resp.data]));
    axiosClient
      .get<TSelectOptions[]>("/measure")
      .then((response) => setSelectMeasuresOptions(response.data));
  }, []);

  useEffect(() => {
    axiosClient.get(`/ingredients?title=${searchIngredient}`).then((response) => {
      if (searchIngredient.length > 1) {
        setSelectIngredientsOptions(response.data);
      }
    });
  }, [searchIngredient]);

  return (
    <div className={classes.wrapper}>
      <button onClick={sendData}>SEND DATA</button>
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
            <input
              type="text"
              placeholder="Название блюда"
              className={classes.input}
              value={titleRecipe}
              onChange={(e) => setTitleRecipe(e.target.value)}
            />
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
            <input
              type="number"
              placeholder="Минут(А)(Ы)"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              className={classes.input}
            />
          </div>
          <div className={classes.formItem}>
            <p>4. Выберите ингредиенты</p>
            <>
              {selectIngredients.map((_, index) => (
                <div className={classes.ingredientsSelect} key={index}>
                  <Select
                    styles={stylesSelect}
                    value={selectIngredients[index]}
                    onChange={selectIngredientsChange(index)}
                    options={selectIngredientsOptions}
                    onInputChange={(e) => setSearchIngredient(e)}
                    placeholder="Укажите ингредиент"
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue ? "Не найдено" : "Не найдено"
                    }
                  />
                  <input
                    type="number"
                    className={classes.ingredientInput}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <Select
                    styles={stylesSelect}
                    value={selectMeasure[index]}
                    onChange={selectMeasureChange(index)}
                    options={selectMeasuresOptions}
                    placeholder="Ед. изм."
                  />
                  {selectCountIngredients > 2 && (
                    <button onClick={(e) => handleRemoveIngredient(e, index)}>Удалить</button>
                  )}
                </div>
              ))}
            </>
            <button onClick={handleAddIngredient}>Добавить ингредиент</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
