import { Button, Input } from "@mantine/core";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { useUser } from "hooks/auth/useUser";
import { useRouter } from "next/router";
import type { HTMLAttributes } from "react";
import { useState } from "react";

import { db } from "../../firebase/firebase";

export type SendMessageInputProps = HTMLAttributes<HTMLInputElement>;

export const SendMessageInput = (props: SendMessageInputProps) => {
    // const icons = [faImage, faCamera, faLink, faSmile];

    const router = useRouter();

    const chatId: any = router.query.chatId;

    const senderId: any = router.query.client;

    // const renderIcons = () => {
    //     return icons.map((icon, index) => (
    //         <FontAwesomeIcon
    //             className="svg-icon"
    //             color="#868E96"
    //             icon={icon}
    //             key={index}
    //         />
    //     ));
    // };

    const { data: userId } = useUser();

    const [text, setText] = useState("");

    const handleSend = async () => {
        await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
                text,
                senderId: userId?.id,
                date: Timestamp.now(),
            }),
        });

        {
            userId?.id &&
                (await updateDoc(doc(db, "userChats", userId?.id), {
                    [chatId + ".lastMessage"]: {
                        text,
                    },
                    [chatId + ".date"]: serverTimestamp(),
                }));
        }

        await updateDoc(doc(db, "userChats", senderId), {
            [chatId + ".lastMessage"]: {
                text,
            },
            [chatId + ".date"]: serverTimestamp(),
        });
        setText("");
    };

    return (
        <div className="send-message-input me-4">
            <Input
                className="send-message-input__input px-4 py-0"
                onChange={(e: any) => setText(e.target.value)}
                size="md"
                variant="unstyled"
                value={text}
                type="text"
                {...props}
            />
            {/* <input
                    type="submit"
                    style="position: absolute; left: -9999px; width: 1px; height: 1px;"
                    tabIndex="-1"
                /> */}
            {/* <div className="send-message-input__icons">{renderIcons()}</div> */}
            <Button
                onClick={(e: any) => {
                    e.preventDefault();
                    handleSend();
                }}
                disabled={!text}
                type={"submit"}
                size="md"
                className="send-message-input__btn"
            >
                Send
            </Button>
        </div>
    );
};
