import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const element = document.createElement("div");

export default function Portal({ children, selector }) {
  const [, forceRender] = useState();
  useEffect(() => {
    forceRender(Math.random());
  }, []);
  return createPortal(children, document.querySelector(selector) || element);
}
