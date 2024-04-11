import { useEffect, useRef, useState } from "react";

export interface TimerProps {
  defaultCountDown: number;
  gameOver: () => void;
}

export default function Timer({ defaultCountDown, gameOver }: TimerProps) {
  const [seconds, setSeconds] = useState<number>(defaultCountDown);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalIdRef.current!); // Stop the timer when seconds reach 0
          gameOver();
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts or when the countdown reaches 0
    return () => clearInterval(intervalIdRef.current!);
  }, [gameOver]);

  return <div className="game-timer">{seconds}</div>;
}
