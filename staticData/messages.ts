import { randBoolean, randPastDate, randText, randUuid } from "@ngneat/falso";

export const DUMMY_MESSAGES = Array.from({ length: 50 })
    .map((_, index) => index)
    .map(() => ({
        id: randUuid(),
        text: randText(),
        createdAt: randPastDate().toISOString(),
        user: {
            id: randBoolean() ? "current-logged-in-user-id" : randUuid(),
        },
    }));

export const DUMMY_CONTACTS = [
    {
        id: randUuid(),
        name: "Dr Michael Morbius",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        isFavorite: randBoolean(),
        lastMessage: randText(),
        lastMessageCreatedAt: randPastDate().toISOString(),
        messages: DUMMY_MESSAGES,
    },
    {
        id: randUuid(),
        name: "Milo Morbius",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        isFavorite: randBoolean(),
        lastMessage: randText(),
        lastMessageCreatedAt: randPastDate().toISOString(),
        messages: DUMMY_MESSAGES,
    },
    {
        id: randUuid(),
        name: "Ricardo Milos",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        isFavorite: randBoolean(),
        lastMessage: randText(),
        lastMessageCreatedAt: randPastDate().toISOString(),
        messages: DUMMY_MESSAGES,
    },
    {
        id: randUuid(),
        name: "John Xina",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        isFavorite: randBoolean(),
        lastMessage: randText(),
        lastMessageCreatedAt: randPastDate().toISOString(),
        messages: DUMMY_MESSAGES,
    },
    {
        id: randUuid(),
        name: "EDP445",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        isFavorite: randBoolean(),
        lastMessage: randText(),
        lastMessageCreatedAt: randPastDate().toISOString(),
        messages: DUMMY_MESSAGES,
    },
];
export const TODAY_CONTACTS = DUMMY_CONTACTS.filter((contact) =>
    contact.messages.some(
        (message) =>
            new Date(message.createdAt).getTime() === new Date().getTime()
    )
);
export const EARLIER_CONTACTS = DUMMY_CONTACTS.filter((contact) =>
    TODAY_CONTACTS.some((todayContact) => todayContact.id !== contact.id)
);
export type Contact = typeof DUMMY_CONTACTS[0];
export type Message = typeof DUMMY_MESSAGES[0];
