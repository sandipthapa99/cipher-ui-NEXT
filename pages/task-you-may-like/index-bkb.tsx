import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@components/Task/NearbyTasksMap"), {
    ssr: false,
});

const TaskYouMayLike = () => {
    return (
        <>
            {/* <AppliedLayout
                type={"you may like"}
                title={"Task you may like"}
                description={
                    "We have got a bunch of tasks you may like. Browse them."
                }
                keywords={"homaale-task-you-may-like homaale-task"}
            >
                <GoogleMap />
            </AppliedLayout> */}
        </>
    );
};
// export const getStaticProps: GetStaticProps = async () => {
//     const queryClient = new QueryClient();
//     try {
//         await queryClient.prefetchQuery(["all-tasks"]);
//         return {
//             props: {
//                 dehydratedState: dehydrate(queryClient),
//             },
//         };
//     } catch (error) {
//         return { props: {} };
//     }
// };

export default TaskYouMayLike;
