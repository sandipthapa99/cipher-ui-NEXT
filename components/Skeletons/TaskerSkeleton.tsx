import { Box, createStyles, Group, Skeleton, Stack } from "@mantine/core";

interface TaskerSkeletonProps {
    count?: number;
    direction?: "row" | "column";
}
export const TaskerSkeleton = ({
    count = 5,
    direction = "column",
}: TaskerSkeletonProps) => {
    const { classes } = useStyles();

    return (
        <Box
            sx={{
                display: "flex",
                gap: "1rem",
                flexDirection: direction,
                flexWrap: direction === "row" ? "wrap" : "nowrap",
            }}
        >
            {Array.from({ length: count }).map((_, index) => (
                <Box key={index} className={classes.container}>
                    <Stack>
                        <Box className={classes.header}>
                            <Skeleton height={50} circle />
                            <Stack>
                                <Skeleton height={10} width={300} />
                                <Skeleton height={10} width={300} />
                                <Box className={classes.headerIcons}>
                                    <Skeleton height={10} width={40} />
                                    <Skeleton height={10} width={40} />
                                    <Skeleton height={10} width={40} />
                                    <Skeleton height={10} width={40} />
                                </Box>
                            </Stack>
                        </Box>
                        <Skeleton height={5} width={"100%"} />
                        <Skeleton height={5} width={"100%"} />
                        <Skeleton height={5} width={"100%"} />
                        <Box className={classes.footer}>
                            <Group>
                                <Skeleton circle height={20} />
                                <Skeleton circle height={20} />
                            </Group>
                            <Skeleton width={40} height={20} />
                        </Box>
                    </Stack>
                </Box>
            ))}
        </Box>
    );
};
const useStyles = createStyles(() => ({
    container: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "3px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
    },
    headerIcons: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
    },
}));
