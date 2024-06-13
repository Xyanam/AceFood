import React, { FC } from "react";
import classes from "./PinkButton.module.css";
import { cn } from "@/lib/utils";

type PinkButtonProps = {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string;
  height?: string;
  fontSize?: string;
  className?: string;
};

const PinkButton: FC<PinkButtonProps> = ({
  children,
  onClick,
  width,
  height,
  fontSize,
  className,
  ...props
}) => {
  return (
    <button
      style={{
        maxWidth: width,
        width: "100%",
        height: height,
        fontSize: fontSize,
      }}
      onClick={onClick}
      className={cn(classes.btn, "disabled:opacity-60 disabled:cursor-not-allowed", className)}
      {...props}>
      {children}
    </button>
  );
};

export default PinkButton;
