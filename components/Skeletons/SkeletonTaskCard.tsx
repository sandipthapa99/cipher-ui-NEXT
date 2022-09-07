import { Divider, Skeleton } from "@mantine/core";
import React from "react";

const SkeletonTaskCard = () => {
    return (
        <div className="mantine-Skeleton mb-5 p-5">
            <div className="d-flex justify-content-between mb-3">
                <Skeleton height={50} width={"20%"} mt={6} />
                <Skeleton height={20} mt={6} radius="xl" width={"60%"} />
            </div>
            <Skeleton
                height={20}
                mt={6}
                radius="xl"
                width={"40%"}
                className="mb-3"
            />
            <Skeleton height={20} mt={6} radius="xl" />
            <Divider my={"xl"} color="#F1F3F5" />
            <Skeleton height={20} mt={6} width={"60%"} radius="xl" />
        </div>
    );
};

export default SkeletonTaskCard;
