import AppliedLayout from "@components/AppliedTask/AppliedLayout";
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
        </AppliedLayout>
    );
};
export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        await queryClient.prefetchQuery([ReactQueryKeys.TASKS]);
        await queryClient.prefetchQuery(["get-my-bookings"]);
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
