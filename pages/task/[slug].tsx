import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AppliedTaskDetail from "@components/AppliedTask/AppliedTaskDetail";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ITask, TaskApplicantsProps } from "types/task";
import { axiosClient } from "utils/axiosClient";

const TaskDetail: NextPage<{
    taskDetail: ITask;
    // taskApplicants: TaskApplicantsProps;
}> = ({ taskDetail }) => {
    return (
        <>
            <AppliedLayout>
                <AppliedTaskDetail
                    // taskApplicants={taskApplicants}
                    taskDetail={taskDetail}
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

        // queryClient.prefetchQuery(["my-bookings"]);

        return {
            props: {
                taskDetail,
                //   taskApplicants,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                taskDetail: {},
                //taskApplicants: [],
            },
            revalidate: 10,
        };
    }
};
