export default function extractContent(s: any) {
    const content_holder = s?.replace(/<(?:.|\n)*?>/gm, "");
    return content_holder;
}
