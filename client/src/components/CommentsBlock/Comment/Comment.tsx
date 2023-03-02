import React, { FC } from "react";
import { IComments } from "../../../types/IComments";
import classes from "./Comment.module.css";

type CommentProps = {
  comment: IComments;
};

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className={classes.comment}>
      <div className={classes.infoAuthor}>
        <div className={classes.img}></div>
        <div className={classes.author}>
          <p>{comment.name}</p>
          <p>{comment.created_at}</p>
        </div>
      </div>
      <div className={classes.commentText}>{comment.text}</div>
    </div>
  );
};

export default Comment;
