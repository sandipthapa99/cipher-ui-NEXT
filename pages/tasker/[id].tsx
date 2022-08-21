import Layout from "@components/Layout";
import UserTaskDetail from "@components/Task/UserTaskDetail/UserTaskDetail";
import { createStyles } from "@mantine/core";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { taskDetails } from "staticData/taskDetail";

const TaskerDetailPage = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { id: taskId } = router.query;
    const taskDetail =
        taskId && typeof taskId === "string"
            ? taskDetails[parseInt(taskId, 10)]
            : null;

    if (!taskDetail) return <p>Task fot found</p>;
    return (
        <Layout>
            <Container className={classes.container}>
                <UserTaskDetail
                    maxHeaderWidth="80rem"
                    className={classes.userTaskDetailContainer}
                    taskDetail={taskDetail}
                    activeTaskId={1}
                    onExitTaskDetail={() =>
                        router.push({ pathname: "/", hash: "top-taskers" })
                    }
                />
            </Container>
        </Layout>
    );
};
const useStyles = createStyles({
    container: {
        padding: "0 5rem",
        marginTop: "1rem",
    },
    userTaskDetailContainer: {
        backgroundColor: "transparent !important",
        maxHeight: "initial !important",
        maxWidth: "120rem !important",
    },
});
export default TaskerDetailPage;
