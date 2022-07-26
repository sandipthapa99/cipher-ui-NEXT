import { DUMMY_TASKS } from "types/tasks";

export const taskDetails = Array.from({ length: DUMMY_TASKS.length })
    .map((_, index) => index)
    .map((index) => ({
        id: index,
        title: `Task Detail ${index}`,
        user: {
            username: "Its Morbin Time",
            profileImage: "https://thispersondoesnotexist.com/image",
            isOnline: index % 2 === 0,
            isVerified: index % 3 === 0,
        },
        bio: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
        category: "Organization | Garden Services",
        totalRatings: 4,
        charge: "$35/hr",
        location: "Anamnagar, Baneshwor Kathamndu Nepal",
        activeHours: "8:00 AM - 5:00 PM",
        memberSince: "June 9, 2022",
        offeredServices: ["Garden Cleaning", "Garden Mowing", "Garden Mowing"],
        rewardPercentage: "95%",
        upvotes: 200,
        rank: "Bronze",
    }));

export type TaskDetail = typeof taskDetails[0];
