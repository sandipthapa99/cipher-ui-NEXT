import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mantine/core";
import { Button } from "react-bootstrap";
import {
    useShowSuccessModal,
    useShowSuccessModalMessage,
    useToggleSuccessModal,
} from "store/use-success-modal";

interface Props {
    text: string;
    buttonName: string;
    type: string;
    iconName: IconDefinition;
}
export const PostCard = ({ text, buttonName, iconName, type }: Props) => {
    const showSuccessModal = useShowSuccessModal();
    const toggleSuccessModal = useToggleSuccessModal();
    const toggleSuccessModalMessage = useShowSuccessModalMessage();

    return (
        <Modal
            opened={showSuccessModal}
            size="lg"
            onClose={() => toggleSuccessModal()}
            className="success-modal"
        >
            <div className="success-content">
                <FontAwesomeIcon icon={iconName} className="svg-icon" />
                <div className="success-text">
                    <h4>{type}</h4>
                    <p>{toggleSuccessModalMessage}</p>
                </div>

                <div className="btn-continue">
                    <Button
                        variant="light"
                        className="cont-btn"
                        onClick={() => toggleSuccessModal()}
                    >
                        {buttonName}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
