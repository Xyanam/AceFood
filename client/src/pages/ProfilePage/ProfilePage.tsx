import { useEffect } from "react";
import classes from "./ProfilePage.module.css";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { getUserProfile } from "../../redux/slices/userProfileSlice";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { profileUser, loading } = useSelector((state: RootState) => state.profileUser);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(getUserProfile(+id));
    }
  }, [id]);

  if (loading) {
    return <h1>ЗАГРАЗКА...</h1>;
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
              <p>Уровень: Лох</p>
            </div>
          </div>
          <div className={classes.popular}>
            <div className={classes.recipe}></div>
            <p>Самый популярный рецепт:</p>
            <p>Сырный суп по французски</p>
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
        <div>
          <Outlet context={profileUser} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
