"use client";

import { MutableRefObject, useEffect, useRef } from "react";
import { useRoom } from "./useRoom";

const useAnimationEnd = <
  T extends HTMLElement
>(): MutableRefObject<T | null> => {
  const { clearEvent } = useRoom();
  const animationRef = useRef<T | null>(null);

  useEffect(() => {
    const animationEnd = () => {
      clearEvent();
    };

    if (animationRef.current) {
      animationRef.current.addEventListener("animationend", animationEnd);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.removeEventListener("animationend", animationEnd);
      }
    };
  }, []);

  return animationRef;
};

export default useAnimationEnd;
