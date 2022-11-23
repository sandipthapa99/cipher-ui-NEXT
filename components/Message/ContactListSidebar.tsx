import { ContactList } from "@components/Message/ContactList";
import { MessageListSidebar } from "@components/Message/MessageListSidebar";
import { ScrollArea } from "@mantine/core";
import type { DocumentData } from "firebase/firestore";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { useUser } from "hooks/auth/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { Contact } from "staticData/messages";

import { db } from "../../firebase/firebase";

export const ContactListSideBar = () => {
    const [chatRoom, setChatRoom] = useState<DocumentData>();

    const { data } = useUser();

    const router = useRouter();

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
                    {router?.query?.client && (
                        <MessageListSidebar query={router?.query?.client} />
                    )}
                </Col>
            </Row>
        </div>
    );
};
