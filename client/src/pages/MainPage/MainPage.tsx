import React, { FC } from "react";
import PopularFood from "../../components/PopularFood/PopularFood";
import classes from "./MainPage.module.css";
import desert from "../../assets/img/desert.png";
import soup from "../../assets/img/soup.png";
import breakfast from "../../assets/img/breakfast.png";
import dish from "../../assets/img/dish.png";
import drinks from "../../assets/img/drinks.png";
import { Link } from "react-router-dom";

const MainPage: FC = () => {
  const categories = [
    {
      id: 1,
      title: "Десерты",
      img: desert,
      categoryId: 1,
    },
    {
      id: 2,
      title: "Супы",
      img: soup,
      categoryId: 3,
    },
    {
      id: 3,
      title: "Завтраки",
      img: breakfast,
      categoryId: 5,
    },
    {
      id: 4,
      title: "Напитки",
      img: drinks,
      categoryId: 8,
    },
    {
      id: 5,
      title: "Гарниры",
      img: dish,
      categoryId: 4,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <h1 className={classes.textBanner}>
          Разнообразные
          <br /> рецепты <br /> со всего мира
        </h1>
      </div>
      <h1 className={classes.title}>Популярные блюда</h1>
      <PopularFood />
      <h1 className={classes.title} style={{ marginTop: "100px" }}>
        Популярные Категории
      </h1>
      <div className={classes.categories}>
        {categories.map((category) => (
          <Link
            to={`/recipes?category=${category.categoryId}`}
            style={{ textDecoration: "none" }}
            key={category.id}>
            <div className={classes.category}>
              <img src={category.img} alt="desert" className={classes.img} />
              <h1 className={classes.category_title}>{category.title}</h1>
            </div>
          </Link>
        ))}
      </div>
      <footer className={classes.footer}>
        <h1 className={classes.footer_text}>Ace Food</h1>
        <p className={classes.tezis}>Готовить вкусно - готовить просто</p>
      </footer>
    </div>
  );
};

export default MainPage;
