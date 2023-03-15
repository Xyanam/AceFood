import { FC, useEffect, useState } from "react";
import Select, { CSSObjectWithLabel } from "react-select";
import axiosClient from "../../http/axios-client";
import classes from "./AddRecipePage.module.css";
import deleteIcon from "../../assets/img/delete.svg";
import PinkButton from "../../components/UI/PinkButton/PinkButton";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { addNewRecipe } from "../../redux/slices/recipeSlice";
import { INewRecipeData } from "../../types/INewRecipe";

type TSelectOptions = {
  label: string;
  value: number;
};

type ingredientRecipeData = {
  ingredient_id: number;
  amount: string;
  measure: number;
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
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  // Options select
  const [optionsCategory, setOptionsCategory] = useState<TSelectOptions[]>([]);
  const [optionsKitchen, setOptionsKitchen] = useState<TSelectOptions[]>([]);
  const [selectIngredientsOptions, setSelectIngredientsOptions] = useState<TSelectOptions[]>([]);
  const [selectMeasuresOptions, setSelectMeasuresOptions] = useState<TSelectOptions[]>([]);

  // Value select
  const [categoryValue, setCategoryValue] = useState<number>(0);
  const [kitchenValue, setKitchenValue] = useState<number>(0);
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
  const [cookingMethod, setCookingMethod] = useState("");
  const [portion, setPortion] = useState(1);
  const [image, setImage] = useState("");
  const [weight, setWeight] = useState("");

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

  const handleRemoveIngredient = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const ingredients = [...selectIngredients];
    ingredients.splice(index, 1);
    setSelectIngredients(ingredients);
    setSelectCountIngredients(selectCountIngredients - 1);
  };

  const decrementPortion = () => {
    if (portion > 1) {
      setPortion((prev) => prev - 1);
    }
  };
  const incrementPortion = () => {
    if (portion < 12) {
      setPortion((prev) => prev + 1);
    }
  };

  const handleAddNewRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    const ingredients: ingredientRecipeData[] = selectIngredients.map((ingredient, index) => ({
      ingredient_id: ingredient.value,
      amount: amountValue[index],
      measure: selectMeasure[index].value,
    }));
    formData.append("recipeName", titleRecipe);
    formData.append("kitchen", kitchenValue.toString());
    formData.append("category", categoryValue.toString());
    formData.append("user_id", user.id);
    formData.append("cookingTime", cookingTime);
    formData.append("cookingMethod", cookingMethod);
    formData.append("portion", portion.toString());
    formData.append("rating", "0");
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("recipePicture", image);
    formData.append("weight", weight);

    const recipeData: INewRecipeData = {
      recipeName: formData.get("recipeName") as string,
      kitchen: formData.get("kitchen") as string,
      category: formData.get("category") as string,
      user_id: formData.get("user_id") as string,
      cookingTime: formData.get("cookingTime") as string,
      cookingMethod: formData.get("cookingMethod") as string,
      portion: formData.get("portion") as string,
      rating: formData.get("rating") as string,
      ingredients: formData.get("ingredients") as string,
      recipePicture: formData.get("recipePicture") as File,
      weight: formData.get("weight") as string,
    };
    toast.promise(
      dispatch(addNewRecipe(recipeData)),
      {
        pending: "Загрузка...",
        success:
          'Спасибо что поделились рецептом! Сейчас он находится в обработке, как только его одобрят, вам придет оповещение"',
        error: "Ошибка добавления рецепта",
      },
      {
        autoClose: 10000,
        closeOnClick: true,
        style: {
          width: 450,
          height: 90,
          right: 50,
          textAlign: "center",
        },
      }
    );
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
      <div className={classes.title}>
        <h1>
          Поделитесь вашим
          <br /> любимым рецептом
        </h1>
      </div>
      <div className={classes.container}>
        <form
          className={classes.form}
          encType="multipart/form-data"
          onSubmit={(e) => handleAddNewRecipe(e)}>
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
                    <div
                      className={classes.deleteIcon}
                      onClick={(e) => handleRemoveIngredient(e, index)}>
                      <img src={deleteIcon} alt="delete" />
                    </div>
                  )}
                </div>
              ))}
            </>
            <button onClick={handleAddIngredient} className={classes.addIngredient}>
              Добавить ингредиент
            </button>
          </div>
          <div className={classes.calculatePortion}>
            <p style={{ fontSize: "16px", marginRight: "10px" }}>Порции</p>
            <div className={classes.calculate} onClick={decrementPortion}>
              -
            </div>
            <div className={classes.portion}>{portion}</div>
            <div className={classes.calculate} onClick={incrementPortion}>
              +
            </div>
          </div>
          <div className={classes.formItem}>
            <p>
              5. Вес готового блюда <br /> (в граммах)
            </p>
            <input
              className={classes.input}
              placeholder="Укажите вес в граммах"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className={classes.formItem}>
            <p>
              6. Опишите пошагово
              <br /> способ приготовления
            </p>
            <textarea
              className={classes.cookingMethod}
              value={cookingMethod}
              onChange={(e) => setCookingMethod(e.target.value)}
              placeholder="Ваше описание"
            />
          </div>
          <div className={classes.formItem}>
            <input type="file" onChange={(e: any) => setImage(e.target.files[0])} />
          </div>
          <div className={classes.formItem}>
            <PinkButton fontSize="16px" width="300px">
              Отправить на модерацию
            </PinkButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
