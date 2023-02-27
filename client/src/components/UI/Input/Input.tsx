import React, { ChangeEvent, FC } from "react";
import classes from "./Input.module.css";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
};

const Input: FC<InputProps> = ({ value, onChange, placeholder, type }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={classes.input}
    />
  );
};

export default Input;
