export const DUMMY_CLIENT_PROJECTS = Array.from({ length: 3 })
    .map((_, index) => index)
    .map((index) => ({
        id: 1,
        name: `Client Project ${index}`,
        description:
            "We want  a garden cleaner for our bunglow who can great take care of our plants, includes monitoring the health of all plants and greenscapes...",
        date: "June 9, 2022",
        time: "08:11 AM",
        charge: "$20/hr",
    }));

export type ClientProject = typeof DUMMY_CLIENT_PROJECTS[0];
