import { Link, useLocation } from "react-router-dom";
import classes from "./SidebarAdmin.module.css";
import { CookingPot, MessagesSquare, ShoppingBasket, Users } from "lucide-react";

const SidebarAdmin = () => {
  const { pathname } = useLocation();

  return (
    <div className={classes.sidebar}>
      <ul className={classes.sidebarItems}>
        <li className={`${classes.sidebarItem} ${"/admin" === pathname ? classes.active : ""}`}>
          <Link to="/admin">
            Модерация рецептов <CookingPot />
          </Link>
        </li>
        <li
          className={`${classes.sidebarItem} ${
            "/admin/comments" === pathname ? classes.active : ""
          }`}>
          <Link to="/admin/comments">
            Модерация комментариев <MessagesSquare />
          </Link>
        </li>
        <li
          className={`${classes.sidebarItem} ${"/admin/users" === pathname ? classes.active : ""}`}>
          <Link to="/admin/users">
            Модерация пользователей <Users />
          </Link>
        </li>
        <li className={`${classes.sidebarItem} ${"/admin/add" === pathname ? classes.active : ""}`}>
          <Link to="/admin/add">
            Добавление ингредиентов <ShoppingBasket />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
