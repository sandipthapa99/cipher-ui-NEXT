import { GoogleMap } from "@components/GoogleMap";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import type { NextPage } from "next";

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
