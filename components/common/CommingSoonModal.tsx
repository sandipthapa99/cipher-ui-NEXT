import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
interface CommingSoonModalProps {
    show?: boolean;
    handleClose?: () => void;
}

const CommingSoonModal = ({ handleClose, show }: CommingSoonModalProps) => {
    return (
        <>
            {/* Modal component */}
            <Modal
                show={show}
                centered
                onHide={handleClose}
                className="comming-soon-modal"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>
                        <h3>Comming Soon!</h3>
                    </Modal.Title> */}
                </Modal.Header>

                <div className="information">
                    <FontAwesomeIcon className="svg-icon" icon={faCircleInfo} />{" "}
                    <h4>This feature is comming soon. Please be with us!</h4>
                </div>

                <Modal.Footer>
                    <Button className="btn close-btn" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CommingSoonModal;
