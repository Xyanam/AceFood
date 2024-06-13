import { FC, useEffect, useRef, useState } from "react";
import { IComments } from "../../../types/IComments";
import classes from "./Comment.module.css";
import deleteIcon from "../../../assets/img/delete.svg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import {
  deleteCommentById,
  fetchCommentsByRecipe,
  updateCommentById,
} from "../../../redux/slices/commentsSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import dots from "../../../assets/img/dots.svg";
import danger from "../../../assets/img/danger.svg";
import edit from "../../../assets/img/edit.svg";
import { selectUser } from "../../../redux/slices/userSlice";
import { useAuth } from "../../../hooks/useAuth";

import PinkButton from "../../ui/PinkButton/PinkButton";
import axiosClient from "../../../http/axios-client";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type CommentProps = {
  comment: IComments;
};

const Comment: FC<CommentProps> = ({ comment, recipe }) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(selectUser);
  const { isAuth } = useAuth();

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenActions, setIsOpenActions] = useState(false);
  const [reasonValue, setReasonValue] = useState("");

  const menuRef = useRef(null);

  const handleUpdateComment = () => {
    const data = {
      comment_id: comment.id,
      text: commentText,
    };
    dispatch(updateCommentById(data)).then(() =>
      dispatch(fetchCommentsByRecipe(comment.recipe_id))
    );
  };

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

  const handleReportComment = () => {
    axiosClient
      .post("/recipes/reportComment", {
        recipe_id: comment.recipe_id.toString(),
        user_id: comment.user_id.toString(),
        comment_id: comment.id.toString(),
        reason: reasonValue,
      })
      .then(() => {
        toast.success("Жалоба успешно отправлена!");
        setIsOpenActions(false);
        setIsOpenDialog(false);
        setReasonValue("");
      })
      .catch(() => toast.error("Произошла ошибка отправки! Попробуйте позже"));
  };

  return (
    <div className={classes.comment}>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Отправить жалобу</DialogTitle>
            <DialogDescription className="font-comforta font-bold">
              Спасибо за ваше старание улучшить сообщество!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-comforta font-bold">
                Причина жалобы
              </Label>
              <Input
                id="name"
                placeholder="Спам/Оскорбление"
                className="col-span-3 placeholder:font-comforta"
                value={reasonValue}
                onChange={(e) => setReasonValue(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#e97c94] hover:bg-[#e97c94]/80"
              onClick={handleReportComment}>
              Отправить жалобу
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className={classes.infoAuthor}>
        <Link to={`/profile/${comment.user_id}`}>
          <div className={classes.img}>
            <img src={`data:image/png;base64,${comment.image}`} alt="" />
          </div>
        </Link>
        <div className={classes.author}>
          <div>
            <div className="flex items-center gap-2">
              <Link to={`/profile/${comment.user_id}`}>{comment.name}</Link>
              {comment?.user_id === recipe?.user_id && (
                <p className="text-sm text-gray-500">автор рецепта</p>
              )}
            </div>
            <p className={classes.date}>{comment.created_at}</p>
          </div>
          {isAuth && (
            <div
              className={classes.dots}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenActions(!isOpenActions);
              }}>
              <img src={dots} alt="dots" />
            </div>
          )}
        </div>
      </div>
      <div className={classes.commentText}>
        {isOpenEdit ? (
          <>
            <textarea
              className={classes.textarea}
              placeholder="Введите комментарий."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className={classes.btns}>
              <PinkButton width="150px" onClick={handleUpdateComment}>
                Сохранить
              </PinkButton>
              <button className={classes.cancel} onClick={() => setIsOpenEdit(false)}>
                Отменить
              </button>
            </div>
          </>
        ) : (
          comment.text
        )}
      </div>
      {isOpenActions && (
        <div className={cn(classes.commentActions, "py-2 px-4")} ref={menuRef}>
          <ul className={classes.actions}>
            {+user.id !== comment.user_id && user.role !== "admin" && (
              <li className={classes.actionItem} onClick={() => setIsOpenDialog(true)}>
                <img src={danger} className={classes.deleteIcon} />
                Пожаловаться
              </li>
            )}
            {+user.id === comment.user_id && (
              <li
                className={classes.actionItem}
                onClick={() => {
                  setIsOpenActions(false);
                  setIsOpenEdit(true);
                }}>
                <img src={edit} className={classes.deleteIcon} />
                Редактировать
              </li>
            )}
            {(+user.id === comment.user_id || user.role === "admin") && (
              <>
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
