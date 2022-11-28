import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mantine/core";
import { QueryClient, useMutation } from "@tanstack/react-query";
import urls from "constants/urls";
import Image from "next/image";
import React from "react";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

import CardBtn from "./CardBtn";

interface FollowersData {
    id: string;
    username: string;
    email: string;
    phone: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    profile_image: string;
    bio: string;
    created_at: string;
    is_profile_verified: boolean;
    is_following: boolean;
    is_followed: boolean;
    user_type: string;
    designation: string;
}
interface UserFollowersProps {
    opened: boolean;
    setShowFollowers: (arg: boolean) => void;
    title: string;
    followersData: FollowersData[];
}

interface FollowMutationData {
    user: string;
    follow: boolean;
}

export const UserFollowersModal = ({
    opened,
    setShowFollowers,
    title,
    followersData,
}: UserFollowersProps) => {
    const followMutation = useMutation((data: FollowMutationData) => {
        return axiosClient.post(urls.follow, data);
    });

    const queryClient = new QueryClient();

    const handleFollowClick = (user: string, type: string) => {
        followMutation.mutate(
            { user, follow: type === "follow" ? true : false },
            {
                onSuccess: () => {
                    type === "follow"
                        ? toast.success("followed successfully")
                        : toast.success("Unfollowed successfully");
                    queryClient.invalidateQueries(["followers"]);
                    queryClient.invalidateQueries(["followings"]);
                },
            }
        );
    };
    return (
        <Modal
            opened={opened}
            onClose={() => setShowFollowers(false)}
            title={title}
            size="lg"
        >
            {followersData?.map((item: FollowersData, index: number) => {
                const user_type: string[] = item?.user_type
                    ? JSON.parse(item?.user_type)
                    : [];
                return followersData.length ? (
                    <div
                        className="user-followers-modal d-flex justify-content-between gap-2"
                        key={index}
                    >
                        <div className="image-description d-flex align-items-center justify-content-start">
                            <figure className="followers-profile-image">
                                <Image
                                    src={
                                        item?.profile_image
                                            ? item?.profile_image
                                            : "/community/gallery1.png"
                                    }
                                    alt={"profile image"}
                                    height={62}
                                    width={62}
                                />
                            </figure>
                            <div className="name-description d-flex flex-column  justify-content-center ml-4">
                                <div className="name d-flex align-items-center">
                                    <h4 className="pr-5">
                                        {item?.first_name +
                                            " " +
                                            item?.middle_name +
                                            " " +
                                            item?.last_name}
                                    </h4>{" "}
                                    {item?.is_profile_verified && (
                                        <FontAwesomeIcon
                                            icon={faBadgeCheck}
                                            className="svg-icon"
                                            color="#3EAEFF"
                                        />
                                    )}
                                </div>
                                <h5>
                                    {user_type} | {item?.designation}
                                </h5>
                            </div>
                        </div>
                        <div className="follow-btn d-flex align-items-center">
                            {title === "My Followers" && !item?.is_followed && (
                                <CardBtn
                                    btnTitle={"Follow"}
                                    backgroundColor={"#211D4F"}
                                    handleClick={() =>
                                        handleFollowClick(item?.id, "follow")
                                    }
                                />
                            )}
                            {title === "My Followers" && item?.is_followed && (
                                <CardBtn
                                    btnTitle={"Unfollow"}
                                    backgroundColor={"#ffffff"}
                                    color={"#FE5050"}
                                    handleClick={() =>
                                        handleFollowClick(item?.id, "unfollow")
                                    }
                                    border={"2px solid #FE5050"}
                                />
                            )}

                            {title === "My Followings" && (
                                <CardBtn
                                    btnTitle={"Unfollow"}
                                    backgroundColor={"#ffffff"}
                                    color={"#FE5050"}
                                    handleClick={() =>
                                        handleFollowClick(item?.id, "unfollow")
                                    }
                                    border={"2px solid #FE5050"}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="nodata">No Data Available</div>
                );
            })}
        </Modal>
    );
};
