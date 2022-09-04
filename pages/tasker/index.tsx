import { MapboxMap } from "@components/common/MapboxMap";
import {
    useClearSearchedServices,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import { usePageExit } from "hooks/use-page-exit";
import type { NextPage } from "next";

const TaskerPage: NextPage = () => {
    const clearSearchedServices = useClearSearchedServices();
    const clearSearchQuery = useClearSearchQuery();
    usePageExit(() => {
        clearSearchedServices();
        clearSearchQuery();
    });
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
