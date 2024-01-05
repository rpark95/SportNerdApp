import { CardProps } from "./PlayerCard";

export default function TeamCard({ name }: CardProps ) {
    return (
        <div className="team-card-box">
          {name}
        </div>
      );
}