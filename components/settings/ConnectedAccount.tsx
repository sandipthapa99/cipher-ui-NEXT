import BigButton from "@components/common/Button";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { GetStaticProps } from "next";
import React from "react";
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
    console.log(
        "🚀 ~ file: ConnectedAccount.tsx ~ line 43 ~ ConnectedAccount ~ linkedAccounts",
        linkedAccounts
    );

    return (
        <div className="account-form">
            <h2>Connected Accounts</h2>
            <div className="account-wrapper">
                {linkedAccounts?.data &&
                    linkedAccounts?.data.map((values, key) => (
                        // <SocialConnection key={key} values={linkedAccounts} />
                        <div className="social-connection me-4" key={values.id}>
                            {/* <span className="d-flex flex-col align-items-center justify-content-center my-4"> */}
                            <div className="d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon
                                    icon={
                                        values.provider === "google-oauth2"
                                            ? faGoogle
                                            : faFacebookF
                                    }
                                    className="svg-icon google"
                                />
                            </div>

                            <h4 className="text-center">
                                {values?.provider.substring(
                                    values?.provider.indexOf("-"),
                                    0
                                )}
                            </h4>
                            {/* </span> */}
                            <p>{values.uid}</p>
                            <div className="d-flex button-wrapper align-items-stretch justify-content-center my-4">
                                {/* <Button className="btn close-btn px-5">
                                    Update
                                </Button> */}
                                <BigButton
                                    btnTitle={"Update"}
                                    backgroundColor={"#211d4f"}
                                    textColor={"#fff"}
                                    //  handleClick={handleCloseModal}
                                />
                                <div className="delete-wrapper">
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        className="svg-icon"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                {linkedAccounts?.data &&
                    linkedAccounts.data.map((values, key) =>
                        values.provider !== "facebook-oauth2" ? (
                            <ConnectAccount name={"Facebook"} />
                        ) : (
                            ""
                        )
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
