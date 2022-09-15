import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AppliedTaskDetail from "@components/AppliedTask/AppliedTaskDetail";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ITask, TaskApplicantsProps } from "types/task";
import { axiosClient } from "utils/axiosClient";

const TaskDetail: NextPage<{
    taskDetail: ITask;
    taskApplicants: TaskApplicantsProps;
}> = ({ taskDetail, taskApplicants }) => {
    return (
        <>
            <AppliedLayout>
                <AppliedTaskDetail
                    taskApplicants={taskApplicants}
                    taskDetail={taskDetail}
                />
            </AppliedLayout>
        </>
    );
};
export default TaskDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: taskDetail } = await axiosClient.get("/task/");
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
            `/task/${params?.slug}/`
        );
        const { data: taskApplicants } =
            await axiosClient.get<TaskApplicantsProps>(
                `/task/${params?.slug}/applicants/`
            );

        return {
            props: {
                taskDetail,
                taskApplicants,
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
