import { useEffect } from "react";

export const useScrollTop = (dependenceList = []) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, dependenceList);
};
