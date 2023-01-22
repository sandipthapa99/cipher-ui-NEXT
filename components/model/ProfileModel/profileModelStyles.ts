import { createStyles } from "@mantine/styles";

export const useProfileModelStyles = createStyles((_theme) => ({
    root: {
        position: "absolute",
        right: "calc(100% - 5rem)",
        borderRadius: "0.4rem",
        padding: "2.4rem 2.4rem 1.2rem 2.4rem",
        backgroundColor: "#fff",
        minWidth: "28rem",
        margin: "5px 0 0 0",
        boxShadow: "0px 4px 14px rgba(33, 29, 79, 0.1)",
        zIndex: 999,

        "&::before": {
            content: '""',
            position: "absolute",
            top: -10,
            right: "-1px",
            transform: "translateX(-50%)",
            borderWidth: "0 15px 15px 15px",
            boxShadow: "0px 1px 1px 1px rgba(33, 29, 79, 0.1)",
            borderRadius: "5px",
            borderStyle: "solid",
            borderColor: "transparent transparent white transparent",
        },
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
    },
    username: {
        fontSize: "1.6rem",
        color: "#211D4F",
        fontWeight: 700,
    },
    profileType: {
        fontSize: "1.2rem",
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

        svg: {
            fontSize: "2rem",
        },

        "& > li": {
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            transition: "all 0.2s ease-in-out",

            "&::before": {
                position: "absolute",
                content: "''",
                width: "0.20rem",
                height: "100%",
                backgroundColor: "#F98900",
                marginLeft: "-1.5rem",
                opacity: 0,
                visibility: "hidden",
            },
            "&:hover::before": {
                opacity: 1,
                visibility: "visible",
            },
            "&:hover": {
                transform: "translateX(1rem)",
            },
            "&[data-is-active='true']::before": {
                opacity: 1,
                visibility: "visible",
            },
        },
    },
}));
