import { Modal } from "@mantine/core";
import React from "react";

interface UserFollowersProps {
    opened: boolean;
    setShowFollowers: (arg: boolean) => void;
}

export const UserFollowersModal = ({
    opened,
    setShowFollowers,
}: UserFollowersProps) => {
    return (
        <Modal
            opened={opened}
            onClose={() => setShowFollowers(false)}
            title="My Followers"
            centered
        >
            <div className="user-followers-modal">
                Followers followers Followers
            </div>
        </Modal>
    );
};
