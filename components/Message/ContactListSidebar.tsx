import { ContactList } from "@components/Message/ContactList";
import { MessageListSidebar } from "@components/Message/MessageListSidebar";
import { useState } from "react";
import type { Contact } from "staticData/messages";

interface ContactsProps {
    contacts: Contact[];
}
export const ContactListSideBar = ({ contacts }: ContactsProps) => {
    const [activeContact, setActiveContact] = useState<Contact | undefined>();

    const removeActiveContact = () => setActiveContact(undefined);
    return (
        <div className="contact-sidebar">
            <div className="contact-sidebar__contacts">
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
            </div>
            {activeContact !== undefined && (
                <div className="aside-detail-wrapper flex-fill">
                    <MessageListSidebar
                        onBackClick={removeActiveContact}
                        contact={activeContact}
                    />
                </div>
            )}
        </div>
    );
};
