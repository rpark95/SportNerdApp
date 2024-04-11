export interface PopupProps {
    message: string;
    onClose: () => void;
}

export default function Popup({message, onClose}: PopupProps) {
    console.log("Message Popup: " + message);
    return (
        <div className="message-popup-container">
            <div className="message-popup-content">
                {message}
            </div>
            <button className="message-popup-close" onClick={onClose}>
                &times;
            </button>
        </div>
    );
}