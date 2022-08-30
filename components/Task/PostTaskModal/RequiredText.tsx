import type { TextProps } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { Text } from "@mantine/core";
import React from "react";

export const RequiredText = ({ children, className, ...rest }: TextProps) => {
    const { classes } = useStyles();
    return (
        <Text className={`${classes.text} ${className}`} {...rest}>
            {children}
        </Text>
    );
};
const useStyles = createStyles(() => ({
    text: {
        position: "relative",
        maxWidth: "fit-content",
        fontWeight: "bold",
        color: "#212529",
        fontSize: "1.35rem",
        "&::before": {
            position: "absolute",
            content: '"*"',
            top: "50%",
            transform: "translateY(-50%)",
            right: "-1.5rem",
            color: "red",
        },
    },
}));
