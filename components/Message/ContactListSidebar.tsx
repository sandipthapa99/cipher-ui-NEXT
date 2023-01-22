import { ContactList } from "@components/Message/ContactList";
import { MessageListSidebar } from "@components/Message/MessageListSidebar";
import { ScrollArea } from "@mantine/core";
import type { DocumentData } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { db } from "../../firebase/firebase";

export const ContactListSideBar = () => {
    const [chatRoom, setChatRoom] = useState<DocumentData>();

    const { data } = useUser();

    const router: any = useRouter();

    useEffect(() => {
        if (data?.id) {
            const unsub = onSnapshot(doc(db, "userChats", data?.id), (doc) => {
                setChatRoom(doc.data());
            });
            return () => {
                unsub;
            };
        }
    }, [data?.id]);
    return (
        <div className="contact-sidebar">
            <Row>
                <Col md={3}>
                    <ScrollArea
                        style={{ height: 700 }}
                        offsetScrollbars
                        scrollbarSize={6}
                    >
                        {chatRoom &&
                            Object?.entries(chatRoom)?.map((chat, index) => (
                                <ContactList
                                    key={index}
                                    title="Today"
                                    contactId={chat[0]}
                                    contacts={chat[1]}
                                />
                            ))}
                    </ScrollArea>
                </Col>
                <Col md={9}>
                    {router?.query?.client ? (
                        <MessageListSidebar query={router?.query?.client} />
                    ) : (
                        <div className="p-5 text-center">
                            <figure className="position-relative">
                                <Image
                                    src={"/emptyChat.png"}
                                    alt="order-empty-img"
                                    height={243}
                                    width={243}
                                />
                            </figure>
                            <p className="mb-3" style={{ fontSize: "2.4rem" }}>
                                Start a Conversation
                            </p>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};
