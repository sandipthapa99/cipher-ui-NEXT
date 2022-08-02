import type { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSuccessContext } from "context/successContext/successContext";
import { Button, Modal } from "react-bootstrap";

interface Props {
    text: string;
    buttonName: string;
    type: string;
    iconName: IconDefinition;
}
export const PostCard = ({ text, buttonName, iconName, type }: Props) => {
    const { showSuccessModal, setShowSuccessModal } = useSuccessContext();
    const handleClose = () => setShowSuccessModal(false);
    return (
        <Modal
            show={showSuccessModal}
            size="sm"
            onHide={handleClose}
            className="success-modal"
            style={{ display: "flex" }}
        >
            <div className="success-content">
                <FontAwesomeIcon
                    icon={iconName}
                    className="svg-icon"
                    style={{
                        color: "#38C675",
                        width: "100px",
                        height: "100px",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        marginTop: "1rem",
                    }}
                >
                    <h4>{type}</h4>
                    <p>{text}</p>
                </div>

                <div className="btn-continue">
                    <Button
                        variant="light"
                        className="cont-btn"
                        onClick={handleClose}
                    >
                        {buttonName}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
