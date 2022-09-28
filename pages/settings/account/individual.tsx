import AccountForm from "@components/settings/AccountForm";
import AddBank from "@components/settings/bankDetail";
import KYCForm from "@components/settings/KYCForm";
import { CompleteProfile } from "@components/settings/ProfileForm";
import SettingsLayout from "@components/SettingsLayout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import type { GetStaticProps } from "next";
import { useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import type { UserBankDetails } from "types/bankDetail";
// import React from "react";

const Individual = () => {
    const { data: BankDetails } = useData<UserBankDetails>(
        ["tasker-bank-account"],
        "/tasker/bank-details/"
    );
    const LinkedBank = BankDetails?.data.result;
    const { data: profile } = useGetProfile();
    const [showBankForm, setShowBankForm] = useState(
        !profile && LinkedBank && LinkedBank?.length > 0 ? false : true
    );
    const [showAccountForm, setShowAccountForm] = useState(
        !profile ? false : true
    );

    return (
        <>
            <SettingsLayout>
                {!showBankForm || (!showAccountForm && !profile) ? (
                    <CompleteProfile
                        onClick={() => {
                            scroll.scrollTo(628);
                            //setShowBankForm(true);
                            setShowAccountForm(true);
                        }}
                    />
                ) : (
                    ""
                )}{" "}
                <AccountForm showAccountForm={showAccountForm} />
                <KYCForm />
                <AddBank showBankForm={!profile ? false : true} />
            </SettingsLayout>
        </>
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
