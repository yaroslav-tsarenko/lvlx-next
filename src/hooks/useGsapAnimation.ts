import { useEffect } from "react";

const useGsapAnimation = (animation: (target: string) => void, target: string) => {
  useEffect(() => {
    if (animation && target) {
      animation(target);
    }
  }, [animation, target]);
};

export default useGsapAnimation;