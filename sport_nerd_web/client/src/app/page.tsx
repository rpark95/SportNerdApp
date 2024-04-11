"use client"
import Image from 'next/image'
import PlayerInput from '../component/PlayerInput'
import PlayerCard, { PlayerCardProps } from '@/component/PlayerCard'
import React, { useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

let teamLinkMap = new Map<string, number>();
let playersGuessedSet = new Set<string>();
//MAX_TEAM_GUESS = 5
export const MAX_TEAM_GUESSES:number = 5;
//DEFAULT_TIMER_DURATION = 30
export const DEFAULT_TIMER_DURATION:number = 5;

export default function Home() {
  const router = useRouter();
  const handleGameMainClick = () => {
    // Navigate to the '/game-main' route
    router.push('/game-main');
  };
  return (
    <div className="game-header-container">
      <div className="message-popup-content">
        <div className="message-popup-text">
          Basketball Nerd
        </div>
        <div className="homepage-button"> 
          <button className="homepage-rounded-button" onClick={handleGameMainClick}>FIND A GAME</button>
          <button className="homepage-rounded-button" onClick={handleGameMainClick}>CHALLENGE A FRIEND</button>
        </div>
        
      </div>
    </div>
  )
}

