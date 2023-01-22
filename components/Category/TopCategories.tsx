import { createStyles } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { axiosClient } from "utils/axiosClient";

interface TopCategory {
    id: number;
    category: string;
    slug: string;
}
export const useTopCategories = () => {
    return useQuery(["top-categories"], () =>
        axiosClient
            .get<TopCategory[]>("/task/top-categories/")
            .then((res) => res.data)
    );
};
export const TopCategories = () => {
    const { data: topCategories = [] } = useTopCategories();
    const { classes } = useStyles();
    return (
        <ul className={classes.root}>
            {topCategories.map((category) => (
                <li key={category.id}>
                    <Link href={category.slug}>
                        <a className={classes.link}>{category.category}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
const useStyles = createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.6rem",
    },
    link: {
        color: theme.colors.gray[7],
    },
}));
