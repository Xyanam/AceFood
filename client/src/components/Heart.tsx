import { useAuth } from "../hooks/useAuth";
import { recipe } from "../types/TRecipe";

interface HeartProps {
  recipe: recipe;
  liked: boolean;
  likeCount: number;
  onClick: () => void;
}

const Heart = ({ onClick, recipe, liked, likeCount }: HeartProps) => {
  if (Object.keys(recipe).length === 0) {
    return <h1>Загрузка</h1>;
  }
  const { isAuth } = useAuth();

  const likeStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div
      className={`heart ${(!isAuth || recipe.moderated === "pending") && "disabled"}`}
      onClick={onClick}>
      <svg
        fill={`${liked ? "red" : "black"}`}
        width="60px"
        height="60px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
      </svg>
      <span className="like" style={likeStyle}>
        {likeCount}
      </span>
    </div>
  );
};
export default Heart;
