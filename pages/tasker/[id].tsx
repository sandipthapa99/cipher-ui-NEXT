import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import urls from "constants/urls";
import { connectFirestoreEmulator } from "firebase/firestore";
import { useData } from "hooks/use-data";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITasker } from "types/tasker";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

const TaskerDetail = ({
    taskerService,
}: {
    taskerService: ServicesValueProps;
}) => {
    const { data } = useData<ITasker>(
        ["tasker-detail-data"],
        `${urls.tasker.profile}addc7448-9129-431c-b14c-d6d66e3ea7a4/`
    );
    const tasker = data?.data;
    return (
        <>
            <TaskerLayout
                title={`${tasker?.user?.first_name}${" "}${
                    tasker?.user?.last_name
                }`}
            >
                <UserTaskDetail
                    taskerService={taskerService}
                    taskerDetail={tasker ?? ({} as ITasker)}
                />
            </TaskerLayout>
        </>
    );
};
export default TaskerDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const { data: taskerData } = await axiosClient.get(urls.tasker.list);
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
        const { data: taskerService } =
            await axiosClient.get<ServicesValueProps>(
                `/task/entity/service/?created_by=${params?.id}&is_requested=false`
            );

        return {
            props: {
                taskerService: taskerService,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                taskerService: {},
            },
            revalidate: 10,
        };
    }
};
