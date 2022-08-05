import { faCamera, faSmile } from "@fortawesome/pro-light-svg-icons";
import { faImage, faLink } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { HTMLAttributes } from "react";

export type SendMessageInputProps = HTMLAttributes<HTMLInputElement>;

export const SendMessageInput = (props: SendMessageInputProps) => {
    const icons = [faImage, faCamera, faLink, faSmile];

    const renderIcons = () => {
        return icons.map((icon, index) => (
            <FontAwesomeIcon
                className="svg-icon"
                color="#868E96"
                icon={icon}
                key={index}
            />
        ));
    };
    return (
        <div className="send-message-input">
            <input
                className="send-message-input__input"
                type="text"
                {...props}
            />
            <div className="send-message-input__icons">{renderIcons()}</div>
            <button className="send-message-input__btn">Send</button>
        </div>
    );
};
