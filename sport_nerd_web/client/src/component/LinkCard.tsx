import { useState } from "react";
import PlayerCard, { PlayerCardProps } from "./PlayerCard";
import TeamCard, { TeamCardProps } from "./TeamCard";

export interface LinkCardProps {
    key: number;
    playerCard: React.ReactElement<PlayerCardProps>;
    teamCards: React.ReactElement<TeamCardProps>[];
}

export default function LinkCard({ playerCard, teamCards}: LinkCardProps) {
    return (
        <div className="link-card-box">
            {playerCard}
            {teamCards}
        </div>
    )
}