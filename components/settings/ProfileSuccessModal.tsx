import BigButton from "@components/common/Button";
import CardBtn from "@components/common/CardBtn";
import { faCircleCheck } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mantine/core";
import Link from "next/link";
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
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="check-icon"
                        />
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
            {/* <Modal
                show={show}
                centered
                className="profile-success-modal"
                backdrop="static"
            >
                <Modal.Header>
                    <Modal.Title className="mx-auto">
                        Profile Created Successfully!
                    </Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="problem"></div>

                    <Modal.Footer>
                        <BigButton
                            btnTitle={"Complete KYC"}
                            backgroundColor={"#FFCA6A"}
                            textColor={"#212529"}
                            handleClick={handleCloseModal}
                        />
                        <Link href={"/home"} className="text-profile">
                            <BigButton
                                btnTitle={"Home"}
                                backgroundColor={"#211d4f"}
                                textColor={"#fff"}
                                handleClick={handleGoHome}
                            />
                        </Link>
                    </Modal.Footer>
                </div>
            </Modal> */}
        </>
    );
};
export default ProfileSuccessModalCard;
