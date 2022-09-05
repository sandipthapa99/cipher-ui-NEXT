import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface RelatedInfoModalProps {
    show: boolean;
    handleClose?: () => void;
    title: string;
    desc: string[];
}

const RelatedInfoModal = ({
    handleClose,
    title,
    desc,
    show,
}: RelatedInfoModalProps) => {
    return (
        <>
            {/* Modal component */}
            <Modal show={show} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="details">
                        {desc.map((info, i) => (
                            <p key={i}>{info}</p>
                        ))}
                    </div>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default RelatedInfoModal;
