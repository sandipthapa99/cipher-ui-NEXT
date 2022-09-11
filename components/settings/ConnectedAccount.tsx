import SocialConnection from "@components/Profile/SocialConnection";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { GetStaticProps } from "next";
import React from "react";
import { socialConnectionValues } from "staticData/socialConnection";
import { axiosClient } from "utils/axiosClient";

interface linkedAccountProps {
    id: 0;
    provider: string;
    uid: string;
    extra_data: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
    };
    created: string;
    modified: string;
    user: string;
}
const ConnectedAccount = () => {
    const { data: linkedAccounts } = useData<linkedAccountProps>(
        ["linked-accounts"],
        "/user/linked-accounts/list/"
    );

    console.log("linked accounts=", linkedAccounts);

    return (
        <div className="account-form">
            <h2>Connected Accounts</h2>
            <div className="d-flex">
                {socialConnectionValues.map((values, key) => (
                    <SocialConnection key={key} values={values} />
                ))}
            </div>
        </div>
    );
};

export default ConnectedAccount;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const queryClient = new QueryClient();
        const { data: linkedAccounts } = await axiosClient.get(
            "/user/linked-accounts/list/"
        );
        queryClient.prefetchQuery(["linked-accounts"]);
        return {
            props: {
                linkedAccounts,
                dehydratedState: dehydrate(queryClient),
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                linkedAccounts: [],
            },
            revalidate: 10,
        };
    }
};
