import { DUMMY_TASKS } from "types/tasks";
import { randNumber } from "utils/randNumber";

export const taskDetails = Array.from({ length: DUMMY_TASKS.length })
    .map((_, index) => index)
    .map((index) => ({
        id: index,
        title: `Task Detail ${index}`,
        user: {
            username: "Its Morbin Time",
            profileImage: "https://thispersondoesnotexist.com/image",
            isOnline: Math.random() > 0.5,
            isVerified: index % 3 === 0,
            happyCustomers: randNumber(500),
            taskCompleted: randNumber(100),
            rewardPercentage: "95%",
            rank: "Bronze",
            location: "Anamnagar, Baneshwor Kathamndu Nepal",
            activeHours: "8:00 AM - 5:00 PM",
            memberSince: "June 9, 2022",
            bio: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
            offeredServices: [
                "Garden Cleaning",
                "Garden Mowing",
                "Garden Mowing",
            ],
        },
        category: "Organization | Garden Services",
        totalRatings: Math.floor(Math.random() * 6) + 1,
        charge: "$35/hr",
    }));

export type TaskDetail = typeof taskDetails[0];
