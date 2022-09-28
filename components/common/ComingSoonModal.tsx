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
                    <FontAwesomeIcon
                        className="comming-soon-icon"
                        icon={faCircleInfo}
                    />{" "}
                    <h4>
                        Mobile Application is coming soon. Please be with us!
                    </h4>
                </div>

                <Modal.Footer>
                    <Button className="btn close-btn" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default CommingSoonModal;
