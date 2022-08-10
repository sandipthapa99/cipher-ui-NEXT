import { MainStep } from "@components/AddServices/MainStep";
import { BreadCrumb } from "@components/common/BreadCrumb";
import Layout from "@components/Layout";
import type { NextPage } from "next";

const AddServices: NextPage = () => {
    return (
        <Layout title="Add Services &amp; Cipher">
            <BreadCrumb currentPage={"Add Service"} />
            <MainStep />
        </Layout>
    );
};

export default AddServices;
