import Footer from "@components/Footer";
import Header from "@components/Header";
import { SearchCategory } from "@components/SearchTask/searchCategory";
import SearchHeader from "@components/SearchTask/searchHeader";
import { UserTaskDetail } from "@components/UserTask/UserTaskDetail";
// import { UserTaskList } from "@components/UserTaskList/UserTaskList";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { DUMMY_USER_TASKS, UserTask } from "staticData/userTasks";

const UserTaskList = dynamic(
    () => import("@components/UserTask/UserTaskList"),
    { ssr: false }
);

export const Accept = () => {
    const [query, setQuery] = useState("");
    const [activeTask, setActiveTask] = useState<UserTask | undefined>();

    const filteredTasks = useMemo(
        () =>
            query
                ? DUMMY_USER_TASKS.filter((task) =>
                      task.title.toLowerCase().includes(query.toLowerCase())
                  )
                : DUMMY_USER_TASKS,
        [query]
    );
    return (
        <>
            <SearchHeader />
            <Header />
            <Container>
                <SearchCategory onChange={setQuery} />
                <div className="accept-task">
                    <UserTaskList
                        onTaskClick={setActiveTask}
                        userTasks={filteredTasks}
                    />
                    {activeTask && <UserTaskDetail task={activeTask} />}
                </div>
            </Container>
            <Footer />
        </>
    );
};
export default Accept;
