import { FC } from "react";
import { IComments } from "../../../types/IComments";
import classes from "./Comment.module.css";
import deleteIcon from "../../../assets/img/delete.svg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { deleteCommentById } from "../../../redux/slices/commentsSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
        <Link to={`/profile/${comment.user_id}`}>
          <div className={classes.img}>
            <img src={`data:image/png;base64,${comment.image}`} alt="" />
          </div>
        </Link>
        <div className={classes.author}>
          <div>
            <Link to={`/profile/${comment.user_id}`}>{comment.name}</Link>
            <p className={classes.date}>{comment.created_at}</p>
          </div>
          <div className={classes.dots}>...</div>
        </div>
      </div>
      <div className={classes.commentText}>{comment.text}</div>
      {(+user.id === comment.user_id || user.role === "admin") && (
        <div className={classes.deleteIcon} onClick={() => deleteComment(comment.id)}>
          <img src={deleteIcon} alt="delete" />
        </div>
      )}
    </div>
  );
};

export default Comment;
