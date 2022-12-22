import { format } from "date-fns";

export const formatTime = (time: string) => {
    const [hour, minute, seconds] = time
        .split(":")
        .map((item) => parseInt(item, 10));
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const newDate = new Date(year, month, day, hour, minute, seconds);

    const formattedTime = format(newDate, "p");
    return formattedTime;
};

export const convertTimeStringToDateString = (value: string) =>
    new Date(
        `${new Date().toISOString().split("T")[0]}T${value}`
    ) as unknown as string;
