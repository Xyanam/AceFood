import Input from "@/components/ui/Input/Input";
import classes from "./AdminAddPage.module.css";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PinkButton from "@/components/ui/PinkButton/PinkButton";
import { useState } from "react";

import axiosClient from "@/http/axios-client";
import { toast } from "react-toastify";

const AdminAddPage = () => {
  const [ingredient, setIngredient] = useState("");
  const [calories, setCalories] = useState("");
  const [proteins, setProteins] = useState("");
  const [fats, setFats] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");

  const handleCreateIngredient = (e) => {
    e.preventDefault();

    if (!ingredient) return toast.error("Введите название");
    if (!calories) return toast.error("Введите калории");
    if (!proteins) return toast.error("Введите белки");
    if (!fats) return toast.error("Введите жиры");
    if (!carbohydrates) return toast.error("Введите углеводы");

    axiosClient
      .post("/createIngredient", { ingredient, calories, proteins, fats, carbohydrates })
      .then(() => {
        setIngredient("");
        setCalories("");
        setProteins("");
        setFats("");
        setCarbohydrates("");
        toast.success("Ингредиент успешно добавлен!");
      })
      .catch((err) => toast.error(err?.response?.data));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Добавление ингредиентов</h2>
        </div>
        <form className="flex flex-col justify-center gap-5" onSubmit={handleCreateIngredient}>
          <Label className="flex flex-col justify-center items-center">
            Название ингредиента
            <Input
              className="font-comforta mt-2"
              placeholder="Название ингредиента"
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
          </Label>
          <div className="flex gap-8">
            <Label className="flex flex-col items-center gap-2">
              <Input
                className="font-comforta !w-20"
                placeholder="Калории"
                type="text"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                min={0}
              />
              Калории
            </Label>
            <Label className="flex flex-col items-center gap-2">
              <Input
                className="font-comforta !w-20"
                placeholder="Белки"
                type="text"
                value={proteins}
                onChange={(e) => setProteins(e.target.value)}
              />
              Белки
            </Label>
            <Label className="flex flex-col items-center gap-2">
              <Input
                className="font-comforta !w-20"
                placeholder="Жиры"
                type="text"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
              />
              Жиры
            </Label>
            <Label className="flex flex-col items-center gap-2">
              <Input
                className="font-comforta !w-20"
                placeholder="Углеводы"
                type="text"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
              />
              Углеводы
            </Label>
          </div>
          <p className="text-muted-foreground">Данные указывать на 100гр продукта</p>
          <PinkButton className="mt-2" type="submit">
            Добавить
          </PinkButton>
        </form>
      </div>
    </div>
  );
};

export default AdminAddPage;
