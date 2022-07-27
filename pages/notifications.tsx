import Breadcrum from "@components/common/Breadcrum";
import Layout from "@components/Layout";
import GetNotifications from "@components/notifications/GetNotifications";
import React from "react";

function Notifications() {
    return (
        <Layout title="Notifications">
            <Breadcrum currentPage="Notifications" />
            <GetNotifications />
        </Layout>
    );
}

export default Notifications;
