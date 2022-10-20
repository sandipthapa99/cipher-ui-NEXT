import { Box, Skeleton, Stack } from "@mantine/core";

export const PaymentSuccessSkeleton = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "40rem",
                background: "#fff",
                marginBlock: "2rem",
                borderRadius: "10px",
                padding: "2rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Stack>
                    <Skeleton sx={{ width: "45rem", height: "3rem" }} />
                    <Skeleton
                        sx={{
                            width: "45rem",
                            height: "1rem",
                            marginTop: "2rem",
                        }}
                    />
                    <Skeleton sx={{ width: "45rem", height: "1rem" }} />
                    <Skeleton sx={{ width: "45rem", height: "1rem" }} />
                    <Skeleton sx={{ width: "45rem", height: "1rem" }} />
                    <Skeleton sx={{ width: "45rem", height: "1rem" }} />
                    <Skeleton sx={{ width: "45rem", height: "1rem" }} />
                    <Skeleton sx={{ width: "45rem", height: "1rem" }} />
                    <Skeleton
                        sx={{
                            width: "12rem",
                            height: "4rem",
                            marginTop: "2rem",
                        }}
                    />
                </Stack>
                <Skeleton sx={{ width: "40rem", height: "40rem" }} />
            </Box>
        </Box>
    );
};
