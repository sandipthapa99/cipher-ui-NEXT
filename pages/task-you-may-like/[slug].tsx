import AppliedLayout from "@components/AppliedTask/AppliedLayout";
import AppliedTaskDetail from "@components/AppliedTask/AppliedTaskDetail";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ITask } from "types/task";
import { axiosClient } from "utils/axiosClient";

const TaskDetail: NextPage<{ taskDetail: ITask }> = ({ taskDetail }) => {
    return (
        <>
            <AppliedLayout type={"you may like"}>
                <AppliedTaskDetail
                    taskDetail={taskDetail}
                    type={"you may like"}
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

        return {
            props: {
                taskDetail,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                taskDetail: {},
            },
            revalidate: 10,
        };
    }
};
