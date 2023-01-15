import React, { ChangeEvent, FC } from "react";
import classes from "./Input.module.css";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input: FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={classes.input}
    />
  );
};

export default Input;
