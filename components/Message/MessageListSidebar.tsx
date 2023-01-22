import { MessageHeader } from "@components/Message/MessageHeader";
import { MessageList } from "@components/Message/MessageList";
import { ScrollArea } from "@mantine/core";
import type { DocumentData } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../firebase/firebase";
import { SendMessageInput } from "./SendMessageInput";

interface MessageListSidebarProps {
    query: string;
}
export const MessageListSidebar = ({ query }: MessageListSidebarProps) => {
    const [user, setMessage] = useState<DocumentData>();
    useEffect(() => {
        if (query) {
            const unsub = onSnapshot(doc(db, "users", query), (doc) => {
                setMessage(doc.data());
            });
            return () => {
                unsub;
            };
        }
    }, [query]);
    return (
        <div className="message-list-sidebar pb-5">
            <MessageHeader username={user?.name} profileImage={user?.profile} />
            <ScrollArea
                style={{ height: 650, width: "100%" }}
                offsetScrollbars
                scrollbarSize={6}
            >
                <MessageList imageUrl={user?.profile} />
            </ScrollArea>
            <SendMessageInput placeholder="Type a message" />
        </div>
    );
};
