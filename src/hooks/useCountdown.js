import { useEffect, useRef, useState } from "react";

export default function useCountdown(seconds = 600) {
  const [left, setLeft] = useState(seconds);
  const timerRef = useRef(null);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [seconds]);

  const reset = (sec = seconds) => setLeft(sec);

  return { left, reset };
}
