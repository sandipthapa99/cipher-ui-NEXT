import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AdvertisementCard from "@components/common/AdvertisementCard";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { ReactQueryKeys } from "types/queryKeys";

const NearbyTasksMap = dynamic(
    () => import("@components/Task/NearbyTasksMap"),
    {
        ssr: false,
    }
);
const AppliedTask = () => {
    return (
        <AppliedLayout>
            <NearbyTasksMap />
            <AdvertisementCard
                title="Gardening Services"
                type="The Merch"
                currency="Rs"
                price="1250.00"
                buttonTitle="Book Now"
                cardImage="/service-details/garden-cleaning.png"
            />
        </AppliedLayout>
    );
};
export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        await queryClient.prefetchQuery([ReactQueryKeys.TASKS]);
        await queryClient.prefetchQuery(["get-my-bookings"]);
        await queryClient.prefetchQuery(["my-requested-task"]);
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default AppliedTask;
