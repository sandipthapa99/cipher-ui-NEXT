import { MainStep } from "@components/AddServices/MainStep";
import Layout from "@components/Layout";
import { withAuth } from "hoc/withAuth";
import { NextPage } from "next";

const AddServices: NextPage = () => {
    return (
        <Layout title="Add Services &amp; Cipher">
            <MainStep />
        </Layout>
    );
};

export default withAuth(AddServices);
