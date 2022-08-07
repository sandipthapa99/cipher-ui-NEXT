import { useBookContext } from "context/BookNowContext/bookNowContext";
import { useSuccessContext } from "context/successContext/successContext";
import { Button, Modal } from "react-bootstrap";
import { creditCardContent } from "staticData/creditCardContent";

import CreditCard from "./CreditCard";

interface props {
    show: boolean;
    onHide: () => void;
}

export const CheckoutModal = ({ show, onHide }: props) => {
    const { setShowSuccessModal } = useSuccessContext();
    const { bookNowDetails } = useBookContext();
    const serviceCharge = 200;
    const GST = 100;
    return (
        <div className="checkout-modal-div">
            <Modal
                show={show}
                size="lg"
                onHide={onHide}
                className="modal-checkout"
            >
                <Modal.Header closeButton></Modal.Header>
                <h4>Booking Details</h4>
                <div className="div-modal-checkout">
                    <div className="text-head">
                        <h4>Name</h4>
                        <div className="price-head">
                            <h4>Price</h4>
                            <h4>Total</h4>
                        </div>
                    </div>
                    <div className="text-head">
                        <p>{bookNowDetails.serviceTitle}</p>
                        <div className="price-head">
                            <p>{bookNowDetails.servicePrice}</p>
                            <p>{bookNowDetails.servicePrice}</p>
                        </div>
                    </div>
                    <div className="requirement-head">
                        <p>
                            Planting + Watering + Trimming trees and shrubs +
                            Landscape plans + Fertilizing & Mowing Lawns
                        </p>
                    </div>
                </div>
                <div className="card-div-modal">
                    <div className="payment-details">
                        <h4>Payment Method</h4>
                        <p>Debit/Credit Card</p>
                    </div>
                    <div className="creditCard">
                        {creditCardContent &&
                            creditCardContent.map((card, key) => (
                                <CreditCard key={key} cardDetail={card} />
                            ))}
                    </div>
                </div>
                <div className="payment-details-modal">
                    <h4>Payment Details</h4>
                    <div className="price-modal">
                        <p>Sub Total</p>
                        <p>Rs {bookNowDetails.servicePrice}</p>
                    </div>
                    <div className="price-modal">
                        <p>Service Charge</p>
                        <p>Rs. {serviceCharge}</p>
                    </div>
                    <div className="price-modal">
                        <p>GST</p>
                        <p>Rs. {GST}</p>
                    </div>
                    <div className="grand-total">
                        <p>Grand Total:</p>
                        <p>
                            Rs.{" "}
                            {bookNowDetails.servicePrice + serviceCharge + GST}
                        </p>
                    </div>
                </div>
                <div className="submit-buttons">
                    <div
                        className="button-cont"
                        style={{ width: "183px", height: "40px" }}
                    >
                        <Button
                            variant="light"
                            className="save-draft"
                            onClick={() => onHide()}
                        >
                            Cancel
                        </Button>
                    </div>

                    <div
                        className="post-cont"
                        style={{ width: "183px", height: "40px" }}
                    >
                        <Button
                            variant="light"
                            type="button"
                            onClick={() => {
                                onHide();
                                setShowSuccessModal(true);
                            }}
                            className="post-btn"
                        >
                            Confirm Order
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
