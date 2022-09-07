import { Skeleton } from "@mantine/core";
import React from "react";

const SkeletonServiceCard = () => {
    return (
        <div className="mantine-Skeleton mb-5 p-5">
            <div className="d-flex justify-content-between">
                <Skeleton height={90} width={"40%"} />

                <Skeleton height={20} mt={6} radius="xl" width={"50%"} />
            </div>
        </div>
    );
};

export default SkeletonServiceCard;
