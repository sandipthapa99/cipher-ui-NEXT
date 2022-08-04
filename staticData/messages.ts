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
        name: "Dr Michael Morbius",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        messages: DUMMY_MESSAGES,
    },
    {
        name: "Milo Morbius",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        messages: DUMMY_MESSAGES,
    },
    {
        name: "Ricardo Milos",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        messages: DUMMY_MESSAGES,
    },
    {
        name: "John Xina",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        messages: DUMMY_MESSAGES,
    },
    {
        name: "EDP445",
        profileImage: "http://thispersondoesnotexist.com/image",
        isOnline: randBoolean(),
        messages: DUMMY_MESSAGES,
    },
];

export type Contact = typeof DUMMY_CONTACTS[0];
export type Message = typeof DUMMY_MESSAGES[0];
