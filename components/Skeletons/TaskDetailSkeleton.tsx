import { Box, createStyles, Group, Skeleton, Stack } from "@mantine/core";

export const TaskDetailSkeleton = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes.root}>
            <Stack spacing="md">
                <Skeleton height={20} width={120} />
                <Skeleton height={20} width={320} />
                <Box className={classes.headerIcons}>
                    <Skeleton height={20} width={240} />
                    <Group>
                        <Skeleton height={20} width={60} />
                        <Skeleton height={20} width={60} />
                        <Skeleton height={20} width={20} />
                    </Group>
                </Box>
                <Box className={classes.detailBody}>
                    <Skeleton height={400} sx={{ flex: 1 }} />
                    <Skeleton height={400} width={320} />
                </Box>
            </Stack>
        </Box>
    );
};
const useStyles = createStyles(() => ({
    root: {
        backgroundColor: "#fff",
        padding: "1.6rem 2.4rem",
    },
    headerIcons: {
        display: "flex",
        justifyContent: "space-between",
    },
    detailBody: {
        display: "flex",
        justifyContent: "space-between",
        gap: "2rem",
    },
}));
