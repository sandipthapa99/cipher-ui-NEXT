import BigButton from "@components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import Modal from "react-bootstrap/Modal";
interface ProfileSuccessModalCardProps {
    show?: boolean;
    onClick: () => void;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    handleClose?: () => void;
}

const ProfileSuccessModalCard = ({
    show,
    setShowForm,
    handleClose,

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
            {/* Modal component */}
            <Modal
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
                            {/* <Button className="submit-btn">Go Home</Button> */}
                            <BigButton
                                btnTitle={"Home"}
                                backgroundColor={"#211d4f"}
                                textColor={"#fff"}
                                handleClick={handleGoHome}
                            />
                        </Link>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};
export default ProfileSuccessModalCard;
