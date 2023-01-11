import React, { FC } from "react";
import classes from "./PinkButton.module.css";

type PinkButtonProps = {
  children: string;
  onClick?: () => void;
};

const PinkButton: FC<PinkButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={classes.registerBtn}>
      <p>{children}</p>
    </button>
  );
};

export default PinkButton;
