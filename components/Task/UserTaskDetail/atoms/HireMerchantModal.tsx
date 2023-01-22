import {
    faCalendar,
    faClock,
    faMoneyBill,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useMyTasks } from "hooks/task/use-my-tasks";
import { FormCheck, Modal } from "react-bootstrap";
import type { ITasker } from "types/tasker";
import { getFullName } from "utils/getFullName";

interface HireMerchantModalProps {
    show: boolean;
    onHide: () => void;
    taskerDetail: ITasker;
}
export const HireMerchantModal = ({
    show,
    onHide,
    taskerDetail,
}: HireMerchantModalProps) => {
    const UserTask = useMyTasks(String(taskerDetail?.user?.id));
    const renderClientProjects = () => {
        return (
            UserTask.data?.result &&
            UserTask.data?.result.map((project, index) => (
                <div className="hmm-client-project" key={index}>
                    <div className="hmm-client-project__header">
                        <FormCheck
                            id={`hmm-client-project-${index}`}
                            type="radio"
                            name="client-project"
                            label={project?.title}
                            className="mb-8"
                        />
                    </div>
                    <div className="hmm-client-project__body">
                        <p className="hmm-value-text">{project?.description}</p>
                        <div className="hmm-time-and-charge-icons">
                            <span className="hmm-icon-text align-items-center">
                                <FontAwesomeIcon
                                    className="svg-icon"
                                    color="#F06700"
                                    icon={faCalendar}
                                />
                                <p className="hmm-value-text">
                                    {project?.created_at &&
                                        format(
                                            new Date(project?.created_at),
                                            "PP"
                                        )}
                                </p>
                            </span>
                            <div className="hmm-icon-text align-items-center">
                                <FontAwesomeIcon
                                    className="svg-icon"
                                    color="#3EAEFF"
                                    icon={faClock}
                                />
                                <p className="hmm-value-text">
                                    {project?.created_at &&
                                        format(
                                            new Date(project?.created_at),
                                            "p"
                                        )}
                                </p>
                            </div>
                            <div className="hmm-icon-text align-items-center">
                                <FontAwesomeIcon
                                    color="#3D3F7D"
                                    className="svg-icon"
                                    icon={faMoneyBill}
                                />
                                <p className="hmm-value-text">
                                    {project?.budget_from &&
                                        `${project?.budget_from}-`}
                                    {project?.budget_to}
                                </p>
                            </div>
                        </div>
                    </div>
                    <span className="divider hmm-divider"></span>
                </div>
            ))
        );
    };

    return (
        <Modal show={show} onHide={onHide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Hire Merchant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {taskerDetail?.user && (
                    <p className="mb-16">
                        <span className="hmm-label-text">
                            Merchant : {getFullName(taskerDetail?.user)}
                        </span>
                    </p>
                )}
                <p className="mb-16">
                    <span className="hmm-label-text">
                        Address: {taskerDetail?.address_line1}{" "}
                        {taskerDetail?.address_line2}
                    </span>
                </p>
                <p className="hmm-value-text">{taskerDetail?.bio}</p>
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
