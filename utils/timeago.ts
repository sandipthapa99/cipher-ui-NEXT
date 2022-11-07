import { formatDistanceToNow, parseISO } from "date-fns";
//import moment from "moment";

export const timeago = (time: any) => {
    try {
        return formatDistanceToNow(parseISO(time), { addSuffix: true });
        //return moment(new Date(time)).fromNow();
    } catch (error) {
        return "a while ago";
    }
};
