import CardBtn from "@components/common/CardBtn";
import { Modal } from "@mantine/core";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
interface ProfileSuccessModalCardProps {
    show: boolean;
    onClick: () => void;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    handleClose?: () => void;
}

const ProfileSuccessModalCard = ({
    show,
    setShowForm,
    onClick,
}: ProfileSuccessModalCardProps) => {
    const router = useRouter();

    const handleCloseModal = () => {
        setShowForm(false);
        onClick();
    };
    const handleGoHome = () => {
        setShowForm(false);
        router.push("/home");
    };
    return (
        <>
            <Modal
                opened={show}
                onClose={handleCloseModal}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
                // overlayColor="909296"
                overlayOpacity={0.55}
                overlayBlur={3}
                size="md"
                className="profile-success-modal"
            >
                <div className="content d-flex align-items-center justify-content-center flex-column">
                    <div className="icon-block">
                        <CheckCircleOutlineOutlined className="check-icon" />
                    </div>
                    <h1>Profile Created</h1>
                    <p>Now, you can post tasks and services.</p>
                    <div className="btn-group">
                        <CardBtn
                            backgroundColor="#FFCA6A"
                            btnTitle="Complete KYC"
                            handleClick={handleCloseModal}
                            color="#495057"
                        />
                        <CardBtn
                            backgroundColor="#211d4f"
                            btnTitle="Home"
                            handleClick={handleGoHome}
                            color="#E9ECEF"
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default ProfileSuccessModalCard;
