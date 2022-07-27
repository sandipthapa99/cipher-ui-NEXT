import {
    faCalendar,
    faClock,
    faMoneyBill,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormCheck, Modal } from "react-bootstrap";
import { DUMMY_CLIENT_PROJECTS } from "staticData/clientProjects";

interface HireMerchantModalProps {
    show: boolean;
    onHide: () => void;
}
export const HireMerchantModal = ({ show, onHide }: HireMerchantModalProps) => {
    const renderClientProjects = () => {
        return DUMMY_CLIENT_PROJECTS.map((project, index) => (
            <div className="hmm-client-project" key={index}>
                <div className="hmm-client-project__header">
                    <FormCheck />
                    <p className="hmm-label-text mb-24">{project.name}</p>
                </div>
                <div className="hmm-client-project__body">
                    <p className="hmm-value-text">{project.description}</p>
                    <div className="hmm-time-and-charge-icons">
                        <div className="hmm-icon-text">
                            <FontAwesomeIcon
                                className="svg-icon"
                                color="#F06700"
                                icon={faCalendar}
                            />
                            <p className="hmm-value-text">{project.date}</p>
                        </div>
                        <div className="hmm-icon-text">
                            <FontAwesomeIcon
                                className="svg-icon"
                                color="#3EAEFF"
                                icon={faClock}
                            />
                            <p className="hmm-value-text">{project.time}</p>
                        </div>
                        <div className="hmm-icon-text">
                            <FontAwesomeIcon
                                color="#3D3F7D"
                                className="svg-icon"
                                icon={faMoneyBill}
                            />
                            <p className="hmm-value-text">{project.charge}</p>
                        </div>
                    </div>
                </div>
                <span className="divider hmm-divider"></span>
            </div>
        ));
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Hire Merchant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <span className="hmm-label-text">Merchant : </span>
                    <span className="hmm-value-text">I am the Gardener</span>
                </p>
                <p>
                    <span className="hmm-label-text">Address: </span>
                    <span className="hmm-value-text">
                        Koteshwor, Kathmandu, Nepal
                    </span>
                </p>
                <p className="hmm-value-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae magnam rerum optio tempore accusantium autem.
                    Porro cumque, dicta eius nemo repellat architecto quia
                    molestias, minima pariatur temporibus quibusdam hic placeat.
                </p>
                <span className="divider hmm-divider" />
                <p className="hmm-label-text">Select Task</p>
                <p className="hmm-label-text">
                    Please select project to hire merchant.
                </p>
                <div className="hmm-client-projects-container">
                    {renderClientProjects()}
                    <div className="hmm-footer">
                        <button
                            onClick={onHide}
                            className="hmm-footer__btn cancel"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="hmm-footer__btn confirm"
                            type="button"
                        >
                            Send Request
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};
