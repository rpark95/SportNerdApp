import { useEffect, useState } from "react";
import { MAX_TEAM_GUESSES } from "@/app/page";

let teamMap = new Map<string, number>();
export interface TeamCardProps {
  name: string;
  xNumber: number;
}

export default function TeamCard({ name, xNumber }: TeamCardProps) {

  const [xSpanArr, setXSpanArr] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    // Update X spans based on xNumber
    const updatedXSpanArr = Array.from({ length: MAX_TEAM_GUESSES }, (_, i) => {
      const xSpanColor = i < xNumber ? '#010101' : '#353535'; // Change color conditionally
      return <span key={i} style={{ color: xSpanColor }}>X</span>;
    });

    setXSpanArr(updatedXSpanArr);
  }, [xNumber]);

  let timesUsed = "";
  let count = teamMap.get(name) ?? 0;
  teamMap.set(name, count + 1);
  count = count + 1;

  console.log("Count " + count);

  return (
    <div className="team-card-box">
      <div className="team-card-name">{name}</div>
      <div className="team-card-x">{xSpanArr}</div>
    </div>
  );
}