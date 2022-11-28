import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mantine/core";
import Image from "next/image";
import React from "react";

import CardBtn from "./CardBtn";

interface UserFollowersProps {
    opened: boolean;
    setShowFollowers: (arg: boolean) => void;
    title: string;
}

export const UserFollowersModal = ({
    opened,
    setShowFollowers,
    title,
}: UserFollowersProps) => {
    return (
        <Modal
            opened={opened}
            onClose={() => setShowFollowers(false)}
            title={title}
            size="lg"
        >
            <div className="user-followers-modal d-flex justify-content-between gap-2">
                <div className="image-description d-flex align-items-center justify-content-start">
                    <figure className="followers-profile-image">
                        <Image
                            src={"/community/gallery1.png"}
                            alt={"profile image"}
                            height={62}
                            width={62}
                        />
                    </figure>
                    <div className="name-description d-flex flex-column  justify-content-center ml-4">
                        <div className="name d-flex align-items-center">
                            <h4 className="pr-5">Aanchal Khadka</h4>{" "}
                            <FontAwesomeIcon
                                icon={faBadgeCheck}
                                className="svg-icon"
                                color="#3EAEFF"
                            />
                        </div>
                        <h5>Individual | Real Estate Business</h5>
                    </div>
                </div>
                <div className="follow-btn d-flex align-items-center">
                    <CardBtn btnTitle={"Follow"} backgroundColor={"#211D4F"} />
                </div>
            </div>
        </Modal>
    );
};
