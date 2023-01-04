import { Box, Loader, Skeleton, Stack } from "@mantine/core";

export const PaymentSuccessSkeleton = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "60rem",
                background: "#fff",
                marginBlock: "3.2rem",
                borderRadius: "10px",
                padding: "3.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#5C5F66",
                }}
            >
                <h2 className="me-3 mb-0">Processing</h2>{" "}
                <Loader color="yellow" variant="dots" size="lg" />
            </Box>
            {/* <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Stack>
                    <Skeleton sx={{ width: "100%", height: "40rem" }} />
                    <Skeleton sx={{ width: "100%", height: "3rem" }} />
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
            </Box> */}
        </Box>
    );
};
