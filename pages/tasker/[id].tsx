import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import { Loader, Skeleton } from "@mantine/core";
import urls from "constants/urls";
import { connectFirestoreEmulator } from "firebase/firestore";
import { useUser } from "hooks/auth/useUser";
import { useData } from "hooks/use-data";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import type { ServicesValueProps } from "types/serviceCard";
import type { ITasker } from "types/tasker";
import type { TaskerProps } from "types/taskerProps";
import { axiosClient } from "utils/axiosClient";

const TaskerDetail = ({
    taskerService,
}: {
    taskerService: ServicesValueProps;
}) => {
    const router = useRouter();

    const { data, isLoading } = useData<ITasker>(
        ["tasker-detail-data", router.query.id],
        `${urls.tasker.profile}${router.query.id}/`,
        !!router.query.id
    );
    const tasker = data?.data;
    const { data: userData } = useUser();
    const taskerHimself = userData?.id === data?.data?.user?.id;

    return (
        <>
            <TaskerLayout
                title={`${tasker?.user?.first_name}${" "}${
                    tasker?.user?.last_name
                }`}
                description={tasker?.bio}
                ogImage={tasker?.profile_image}
                ogUrl={`/tasker/${tasker?.id}`}
                keywords={`tasker-homaale, ${tasker?.id}, ${tasker?.user.first_name}, ${tasker?.user?.last_name}`}
            >
                {!isLoading ? (
                    <UserTaskDetail
                        taskerService={taskerService}
                        taskerDetail={tasker ?? ({} as ITasker)}
                        taskerHimself={taskerHimself}
                    />
                ) : (
                    <div className="bg-white p-5">
                        <Skeleton height={100} circle mb="xl" />
                        <Skeleton height={20} radius="xl" />
                        <Skeleton height={20} mt={6} radius="xl" />
                    </div>
                )}
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
