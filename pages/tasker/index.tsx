import { MapboxMap } from "@components/common/MapboxMap";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import type { NextPage } from "next";

const TaskerPage: NextPage = () => {
    return (
        <>
            <TaskerLayout>
                <MapboxMap
                    latitude={27.687713889865993}
                    longitude={85.32806957052709}
                />
            </TaskerLayout>
        </>
    );
};
export default TaskerPage;
