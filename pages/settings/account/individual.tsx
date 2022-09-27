import AccountForm from "@components/settings/AccountForm";
import AddBank from "@components/settings/bankDetail";
import KYCForm from "@components/settings/KYCForm";
import SettingsLayout from "@components/SettingsLayout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import type { GetStaticProps } from "next";

// import React from "react";

const Individual = () => {
    const { data: KycData } = useGetKYC();
    return (
        <SettingsLayout>
            <AccountForm />
            <KYCForm />
            <AddBank />
        </SettingsLayout>
    );
};

export default Individual;

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        await Promise.all([queryClient.prefetchQuery(["tasker-bank-account"])]);
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (err) {
        return {
            props: {
                linkedAccounts: [],
            },
        };
    }
};
