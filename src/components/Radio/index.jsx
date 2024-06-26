import { cn } from "@/utils";
import React, { createContext, useContext, useState } from "react";

const Context = createContext({});

export default function Radio({ children, ...props }) {
  const { value, onChange } = useContext(Context);
  return (
    <div
      className="mb-3 custom-control custom-radio"
      onClick={() => onChange(props.value)}
    >
      <input
        checked={props.value == value}
        className="custom-control-input"
        type="radio"
        defaultChecked
      />
      <label
        className="flex items-center custom-control-label"
        htmlFor="seasonOne"
      >
        {children}
      </label>
    </div>
  );
}

Radio.Toggle = ({ children, ...props }) => {
  const { value, onChange } = useContext(Context);

  return (
    <label
      className={cn("btn btn-sm btn-outline-border ", {
        active: props.value == value,
      })}
      onClick={() => onChange(props.value)}
    >
      <input type="radio" name="gender" checked={props.value == value} />{" "}
      {children}
    </label>
  );
};

Radio.Group = ({ children, defaultValue, toggle, ...props }) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (_value) => {
    if (toggle && _value == value) {
      setValue();
      props?.onChange?.();
      return;
    }
    setValue(_value);
    props?.onChange?.(_value);
  };
  return (
    <Context.Provider value={{ value, onChange }}>{children}</Context.Provider>
  );
};
