
export interface GameOverPopupProps {
    message: string;
    onRematch: () => void;
    onNewGame: () => void;
}
export default function GameOverPopup({message, onRematch, onNewGame}: GameOverPopupProps) {
    return (
        <div className="message-popup-container">
            <div className="message-popup-content">
                <div className="message-popup-text">
                    GAME OVER {message} LOSES
                </div>
                <div className="message-popup-button">
                    <button className="message-rounded-button" onClick={onRematch}>Rematch</button>   
                    <button className="message-rounded-button" onClick={onRematch}>New Game</button>
                </div>
            </div>
        </div>
        
    )
}