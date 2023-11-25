import { RefObject, useEffect } from "react";

export const useOutsideClick = (ref: RefObject<any>, callback: () => any, type = 'click') => {

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener(type, handleClick);

    return () => {
      document.removeEventListener(type, handleClick);
    };
  }, [ref]);

  return ref;
};
