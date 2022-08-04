import { format } from "date-fns";
import Image from "next/image";
import type { Message } from "staticData/messages";

interface MessageListProps {
    messages: Message[];
}
const LOGGED_IN_USER_ID = "current-logged-in-user-id";

export const MessageList = ({ messages }: MessageListProps) => {
    const currentDate = format(new Date(), "PPPP");
    const renderMessages = () => {
        return messages.map((message) => (
            <div
                data-is-self={JSON.stringify(
                    message.user.id === LOGGED_IN_USER_ID
                )}
                className="message"
                key={message.id}
            >
                <Image
                    src={message.user.profileImage}
                    width="40px"
                    height="40px"
                    alt="Profile Image"
                    className="rounded-circle"
                />
                <div className="message__info">
                    <p className="message__info--text">{message.text}</p>
                    <span className="message__info--createdAt">
                        {format(new Date(message.createdAt), "p")}
                    </span>
                </div>
            </div>
        ));
    };
    return (
        <div className="messages">
            <h4 className="text-center title">{currentDate}</h4>
            {renderMessages()}
        </div>
    );
};
