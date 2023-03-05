import { FC } from "react";
import { IComments } from "../../../types/IComments";
import classes from "./Comment.module.css";
import deleteIcon from "../../../assets/img/delete.svg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { deleteCommentById } from "../../../redux/slices/commentsSlice";
import { toast } from "react-toastify";

type CommentProps = {
  comment: IComments;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const deleteComment = (id: number) => {
    toast.promise(dispatch(deleteCommentById(id)), {
      pending: "Загрузка...",
      success: "Комментарий успешно удален",
      error: "Ошибка удаления комментария",
    });
  };
  return (
    <div className={classes.comment}>
      <div className={classes.infoAuthor}>
        <div className={classes.img}>
          <img src={`data:image/png;base64,${comment.image}`} alt="" />
        </div>
        <div className={classes.author}>
          <p>{comment.name}</p>
          <p className={classes.date}>{comment.created_at}</p>
        </div>
      </div>
      <div className={classes.commentText}>{comment.text}</div>
      {+user.id === comment.user_id && (
        <div className={classes.deleteIcon} onClick={() => deleteComment(comment.id)}>
          <img src={deleteIcon} alt="delete" />
        </div>
      )}
    </div>
  );
};

export default Comment;
