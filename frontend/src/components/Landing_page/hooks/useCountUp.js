import { useEffect, useState } from 'react';

// Smooth count-up hook for animated numbers
export const useCountUp = (endValue, duration = 1600, isVisible = false, decimals = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quartic for natural deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = easeProgress * endValue;
      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [endValue, duration, isVisible]);

  return decimals > 0 ? count.toFixed(decimals) : Math.round(count);
};

export default useCountUp;
