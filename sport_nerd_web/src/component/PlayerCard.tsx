// Import necessary dependencies
import React from 'react';

// Define the prop type for PlayerCard
export interface CardProps {
  key: number;
  name: string;
};


// PlayerCard component
export default function PlayerCard({ name }: CardProps) {
  return (
    <div className="player-card-box">
      {name}
    </div>
  );
}