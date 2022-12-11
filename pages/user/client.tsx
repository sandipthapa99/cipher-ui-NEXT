import Layout from "@components/Layout";
import { UserClient } from "@components/user/UserClient";

const Client = () => {
    return (
        <Layout
            title="User Tasker"
            description="Homaale User client page. Join homaale as a client to enjoy its advantages"
            keywords="homaale-client, homaale client"
        >
            <UserClient />
        </Layout>
    );
};
export default Client;
