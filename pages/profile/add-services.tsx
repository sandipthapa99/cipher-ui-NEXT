import { MainStep } from "@components/AddServices/MainStep";
import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import type { NextPage } from "next";

const AddServices: NextPage = () => {
    return (
        <Layout title="Add Services &amp; Cipher">
            <Breadcrum currentPage={"Add Service"} />
            <MainStep />
        </Layout>
    );
};

export default AddServices;
