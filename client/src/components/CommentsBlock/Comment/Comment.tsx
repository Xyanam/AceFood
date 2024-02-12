import { FC, useEffect, useRef, useState } from "react";
import { IComments } from "../../../types/IComments";
import classes from "./Comment.module.css";
import deleteIcon from "../../../assets/img/delete.svg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { deleteCommentById } from "../../../redux/slices/commentsSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import dots from "../../../assets/img/dots.svg";
import danger from "../../../assets/img/danger.svg";
import edit from "../../../assets/img/edit.svg";

type CommentProps = {
  comment: IComments;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [isOpenActions, setIsOpenActions] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (isOpenActions && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenActions(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpenActions]);

  const deleteComment = (id: number) => {
    confirm("Вы действительно хотите удалить комментарий?") &&
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
          <div
            className={classes.dots}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenActions(!isOpenActions);
            }}>
            <img src={dots} alt="dots" />
          </div>
        </div>
      </div>
      <div className={classes.commentText}>{comment.text}</div>
      {isOpenActions && (
        <div className={classes.commentActions} ref={menuRef}>
          <ul className={classes.actions}>
            <li className={classes.actionItem}>
              <img src={danger} className={classes.deleteIcon} />
              Пожаловаться
            </li>
            {(+user.id === comment.user_id || user.role === "admin") && (
              <>
                <li className={classes.actionItem}>
                  <img src={edit} className={classes.deleteIcon} />
                  Редактировать
                </li>
                <li className={classes.remove} onClick={() => deleteComment(comment.id)}>
                  <img src={deleteIcon} className={classes.deleteIcon} />
                  Удалить
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Comment;
