import { createStyles } from "@mantine/styles";

export const useProfileModelStyles = createStyles((theme) => ({
    root: {
        position: "absolute",
        right: "calc(100% - 5rem)",
        borderRadius: "0.4rem",
        padding: "2.7rem 2.4rem",
        backgroundColor: "#fff",
        minWidth: "28rem",
        boxShadow: "0px 4px 14px rgba(33, 29, 79, 0.1);",
        zIndex: 100,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
    },
    username: {
        fontSize: "1rem",
        color: "#211D4F",
        fontWeight: 700,
    },
    profileType: {
        fontSize: "0.875rem",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    bodyItem: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",

        "& > li": {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
        },
    },
}));
