import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import { MapboxMap } from "@components/common/MapboxMap";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps } from "next";

const TaskYouMayLike = () => {
    return (
        <>
            <AppliedLayout type={"you may like"}>
                <MapboxMap />
            </AppliedLayout>
        </>
    );
};
export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        await queryClient.prefetchQuery(["all-tasks"]);
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default TaskYouMayLike;
