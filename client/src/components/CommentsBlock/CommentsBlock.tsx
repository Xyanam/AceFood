import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addCommentsForRecipe } from "../../redux/slices/commentsSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import PinkButton from "../UI/PinkButton/PinkButton";
import Comment from "./Comment/Comment";
import classes from "./CommentsBlock.module.css";
import { useAuth } from "../../hooks/useAuth";

const CommentsBlock: FC = () => {
  const { comments, errorComment, loading } = useSelector((state: RootState) => state.comment);
  const { user } = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const [textComment, setTextComment] = useState("");

  const addNewComment = () => {
    if (textComment.length >= 5) {
      const data = {
        user_id: user.id,
        recipe_id: id,
        text: textComment,
      };
      toast.promise(dispatch(addCommentsForRecipe(data)), {
        pending: "Загрузка...",
        success: "Успешно",
      });
      setTextComment("");
    } else {
      toast.warning("Введите больше 5 символов");
    }
  };

  if (errorComment) {
    toast.warning(errorComment);
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Комментарии</h1>
      </div>
      {isAuth ? (
        <div className={classes.newCommentInput}>
          <textarea
            className={classes.textarea}
            placeholder="Оставьте комментарий.."
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
          />
          <PinkButton onClick={addNewComment}>Отправить</PinkButton>
        </div>
      ) : (
        <div className={classes.registerComment}>
          Чтобы оставить комментарий вам необходимо <Link to="/login">Авторизоваться</Link> или{" "}
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      )}
      {loading ? (
        <h1>Загрузка...</h1>
      ) : comments.length ? (
        comments.map((comment) => <Comment key={comment.id} comment={comment} />)
      ) : (
        <h3 className={classes.empty}>Тут пусто! Оставьте комментарий первым!</h3>
      )}
      {errorComment && errorComment}
    </div>
  );
};

export default CommentsBlock;
