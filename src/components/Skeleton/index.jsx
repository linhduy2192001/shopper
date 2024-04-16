import React from "react";
import { SkeletonStyle } from "./style";
import { cn } from "@/utils";

export default function Skeleton({ shape, width, height, children, ...props }) {
  return (
    <SkeletonStyle
      style={{ width, height }}
      {...props}
      className={cn(shape, props.className)}
    >
      {children}
    </SkeletonStyle>
  );
}
