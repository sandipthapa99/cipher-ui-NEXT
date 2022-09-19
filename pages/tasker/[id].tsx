import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import urls from "constants/urls";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ServicesValueProps } from "types/serviceCard";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

const TaskerDetail = ({
    tasker,
    taskerService,
}: {
    tasker: TaskerProps["result"][0];
    taskerService: ServicesValueProps;
}) => {
    return (
        <>
            <TaskerLayout>
                <UserTaskDetail
                    taskerService={taskerService}
                    taskerDetail={tasker}
                />
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
            `${urls.tasker.profile}${params?.id}/`
        );
        const { data: taskerService } =
            await axiosClient.get<ServicesValueProps>(
                `${urls.task.service_per_user}${params?.id}`
            );

        return {
            props: {
                tasker: data,
                taskerService,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                tasker: {},
                taskerService: {},
            },
            revalidate: 10,
        };
    }
};
