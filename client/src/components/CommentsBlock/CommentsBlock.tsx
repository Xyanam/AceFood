import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addCommentsForRecipe, fetchCommentsByRecipe } from "../../redux/slices/commentsSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import PinkButton from "../UI/PinkButton/PinkButton";
import Comment from "./Comment/Comment";
import classes from "./CommentsBlock.module.css";

const CommentsBlock: FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.recipes);
  const { comments, errorComment } = useSelector((state: RootState) => state.comment);
  const { user } = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [textComment, setTextComment] = useState("");

  const addNewComment = () => {
    if (textComment.length > 6) {
      const data = {
        user_id: user.id,
        recipe_id: id,
        text: textComment,
      };
      dispatch(addCommentsForRecipe(data));
      setTextComment("");
    } else {
      toast.warning("Введите больше 6 символов");
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
      <div className={classes.newCommentInput}>
        <textarea
          className={classes.textarea}
          placeholder="Оставьте комментарий.."
          value={textComment}
          onChange={(e) => setTextComment(e.target.value)}
        />
        <PinkButton onClick={addNewComment}>Отправить</PinkButton>
      </div>
      {loading ? (
        <h1>Загразка...</h1>
      ) : comments.length ? (
        comments.map((comment) => <Comment key={comment.id} comment={comment} />)
      ) : (
        <h3 style={{ color: "gray" }}>Тут пусто! Оставьте комментарий первым!</h3>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
};

export default CommentsBlock;
