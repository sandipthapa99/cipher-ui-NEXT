import { ContactList } from "@components/Message/ContactList";
import { MessageListSidebar } from "@components/Message/MessageListSidebar";
import { ScrollArea } from "@mantine/core";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { Contact } from "staticData/messages";

interface ContactsProps {
    contacts: Contact[];
}
export const ContactListSideBar = ({ contacts }: ContactsProps) => {
    const [activeContact, setActiveContact] = useState<Contact | undefined>();

    const removeActiveContact = () => setActiveContact(undefined);
    return (
        <div className="contact-sidebar">
            <Row>
                <Col md={3}>
                    <ScrollArea
                        style={{ height: 700 }}
                        offsetScrollbars
                        scrollbarSize={6}
                    >
                        <ContactList
                            title="Today"
                            contacts={contacts}
                            onContactClick={setActiveContact}
                        />
                        <ContactList
                            title="Earlier"
                            contacts={contacts}
                            onContactClick={setActiveContact}
                        />
                    </ScrollArea>
                </Col>
                <Col md={9}>
                    <ScrollArea
                        style={{ height: 700, width: "100%" }}
                        offsetScrollbars
                        scrollbarSize={6}
                    >
                        {activeContact !== undefined && (
                            <MessageListSidebar
                                onBackClick={removeActiveContact}
                                contact={activeContact}
                            />
                        )}
                    </ScrollArea>
                </Col>
            </Row>
        </div>
    );
};
