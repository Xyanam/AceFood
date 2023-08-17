import { FC } from "react";
import BlockFood from "../BlockFood/BlockFood";
import { useOutletContext } from "react-router-dom";
import Loader from "../Loader/Loader";

const UserProfileRecipes: FC = () => {
  const { profileUser } = useOutletContext();

  if (Object.keys(profileUser).length === 0) {
    return <Loader />;
  }

  return (
    <>
      {!profileUser.recipes.length ? (
        <p style={{ color: "gray" }}>Рецептов нет</p>
      ) : (
        <>
          {profileUser.recipes.map((recipe) => (
            <BlockFood recipe={recipe} key={recipe.id} />
          ))}
        </>
      )}
    </>
  );
};

export default UserProfileRecipes;
