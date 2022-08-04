import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import type { Contact } from "staticData/messages";

export interface ContactListProps {
    title: string;
    contacts: Contact[];
    onContactClick: (contact: Contact) => void;
}
export const ContactList = ({
    title,
    contacts,
    onContactClick,
}: ContactListProps) => {
    const lastMessageDate = (dateString: string) => {
        const date = new Date(dateString);
        const currentDay = format(date, "cccc");
        const currentTime = format(date, "p");
        return `${currentDay} ${currentTime}`;
    };
    const renderContacts = () => {
        return contacts.map((contact) => (
            <div
                role="button"
                aria-labelledby="Open contact"
                key={contact.id}
                className="contact-list__item"
                onClick={() => onContactClick(contact)}
            >
                <Image
                    src={contact.profileImage}
                    width="50px"
                    height="50px"
                    alt="Contact profile image"
                    className="rounded-circle"
                />
                <div className="contact-list__item--info">
                    <h4 className="title">{contact.name}</h4>
                    <p className="last-message">{contact.lastMessage}</p>
                    <span className="last-message-date">
                        {lastMessageDate(contact.lastMessageCreatedAt)}
                    </span>
                </div>
            </div>
        ));
    };
    return (
        <div className="contact-list">
            <h4 className="contact-list__title">{title}</h4>
            <div>{renderContacts()}</div>
        </div>
    );
};
