import { FacebookLogin } from "@components/auth/FacebookLogin";
import BigButton from "@components/common/Button";
import Google from "@components/Google/Google";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import PasswordModalCard from "./PasswordModal";

interface AccountInfo {
    name: string;
    uid?: string;
    connected?: boolean;
    id?: number;
    facebookName?: string;
}

const ConnectAccount = ({
    name,
    facebookName,
    connected,
    uid,
    id,
}: AccountInfo) => {
    const [show, setShow] = useState(false);

    // const disconnectAccount = (id: number) => {
    //     mutate(id, {
    //         onSuccess: async () => {
    //             toast.success(``);
    //             // queryClient.invalidateQueries([
    //             //     `tasker-${modalName}`,
    //             // ]);
    //         },
    //         onError: (error) => {
    //             console.log("id=", id);
    //             toast.error(error.message);
    //         },
    //     });
    // };
    return (
        <>
            <div className="account-wrapper">
                <div className="social-connection  me-4">
                    {/* <span className="d-flex flex-col align-items-center justify-content-center my-4"> */}
                    <div className="d-flex align-items-center justify-content-center">
                        <FontAwesomeIcon
                            icon={name === "google" ? faGoogle : faFacebookF}
                            className={`${
                                name === "google"
                                    ? "google-icon svg-icon"
                                    : "svg-icon facebook-icon"
                            }`}
                        />
                    </div>

                    <h4 className="text-center">{name ? name : "Facebook"}</h4>
                    {/* </span> */}
                    <p>
                        {connected
                            ? name === "google"
                                ? uid
                                : facebookName
                            : `You are not signed in through ${name}.`}
                    </p>
                    <div className="d-flex button-wrapper align-items-stretch justify-content-center my-4">
                        {connected ? (
                            <BigButton
                                btnTitle={"Disconnect"}
                                backgroundColor={"#211d4f"}
                                textColor={"#fff"}
                                handleClick={() => {
                                    setShow(true);

                                    //disconnectAccount(id);
                                }}
                            />
                        ) : name === "Google" ? (
                            <Google login={false} />
                        ) : (
                            <FacebookLogin login={false} />
                        )}
                    </div>
                    <PasswordModalCard
                        id={id}
                        show={show}
                        setShowForm={setShow}
                        handleClose={() => setShow(false)}
                    />
                </div>
            </div>
        </>
    );
};

export default ConnectAccount;
