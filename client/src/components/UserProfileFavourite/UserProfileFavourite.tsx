import { FC } from "react";

import { useOutletContext } from "react-router-dom";
import BlockFood from "../BlockFood/BlockFood";

const UserProfileFavourite: FC = () => {
  const { favourite } = useOutletContext();

  if (!favourite.length) {
    return <p style={{ color: "gray" }}>Вы пока не добавили любимый рецепт</p>;
  }

  return (
    <>
      {favourite.map((recipe) => (
        <BlockFood recipe={recipe} />
      ))}
    </>
  );
};

export default UserProfileFavourite;
