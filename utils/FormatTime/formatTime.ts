import { format } from "date-fns";

export const formatTime = (time: string) => {
    const timeInfo = time.split(":").map((item) => parseInt(item, 10));
    if (timeInfo.length !== 3) throw new Error("Invalid time provided");

    const [hour, minute, seconds] = timeInfo;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const dateToFormat = new Date(year, month, day, hour, minute, seconds);
    const formattedTime = format(dateToFormat, "hh:mm:ss");
    return formattedTime;
};
