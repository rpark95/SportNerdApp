import { useState } from "react";
import PlayerCard, { CardProps } from "./PlayerCard";
import TeamCard from "./TeamCard";

export interface LinkCardProps {
    key: number;
    playerCard: React.ReactElement<CardProps>;
    teamCards: React.ReactElement<CardProps>[];
}

export default function LinkCard({ playerCard, teamCards}: LinkCardProps) {
    return (
        <div className="link-card-box">
            {playerCard}
            {teamCards}
        </div>
    )
}