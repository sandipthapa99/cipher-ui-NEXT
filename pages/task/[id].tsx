import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AppliedTaskDetail from "@components/AppliedTask/AppliedTaskDetail";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useTaskDetail } from "hooks/task/use-task-detail";
import parse from "html-react-parser";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactQueryKeys } from "types/queryKeys";
import extractContent from "utils/extractString";

import { safeParse } from "../../utils/safeParse";
const TaskDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: taskDetail } = useTaskDetail((id as string) ?? "");

    return (
        <>
            <AppliedLayout
                title={taskDetail?.title}
                description={extractContent(taskDetail?.description)}
                keywords={`homaale-task, homaale-task-${taskDetail?.title}`}
                ogImage={taskDetail?.images[0].media}
                ogUrl={`/task/${taskDetail?.slug}`}
            >
                {taskDetail && <AppliedTaskDetail taskDetail={taskDetail} />}
            </AppliedLayout>
        </>
    );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery([ReactQueryKeys.TASK_DETAIL, id]);
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
export default TaskDetail;
