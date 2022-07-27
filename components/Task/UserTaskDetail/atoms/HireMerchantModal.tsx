import { Modal } from "react-bootstrap";

interface HireMerchantModalProps {
    show: boolean;
    onHide: () => void;
}
export const HireMerchantModal = ({ show, onHide }: HireMerchantModalProps) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Hire Merchant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <span>Merchant : </span>
                    <span>I am the Gardener</span>
                </p>
                <p>
                    <span>Address: </span>
                    <span>Koteshwor, Kathmandu, Nepal</span>
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae magnam rerum optio tempore accusantium autem.
                    Porro cumque, dicta eius nemo repellat architecto quia
                    molestias, minima pariatur temporibus quibusdam hic placeat.
                </p>
            </Modal.Body>
        </Modal>
    );
};
