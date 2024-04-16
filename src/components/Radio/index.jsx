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

Radio.Group = ({ children, defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (value) => {
    setValue(value);
    props?.onChange?.(value);
  };
  return (
    <Context.Provider value={{ value, onChange }}>{children}</Context.Provider>
  );
};
