import { useEffect, useState } from "react";

export default function Timer() {
    const [seconds, setSeconds] = useState<number>(5);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(intervalId); // Stop the timer when seconds reach 0
                    return 0;
                } else {
                    return prevSeconds - 1;
                }
            });
        }, 1000);
    }, [])
    return (
        <div className='game-timer'>
            {seconds}
        </div>
    )
}