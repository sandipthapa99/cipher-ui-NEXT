const USERS = [
    "Dr Michael Morbius",
    "Milo Morbius",
    "Walter White",
    "Jesse Pinkman",
    "Despacito Lover",
    "Better Call Saul",
];
export const DUMMY_TASKS = Array.from({ length: USERS.length })
    .map((_, index) => index)
    .map((index) => ({
        id: index,
        user: {
            profileImage: "https://thispersondoesnotexist.com/image",
            username: USERS[index],
            category: "Influencer",
            location: "Ganeshpur, NPJ",
            bio: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
        },
        likes: 200,
        rewardPercentage: "95%",
        price: "Rs 1801",
        rating: {
            average: 4.5,
            totalRatings: 400,
        },
    }));

export type Task = typeof DUMMY_TASKS[0];
