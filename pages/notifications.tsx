import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import GetNotifications from "@components/notifications/GetNotifications";
import { withAuth } from "hoc/withAuth";
import React from "react";

function Notifications() {
    return (
        <Layout title="Notifications">
            <Breadcrum currentPage="Notifications" />
            <GetNotifications />
        </Layout>
    );
}

export default withAuth(Notifications);
