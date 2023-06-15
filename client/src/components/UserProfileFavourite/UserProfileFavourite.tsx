import { FC } from "react";

import { useOutletContext } from "react-router-dom";

const UserProfileFavourite: FC = () => {
  const user = useOutletContext();

  if (!user) {
    return <h1>ЗАГРРАЗКА</h1>;
  }

  return (
    <div>
      <h1>ЛЮБИМКИ</h1>
    </div>
  );
};

export default UserProfileFavourite;
