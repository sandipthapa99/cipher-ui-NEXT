import { ContactList } from "@components/Message/ContactList";
import { useState } from "react";
import { Contact, TODAY_CONTACTS } from "staticData/messages";

interface ContactsProps {
    contacts: Contact[];
}
export const ContactListSideBar = ({ contacts }: ContactsProps) => {
    const [activeContact, setActiveContact] = useState<Contact | undefined>();
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
        </div>
    );
};
