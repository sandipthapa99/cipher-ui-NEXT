import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { GetStaticProps } from "next";
import { axiosClient } from "utils/axiosClient";

import ConnectAccount from "./ConnectAccount";

export type LinkedAccountProps = LinkedAccount[];

export interface LinkedAccount {
    id: number;
    provider: string;
    uid: string;
    extra_data: ExtraData;
    created: string;
    modified: string;
    user: string;
}

export interface ExtraData {
    hd: string;
    aud: string;
    azp: string;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    nbf: number;
    sub: string;
    name: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
    email_verified: boolean;
}

const ConnectedAccount = () => {
    const { data: linkedAccounts } = useData<LinkedAccountProps>(
        ["linked-accounts"],
        "/user/linked-accounts/list/"
    );

    return (
        <div className="account-form">
            <h2>Connected Accounts</h2>
            <div className="account-wrapper">
                {linkedAccounts && linkedAccounts?.data.length > 1 ? (
                    linkedAccounts?.data.map((values, key) => (
                        <ConnectAccount
                            connected={true}
                            name={values?.provider.substring(
                                values?.provider.indexOf("-"),
                                0
                            )}
                            uid={values.uid}
                            id={values.id}
                            key={values.id}
                            facebookName={values.extra_data.name}
                        />
                    ))
                ) : linkedAccounts?.data.length === 1 ? (
                    linkedAccounts?.data.map((values, key) =>
                        values.provider !== "google-oauth2" ? (
                            <>
                                <ConnectAccount
                                    connected={true}
                                    name={values?.provider.substring(
                                        values?.provider.indexOf("-"),
                                        0
                                    )}
                                    uid={values.uid}
                                    id={values.id}
                                    key={values.id}
                                    facebookName={values.extra_data.name}
                                />
                                <ConnectAccount
                                    connected={false}
                                    name={"Google"}
                                />
                            </>
                        ) : (
                            <>
                                <ConnectAccount
                                    connected={true}
                                    name={values?.provider.substring(
                                        values?.provider.indexOf("-"),
                                        0
                                    )}
                                    uid={values.uid}
                                    id={values.id}
                                    key={values.id}
                                    facebookName={values.extra_data.name}
                                />
                                <ConnectAccount
                                    connected={false}
                                    name={"Facebook"}
                                />
                            </>
                        )
                    )
                ) : (
                    <>
                        <ConnectAccount connected={false} name={"Facebook"} />
                        <ConnectAccount connected={false} name={"Google"} />
                    </>
                )}
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
