import { useState } from "react";
import { validate } from "../utils/validate";

export const useForm = (rules, initialValue = {}) => {
  let [values, setValues] = useState(initialValue);
  const [errors, setError] = useState({});

  const register = (name) => {
    return {
      error: errors[name],
      value: values[name] || "",
      onChange: (ev) => setValues({ ...values, [name]: ev.target.value }),
    };
  };

  const _validate = () => {
    const errorObject = validate(rules, values);
    setError(errorObject);
    return Object.keys(errorObject).length === 0;
  };

  const reset = () => {
    setValues({});
  };
  return {
    values,
    errors,
    register,
    validate: _validate,
    reset,
  };
};
