import React, { FC, useEffect, useState } from "react";
import qs from "qs";
import classes from "./Sidebar.module.css";
import Select from "react-select";
import PinkButton from "../ui/PinkButton/PinkButton";
import { useAppDispatch } from "../../redux/store";
import { fetchRecipes, setRecipes } from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../http/axios-client";
import MultiRangeSlider from "multi-range-slider-react";
import { Input } from "../ui/input";

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
  const [minCookingTime, setminCookingTime] = useState(0);
  const [maxCookingTime, setmaxCookingTime] = useState(360);

  useEffect(() => {
    axiosClient
      .get<TSelectOptions[]>("/category")
      .then((response) => setOptionsCategory((prev) => [...prev, ...response.data]));
    axiosClient
      .get<TSelectOptions[]>("/kitchen")
      .then((resp) => setOptionsKitchen((prev) => [...prev, ...resp.data]));
  }, []);

  const handleCookingTimeChange = (e) => {
    setminCookingTime(e.minValue);
    setmaxCookingTime(e.maxValue);
  };

  const onSubmitFilter = () => {
    const params = {
      ...(kitchenValue.value !== undefined && { kitchen: kitchenValue.value }),
      ...(categoryValue.value !== undefined && { category: categoryValue.value }),
      minCookingTime,
      maxCookingTime,
    };

    const queryString = qs.stringify(params);

    navigate(`?${queryString}`);

    axiosClient.get(`/recipes?${queryString}`).then((response) => {
      dispatch(setRecipes(response.data));
    });
  };

  const resetFilter = () => {
    navigate("/recipes");
    setminCookingTime(0);
    setmaxCookingTime(360);
    setKitchenValue(0);
    setCategoryValue(0);
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
              menuList: (base) => ({
                ...base,
                zIndex: 10,
              }),
              menu: (base) => ({
                ...base,
                zIndex: 10,
              }),
            }}
            options={optionsKitchen}
            noOptionsMessage={({ inputValue }) => (!inputValue ? "Не найдено" : "Не найдено")}
            className={classes.select}
            placeholder="Выберите кухню"
            onChange={(e) => {
              e !== null && setKitchenValue(e);
            }}
            value={kitchenValue}
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
              menuList: (base) => ({
                ...base,
                zIndex: 10,
              }),
              menu: (base) => ({
                ...base,
                zIndex: 10,
              }),
            }}
            options={optionsCategory}
            noOptionsMessage={({ inputValue }) => (!inputValue ? "Не найдено" : "Не найдено")}
            className={classes.select}
            placeholder="Выберите категорию"
            onChange={(e) => {
              e !== null && setCategoryValue(e);
            }}
            value={categoryValue}
          />
        </div>
        <div className={classes.optionItem}>
          <p className={classes.title}>Время готовки (минут)</p>
          <div className="w-full px-12">
            <MultiRangeSlider
              ruler={false}
              className="shadow-none"
              max={360}
              min={0}
              minValue={minCookingTime}
              maxValue={maxCookingTime}
              onInput={(e) => handleCookingTimeChange(e)}
            />
            <div className="flex justify-center gap-36 mt-2">
              <Input
                placeholder="От"
                value={minCookingTime}
                className="md:w-20 w-16"
                type="number"
                max={maxCookingTime}
                onChange={(e) => {
                  const newMin = +e.target.value;
                  if (newMin <= maxCookingTime) {
                    setminCookingTime(newMin);
                  }
                }}
              />
              <Input
                placeholder="До"
                value={maxCookingTime}
                className="md:w-20 w-16"
                type="number"
                min={minCookingTime}
                onChange={(e) => {
                  const newMax = +e.target.value;
                  if (newMax >= minCookingTime) {
                    setmaxCookingTime(newMax);
                  }
                }}
              />
            </div>
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
