import { formatDistanceToNow, parseISO } from "date-fns";

export const timeago = (time: any) => {
    try {
        return formatDistanceToNow(parseISO(time), { addSuffix: true });
    } catch (error) {
        return "a while ago";
    }
};
