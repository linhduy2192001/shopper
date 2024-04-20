import { cn } from "@/utils";
import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

export default function Button({ children, loading, ...props }) {
  return (
    <button
      className={cn(
        "btn btn-sm btn-dark flex items-center justify-center gap-2",
        { "disabled pointer-events-none": loading }
      )}
      {...props}
    >
      {loading && <LoadingOutlined />}
      {children}
    </button>
  );
}
