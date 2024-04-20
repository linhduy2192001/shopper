import { useEffect } from "react";

export const useBodyClass = (classname) => {
  useEffect(() => {
    document.body.classList.add(classname);
    return () => {
      document.body.classList.remove(classname);
    };
  }, []);
};
