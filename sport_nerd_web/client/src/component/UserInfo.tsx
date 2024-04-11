import { useEffect, useState } from "react";

interface UserInfoProps {
    name: string;
    userTurn: boolean;
}

export default function UserInfo({name, userTurn}: UserInfoProps) {
    const [playerInfo, setPlayerInfo] = useState<React.ReactElement>();

    useEffect(() => {
        // Update X spans based on xNumber
        const updatedXSpan = () => {
        const color = userTurn ? '#ffffff' : '#959595'; // Change color conditionally
        return <span key={0} style={{ color: color, fontWeight:'bold'}}>{name}</span>;
        };

        setPlayerInfo(updatedXSpan);
    }, [userTurn]);

    return (
        <div className="game-player">
            {playerInfo}
        </div>
    );
}