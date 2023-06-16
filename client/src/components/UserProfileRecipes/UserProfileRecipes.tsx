import { FC } from "react";
import BlockFood from "../BlockFood/BlockFood";
import { useOutletContext } from "react-router-dom";

const UserProfileRecipes: FC = () => {
  const { profileUser } = useOutletContext();

  if (Object.keys(profileUser).length === 0) {
    return <h1>ЗАГРАЗКА...</h1>;
  }

  return (
    <>
      {profileUser.recipes.map((recipe) => (
        <BlockFood recipe={recipe} key={recipe.id} />
      ))}
    </>
  );
};

export default UserProfileRecipes;
