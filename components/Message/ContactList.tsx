import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export interface ContactListProps {
    contactId: string;
    title: string;
    contacts: {
        userInfo: { displayName: string; photoURL: string; uid: string };
        lastMessage: { text: string };
        date: { seconds: number; nanoseconds: string };
    };
}
export const ContactList = ({ contactId, contacts }: ContactListProps) => {
    const router = useRouter();
    const renderContacts = () => {
        let date;
        if (contacts?.date?.seconds) {
            date = new Date(contacts?.date?.seconds);
        }
        const formatedDay = date && format(new Date(date), "EEEE");
        const formatedTime = date && format(new Date(date), "p");
        return (
            <div
                role="button"
                aria-labelledby="Open contact"
                key={contactId}
                className="contact-list__item align-items-center"
                onClick={() =>
                    router.push({
                        pathname: "/client/message",
                        query: {
                            client: contacts?.userInfo?.uid,
                            chatId: contactId,
                        },
                    })
                }
            >
                <Image
                    src={
                        contacts?.userInfo?.photoURL ??
                        "/userprofile/unknownPerson.jpg"
                    }
                    width="50px"
                    height="50px"
                    alt="Contact profile image"
                    className="rounded-circle"
                />
                <div className="contact-list__item--info">
                    <h4 className="title">{contacts?.userInfo?.displayName}</h4>
                    <p className="last-message mb-0">
                        {contacts?.lastMessage?.text}
                    </p>
                    <span className="last-message-date">
                        {formatedDay}, {formatedTime}
                    </span>
                </div>
            </div>
        );
    };
    return (
        <div className="contact-list">
            {/* <h4 className="contact-list__title">{title}</h4> */}
            <div>{renderContacts()}</div>
        </div>
    );
};
