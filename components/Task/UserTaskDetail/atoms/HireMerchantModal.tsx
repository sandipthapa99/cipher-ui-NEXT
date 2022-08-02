import {
    faCalendar,
    faClock,
    faMoneyBill,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormCheck, Modal } from "react-bootstrap";
import { DUMMY_CLIENT_PROJECTS } from "staticData/clientProjects";
import type { TaskDetail } from "staticData/taskDetail";

interface HireMerchantModalProps {
    task: TaskDetail;
    show: boolean;
    onHide: () => void;
}
export const HireMerchantModal = ({
    task,
    show,
    onHide,
}: HireMerchantModalProps) => {
    const { user: merchant } = task;
    const renderClientProjects = () => {
        return DUMMY_CLIENT_PROJECTS.map((project, index) => (
            <div className="hmm-client-project" key={index}>
                <div className="hmm-client-project__header">
                    <FormCheck
                        id={`hmm-client-project-${index}`}
                        type="radio"
                        name="client-project"
                        label={project.name}
                        className="mb-8"
                    />
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
                <p className="mb-16">
                    <span className="hmm-label-text">Merchant : </span>
                    <span className="hmm-value-text">
                        {merchant.offeredServices.join(",")}
                    </span>
                </p>
                <p className="mb-16">
                    <span className="hmm-label-text">Address: </span>
                    <span className="hmm-value-text">{merchant.location}</span>
                </p>
                <p className="hmm-value-text">{merchant.bio}</p>
                <span className="divider hmm-divider" />
                <p className="hmm-label-text mb-8">Select Task</p>
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
