import React, { FC } from "react";
import classes from "./PinkButton.module.css";

type PinkButtonProps = {
  children: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  fontSize?: string;
};

const PinkButton: FC<PinkButtonProps> = ({ children, onClick, width, height, fontSize }) => {
  return (
    <button
      style={{
        maxWidth: width,
        width: "100%",
        height: height,
        fontSize: fontSize,
      }}
      onClick={onClick}
      className={classes.btn}>
      {children}
    </button>
  );
};

export default PinkButton;
