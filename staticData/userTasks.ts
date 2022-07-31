import { randNumber } from "utils/randNumber";

export const DUMMY_USER_TASKS = Array.from({ length: 10 })
    .map((_, index) => index)
    .map((index) => ({
        title: `User task ${index}`,
        location: `Location ${index}`,
        time: `${randNumber(0, 23)}:${randNumber(0, 59)} ${
            Math.random() > 0.5 ? "AM" : "PM"
        }`,
        date: `June ${randNumber(1, 30)}, ${randNumber(2022, 2024)}`,
        distance: `${randNumber(1, 100)} km away`,
        totalApplied: `${randNumber(1, 500)}`,
        postedBy: `User ${randNumber(1, 10)}`,
        description: `Consequatur molestiae voluptas aut. Quam consequatur iusto. Consequatur vitae voluptatem nulla aut harum aspernatur. Minima ut ullam fugiat at qui assumenda consequatur sit.
 
Vel odit voluptatem nam et qui enim est nobis dolores. Perferendis perspiciatis odit. Sit hic mollitia culpa dolores eos. Repudiandae qui qui. Libero repudiandae quis neque placeat sed aliquid. Quo et sed explicabo et rerum architecto molestiae.
 
Pariatur architecto eius quia debitis assumenda magnam. Laudantium et quisquam nesciunt quaerat nihil. Sit aspernatur consequatur excepturi voluptatibus tempora labore quia. Ad impedit est officiis amet laborum voluptas eveniet ea.`,
        requirements: [
            ...Array.from({ length: 6 })
                .map((_, index) => index)
                .map((index) => `Requirement ${index}`),
        ],
        questions: [
            ...Array.from({ length: 4 })
                .map((_, index) => index)
                .map((index) => ({
                    question: `Question ${index}`,
                    answer: `Answer ${index}`,
                })),
        ],
        offeredBy: {
            username: `User ${randNumber(1, 10)}`,
            category: `Category ${randNumber(1, 10)}`,
            profileImage: `https://thispersondoesnotexist.com/image`,
        },
        charge: `${randNumber(1, 100)}`,
        images: [
            "https://picsum.photos/id/0/400/350",
            "https://picsum.photos/id/1/400/350",
            "https://picsum.photos/id/10/400/350",
            "https://picsum.photos/id/100/400/350",
            "https://picsum.photos/id/1000/400/350",
            "https://picsum.photos/id/1001/400/350",
            "https://picsum.photos/id/1002/400/350",
        ],
    }));

export type UserTask = typeof DUMMY_USER_TASKS[0];
export type Question = UserTask["questions"][0];
