import React, { useState, useEffect, MutableRefObject } from "react";

type IParameter = (
  intersectRef: MutableRefObject<any>,
  optionsObject: IOptions
) => returnType;

interface returnType {
  isIntersect: boolean;
}

interface IOptions {
  readonly root?: Element | Document | null;
  readonly rootMargin: string;
  readonly thresholds: number;
}
const useIntersectObserver: IParameter = (
  intersectRef,
  optionsObject
): returnType => {
  // IntersectObserver의 option들을 지정하지 않는 경우를 대비해 root, margin을 default로 지정 [재사용성을 고려]
  const { root = null, rootMargin = "0px", thresholds } = optionsObject;

  const [isIntersect, setIsIntersect] = useState(false);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setIsIntersect(true);
    } else {
      setIsIntersect(false);
    }
  };
  const options: IOptions = {
    root: root,
    rootMargin: rootMargin,
    thresholds: thresholds,
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (intersectRef) {
      if (intersectRef.current) observer.observe(intersectRef.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);
  return { isIntersect };
};

export default useIntersectObserver;
