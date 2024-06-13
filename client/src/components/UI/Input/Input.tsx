import React, { ChangeEvent, FC } from "react";
import classes from "./Input.module.css";
import { cn } from "@/lib/utils";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  className?: string;
  min?: number;
};

const Input: FC<InputProps> = ({ value, onChange, placeholder, type, className, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={cn(classes.input, className)}
      {...props}
    />
  );
};

export default Input;
