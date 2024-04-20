import React, { useId } from "react";
import { ErrorText, FieldStyle } from "./style";
import { cn } from "@/utils";

export default function Field({ label, error, onChange, ...props }) {
  const id = useId();
  const _onChange = (ev) => {
    onChange?.(ev.target.value);
  };
  return (
    <FieldStyle className={cn("form-group relative", { error })}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        {...props}
        onChange={_onChange}
        className="form-control form-control-sm"
        id={id}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </FieldStyle>
  );
}
