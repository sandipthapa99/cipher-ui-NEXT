import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import {
    useShowSuccessModal,
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

    return (
        <Modal
            show={showSuccessModal}
            size="sm"
            onHide={toggleSuccessModal}
            className="success-modal"
        >
            <div className="success-content">
                <FontAwesomeIcon icon={iconName} className="svg-icon" />
                <div className="success-text">
                    <h4>{type}</h4>
                    <p>{text}</p>
                </div>

                <div className="btn-continue">
                    <Button
                        variant="light"
                        className="cont-btn"
                        onClick={toggleSuccessModal}
                    >
                        {buttonName}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
