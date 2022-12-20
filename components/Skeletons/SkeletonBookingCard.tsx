import { Grid, Skeleton } from "@mantine/core";
import React from "react";

const SkeletonBookingCard = () => {
    return (
        <div className="mantine-Skeleton mb-5 p-4">
            <Grid className="d-flex justify-content-between">
                <Grid.Col span={6}>
                    <Skeleton height={30} width={"100%"} />
                    <Skeleton height={10} width={"100%"} className="mt-5" />
                    <Skeleton height={10} width={"100%"} className="mt-5" />
                    <Skeleton height={10} width={"100%"} className="mt-2" />
                    <Skeleton height={10} width={"100%"} className="mt-2" />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton height={40} width={"80%"} className="ms-auto" />
                    <Skeleton
                        height={10}
                        width={"50%"}
                        className="mt-2 ms-auto"
                    />
                    <Skeleton
                        height={90}
                        circle
                        mb="xl"
                        className="mt-3 mx-auto"
                    />
                </Grid.Col>
                <Skeleton height={5} width={"100%"} className="ms-auto mx-4" />
                <Skeleton height={10} width={"20%"} className="my-3" />
            </Grid>
        </div>
    );
};

export default SkeletonBookingCard;
