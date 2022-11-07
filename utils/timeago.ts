import { formatDistanceToNow, parseISO } from "date-fns";
//import moment from "moment";
//const dateTimeAgo = moment(new Date(created_at)).fromNow();

export const timeago = (time: any) => {
    console.log("🚀 ~ file: timeago.ts ~ line 13 ~ timeago ~ time", time);

    try {
        return formatDistanceToNow(parseISO(time), { addSuffix: true });
        //return moment(new Date(time)).fromNow();
    } catch (error) {
        return "a while ago";
    }
};
