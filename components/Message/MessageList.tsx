import { format, formatDistanceToNow } from "date-fns";
import type { DocumentData } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { db } from "../../firebase/firebase";

export const MessageList = () => {
    const router = useRouter();
    const chatId: any = router?.query?.chatId;
    const senderId: any = router?.query?.client;
    const [message, setMessage] = useState<DocumentData>();

    const ref: any = useRef<HTMLDivElement>();

    useEffect(() => {
        if (chatId) {
            const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
                doc.exists() && setMessage(doc.data().messages);
            });
            return () => {
                unsub;
            };
        }
    }, [chatId]);

    useEffect(() => {
        ref.current &&
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "end",
            });
    }, [message]);

    const currentDate = format(new Date(), "PPPP");
    const renderMessages = () => {
        return (
            message &&
            message.map(
                (
                    message: {
                        text: string;
                        senderId: string;
                        date: { seconds: number; nanoseconds: string };
                    },
                    index: number
                ) => {
                    const date = new Date(message?.date?.seconds * 1000);

                    const formateedDate = formatDistanceToNow(new Date(date), {
                        addSuffix: true,
                    });

                    return (
                        <div className="message" key={index} ref={ref}>
                            {/* <Image
                    src={
                        message.user.profileImage ??
                        "/userprofile/unknownPerson.jpg"
                    }
                    width="40px"
                    height="40px"
                    alt="Profile Image"
                    className="rounded-circle"
                /> */}
                            <div
                                className={`message__info ${
                                    senderId !== message.senderId
                                        ? "ms-auto"
                                        : "me-auto"
                                }`}
                            >
                                <p className="message__info--text">
                                    {message.text}
                                </p>
                                <span className="message__info--createdAt">
                                    {/* {formatDistanceToNow(
                                        new Date(
                                            message.date.seconds * 1000
                                        ).toLocaleDateString(),
                                        { addSuffix: true }
                                    )} */}
                                    {formateedDate}
                                </span>
                            </div>
                        </div>
                    );
                }
            )
        );
    };
    return (
        <div className="messages">
            <h4 className="text-center title">{currentDate}</h4>
            {renderMessages()}
        </div>
    );
};
