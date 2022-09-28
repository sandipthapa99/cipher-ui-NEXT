import BigButton from "@components/common/Button";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { animateScroll as scroll } from "react-scroll";

export const AcceptReject = ({
    slug,
    accepted,
}: {
    slug?: string;
    accepted?: boolean | undefined;
}) => {
    const router = useRouter();
    const query = router.query;

    return (
        <div className="d-flex accept-reject-component">
            {/* <div className="reject">
                <BigButton
                    btnTitle={"Reject"}
                    backgroundColor={"#fff"}
                    textColor={"black"}
                    handleClick={() => {
                        setIsRejected(true);
                    }}
                />
            </div> */}

            {!accepted && (
                <div className="accept">
                    <BigButton
                        btnTitle={"Accept"}
                        backgroundColor={"#211D4F"}
                        textColor={"white"}
                        handleClick={() => {
                            //
                            router.push(`/service/${slug}`);
                            if (query.slug?.includes("service")) {
                                scroll.scrollTo(1500);
                            }
                        }}
                    />
                </div>
            )}
            {/* {accepted && (
                <BigButton
                    btnTitle={"Rejected"}
                    backgroundColor={"#211D4F"}
                    textColor={"white"}
                    disabled
                />
            )} */}
        </div>
    );
};
