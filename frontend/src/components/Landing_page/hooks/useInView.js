import { useEffect, useRef, useState } from 'react';

// Intersection observer hook that triggers once when element enters viewport
export const useInView = (threshold = 0.15) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold });

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  return [ref, isInView];
};

export default useInView;
