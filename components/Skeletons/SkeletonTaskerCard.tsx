import { Skeleton, Space } from "@mantine/core";
import React from "react";

const SkeletonTaskerCard = () => {
    return (
        <div className="mantine-Skeleton mb-5 p-5">
            <div className="d-flex justify-content-between">
                <Skeleton height={60} circle mb="xl" />
                <Skeleton height={60} width="70%" mb="xl" />
            </div>
            <Space h={5} />
            <Skeleton height={20} mt={6} width="70%" radius="xl" />
            <Space h={20} />
            <Skeleton height={30} mt={6} radius="xl" />
        </div>
    );
};

export default SkeletonTaskerCard;
