import { useEffect, useState } from "react";
import classes from "./ProfilePage.module.css";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { getUserFavourite, getUserProfile } from "../../redux/slices/userProfileSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { selectUser } from "../../redux/slices/userSlice";

const ProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { profileUser, favourite, loading } = useSelector((state: RootState) => state.profileUser);
  const { user } = useSelector(selectUser);
  const [popular, setPopular] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getUserProfile(+id));
      dispatch(getUserFavourite(+id));
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const isCurrentUser = profileUser.id === user.id;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.userProfile}>
          <div className={classes.user}>
            <div className={classes.avatar}>
              <img
                src={`data:image/png;base64,${profileUser.image}`}
                alt="avatar"
                className={classes.userImage}
              />
            </div>
            <div className={classes.name}>
              <p>{profileUser.name}</p>
              <p style={{ color: "gray" }}>{profileUser.email}</p>
            </div>
          </div>
          <div className={classes.popular}>
            <div className={classes.recipeImage}>
              {profileUser?.mostPopularRecipe?.recipeImage && (
                <img
                  src={`data:image/png;base64,${profileUser?.mostPopularRecipe?.recipeImage}`}
                  alt="image"
                />
              )}
            </div>
            <div className={classes.recipeInfo}>
              <p>Самый популярный рецепт:</p>
              <p>{profileUser?.mostPopularRecipe?.title || "Рецептов нет"}</p>
            </div>
          </div>
        </div>
        <div className={classes.navRecipe}>
          <div className={classes.nav}>
            <NavLink
              to={`/profile/${profileUser.id}`}
              className={`${classes.navItem} ${
                location.pathname === `/profile/${profileUser.id}` ? classes.activeNavItem : ""
              }`}>
              {isCurrentUser ? "Мои рецепты" : `Рецепты ${profileUser.name}`}
            </NavLink>
            {isCurrentUser && (
              <NavLink
                to={`/profile/${profileUser.id}/favourites`}
                className={`${classes.navItem} ${
                  location.pathname === `/profile/${profileUser.id}/favourites`
                    ? classes.activeNavItem
                    : ""
                }`}>
                Любимые рецепты
              </NavLink>
            )}
          </div>
          <div>
            <p>Опубликовано рецептов: {profileUser.recipeCount}</p>
          </div>
        </div>
        <div className={classes.recipes}>
          <Outlet context={{ profileUser, favourite }} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
