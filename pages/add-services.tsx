import { MainStep } from "@components/AddServices/MainStep";
import { PackageDetails } from "@components/AddServices/PackageDetails";
import { ServiceDetails } from "@components/AddServices/ServiceDetails";
import Layout from "@components/Layout";
import { withAuth } from "hoc/withAuth";
import { NextPage } from "next";
import React, { useState } from "react";

const AddServices: NextPage = () => {
    return (
        <Layout title="Add Services &amp; Cipher">
            <MainStep />
        </Layout>
    );
};

export default withAuth(AddServices);
