import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

const TaskerDetail = ({ tasker }: { tasker: TaskerProps["result"][0] }) => {
    return (
        <>
            <TaskerLayout>
                <UserTaskDetail taskerDetail={tasker} />
            </TaskerLayout>
        </>
    );
};
export default TaskerDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: taskerData } = await axiosClient.get("/tasker/");
        const paths = taskerData?.result?.map(
            ({ user: { id } }: TaskerProps["result"][0]) => ({
                params: { id: id },
            })
        );
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
        const { data } = await axiosClient.get<TaskerProps["result"][0]>(
            `/tasker/profile/${params?.id}/`
        );

        return {
            props: {
                tasker: data,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                tasker: {},
            },
            revalidate: 10,
        };
    }
};
