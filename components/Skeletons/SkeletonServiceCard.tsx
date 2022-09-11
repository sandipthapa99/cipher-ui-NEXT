import { Grid, Skeleton } from "@mantine/core";
import React from "react";

const SkeletonServiceCard = () => {
    return (
        <div className="mantine-Skeleton mb-5 p-4">
            <Grid className="d-flex justify-content-between">
                <Grid.Col span={6}>
                    <Skeleton height={90} width={"100%"} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton height={10} width={"100%"} className="my-2" />
                    <Skeleton height={10} width={"100%"} className="my-3" />
                    <Skeleton height={10} width={"100%"} className="my-3" />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default SkeletonServiceCard;
