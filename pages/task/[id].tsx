import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AppliedTaskDetail from "@components/AppliedTask/AppliedTaskDetail";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useTaskDetail } from "hooks/task/use-task-detail";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactQueryKeys } from "types/queryKeys";

const TaskDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: taskDetail } = useTaskDetail((id as string) ?? "");
    return (
        <>
            <AppliedLayout>
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
