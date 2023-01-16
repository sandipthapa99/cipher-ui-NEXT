import WelcomeUser from "@components/common/WelcomeUser";
import Layout from "@components/Layout";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Container } from "react-bootstrap";
// this gets rid of the hydration error
// since the data required for this component comes from localstorage, there's no need for ssr
const ApplyPost = dynamic(() => import("../components/PostTask/ApplyPost"), {
    ssr: false,
});
const Home: NextPage = () => {
    return (
        <Layout title="Home | Homaale">
            <section className="post-task">
                <div className="post-task__search-header">
                    <Container fluid="xl">
                        <WelcomeUser />
                    </Container>
                </div>
                <Container fluid="xl" className="px-3 px-sm-5">
                    <ApplyPost />
                </Container>
            </section>
        </Layout>
    );
};

export default Home;
