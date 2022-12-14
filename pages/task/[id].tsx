import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AppliedTaskDetail from "@components/AppliedTask/AppliedTaskDetail";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { useTaskDetail } from "hooks/task/use-task-detail";
import { useData } from "hooks/use-data";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactQueryKeys } from "types/queryKeys";
import type { ITask } from "types/task";
import extractContent from "utils/extractString";

const TaskDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: taskDetail } = useTaskDetail((id as string) ?? "");

    const { data: taskDetails } = useData<ITask>(
        ["task-detail", id],
        `${urls.task.list}/${id}`
    );
    return (
        <>
            <AppliedLayout
                title={taskDetail?.title}
                description={extractContent(taskDetail?.description)}
                keywords={`homaale-task, homaale-task-${taskDetail?.title}`}
                ogImage={taskDetail?.images[0]?.media}
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
    await Promise.all([
        queryClient.prefetchQuery([ReactQueryKeys.TASK_DETAIL, id]),
        queryClient.prefetchQuery(["task-detail"]),
        queryClient.prefetchQuery(["tasks"]),
        queryClient.prefetchQuery(["all-tasks"]),
    ]);
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
export default TaskDetail;
