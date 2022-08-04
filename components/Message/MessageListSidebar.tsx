import { MessageHeader } from "@components/Message/MessageHeader";
import type { Contact } from "staticData/messages";

interface MessageListSidebarProps {
    contact: Contact;
    onBackClick: () => void;
}
export const MessageListSidebar = ({
    contact,
    onBackClick,
}: MessageListSidebarProps) => {
    const { name, profileImage, messages, isOnline, isFavorite, lastMessage } =
        contact;
    return (
        <>
            <MessageHeader
                username={name}
                profileImage={profileImage}
                isOnline={isOnline}
                onBackClick={onBackClick}
                lastMessage={lastMessage}
                isFavorite={isFavorite}
            />
        </>
    );
};
