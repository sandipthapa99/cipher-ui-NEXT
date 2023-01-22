import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AppliedTaskDetail from "@components/AppliedTask/AppliedTaskDetail";
import { QueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ITask, TaskApplicantsProps } from "types/task";
import { axiosClient } from "utils/axiosClient";
import extractContent from "utils/extractString";

const TaskDetail: NextPage<{
    taskDetail: ITask;
    taskApplicants: TaskApplicantsProps;
}> = ({ taskDetail }) => {
    return (
        <>
            <AppliedLayout
                type={"you may like"}
                title={taskDetail?.title}
                description={extractContent(taskDetail?.description)}
                // ogImage={taskDetail?.images[0]?.media}
                ogUrl={`/task/${taskDetail?.slug}`}
                keywords={"homaale-task, task-you-may-like, task"}
            >
                <AppliedTaskDetail
                    type={"you may like"}
                    taskDetail={taskDetail}
                    // taskApplicants={taskApplicants}
                />
            </AppliedLayout>
        </>
    );
};
export default TaskDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: taskDetail } = await axiosClient.get(urls.task.task);
        const paths = taskDetail?.result?.map(({ slug }: ITask) => ({
            params: { slug: slug },
        }));
        return { paths, fallback: true };
    } catch (error: any) {
        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const { data: taskDetail } = await axiosClient.get<ITask>(
            `${urls.task.list}${params?.slug}/`
        );

        const queryClient = new QueryClient();

        await Promise.all([
            queryClient.prefetchQuery(["task-detail"]),
            queryClient.prefetchQuery(["tasks"]),
            queryClient.prefetchQuery(["all-tasks"]),
        ]);
        return {
            props: {
                taskDetail,
                // taskApplicants,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                taskDetail: {},
                taskApplicants: {},
            },
            revalidate: 10,
        };
    }
};
