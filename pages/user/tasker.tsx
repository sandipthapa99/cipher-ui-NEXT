import Layout from "@components/Layout";
import { UserTasker } from "@components/user/UserTasker";

const Tasker = () => {
    return (
        <Layout
            title="User Tasker"
            description="Homaale User tasker page. Join homaale as a tasker to enjoy its advantages"
            keywords="homaale-tasker, homaale tasker"
        >
            <UserTasker />
        </Layout>
    );
};
export default Tasker;
