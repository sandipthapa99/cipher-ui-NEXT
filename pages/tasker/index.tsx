// import { GoogleMap } from "@components/GoogleMap";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(
    () => import("@components/GoogleMap").then((mod) => mod.GoogleMap),
    { ssr: false }
);
const TaskerPage: NextPage = () => {
    return (
        <>
            <TaskerLayout>
                <GoogleMap />
            </TaskerLayout>
        </>
    );
};
export default TaskerPage;
