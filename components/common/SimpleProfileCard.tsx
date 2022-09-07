import AppliedForm from "@components/AppliedTask/AppliedForm";
import { useAppliedTasks } from "hooks/task/use-applied-tasks";
import { useLeaveTask } from "hooks/task/use-leave-task";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useWithLogin } from "store/use-login-prompt-store";
import type { ITask } from "types/task";

import BookNowButton from "./BookNowButton";

interface SimpleProfileCardProps {
    task: ITask;
    onApply?: () => void;
}
const SimpleProfileCard = ({ task, onApply }: SimpleProfileCardProps) => {
    const withLogin = useWithLogin();
    const { data: appliedTasks } = useAppliedTasks();
    const { mutate } = useLeaveTask();

    const [showModal, setShowModal] = useState(false);
    const [priceValue, setPriceValue] = useState(25);
    const [priceChanged, setPriceChanged] = useState(false);
    const [isWorking, setIsWorking] = useState(false);

    const appliedTask = appliedTasks.find(
        (appliedTask) => appliedTask.task === task.id && appliedTask.is_active
    );

    const handleLeaveTask = () => {
        if (!appliedTask) return;
        mutate(
            { id: appliedTask.id },
            {
                onSuccess: (message) => {
                    toast.success(message);
                    onApply?.();
                },
            }
        );
    };

    return (
        <div className="simple-card my-5 my-lg-0 ">
            <p>{appliedTask ? "Applied" : "Not Applied"}</p>
            <div className="d-flex align-items-center simple-card__profile">
                <figure className="thumbnail-img">
                    <Image
                        src={
                            task.image ? task.image : "/hireinnepal/footer.png"
                        }
                        layout="fill"
                        objectFit="cover"
                        alt="serviceprovider-image"
                    />
                </figure>

                <div className="intro">
                    <p className="name">{task.title}</p>
                    <p className="job">{task.status}</p>
                </div>
            </div>

            {/* {isApplied && isPermission && (
                <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row p-4 simple-card__price">
                    <span>Your Price</span>
                    <div className="d-flex price-edit">
                        <FontAwesomeIcon
                            icon={faCircleMinus}
                            onClick={() => {
                                setPriceValue(priceValue - 1);
                                setPriceChanged(true);
                            }}
                        />
                        <div className="d-flex align-items-center input-pricerange">
                            $
                            <input
                                type="text"
                                name="changed_price_value"
                                defaultValue={priceValue}
                            />
                        </div>
                        <FontAwesomeIcon
                            icon={faCirclePlus}
                            onClick={() => {
                                setPriceValue(priceValue + 1);
                                setPriceChanged(true);
                            }}
                        />
                    </div>
                </div>
            )} */}

            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row p-4 simple-card__price">
                <span>Budget Range</span>
                <span className="text-right price">
                    {task?.currency?.code}
                    {task?.budget_from} - {task?.budget_to}
                    {task?.budget_type === "Hourly"
                        ? "/hr"
                        : task?.budget_type === "Monthly"
                        ? "/mn"
                        : ""}
                </span>
            </div>

            {appliedTask ? (
                <BookNowButton
                    btnTitle="Leave Task"
                    backgroundColor="#FE5050"
                    handleOnClick={handleLeaveTask}
                />
            ) : (
                <BookNowButton
                    btnTitle={"Apply Now"}
                    backgroundColor={"#38C675"}
                    showModal={true}
                    handleOnClick={withLogin(() => setShowModal(true))}
                />
            )}

            {/* {isApplied &&
                isWorking &&
                (!priceChanged ? (
                    <BookNowButton
                        btnTitle="Leave Task"
                        backgroundColor="#FE5050"
                    />
                ) : (
                    <BookNowButton
                        btnTitle={"Save"}
                        backgroundColor={"#211D4F"}
                        handleOnClick={handlePriceSave}
                    />
                ))} */}

            {/* {isApplied && !isWorking && (
                <>
                    {!priceChanged ? (
                        <BookNowButton
                            btnTitle={"Apply Now"}
                            backgroundColor={"#38C675"}
                            showModal={true}
                            handleOnClick={withLogin(() =>
                                setShowModal(!showModal)
                            )}
                        />
                    ) : (
                        <BookNowButton
                            btnTitle={"Save"}
                            backgroundColor={"#211D4F"}
                            handleOnClick={() => setPriceChanged(false)}
                        />
                    )}
                </>
            )} */}

            <AppliedForm
                service_id={task.id}
                title={task.title}
                budget_from={task?.budget_from}
                budget_to={task?.budget_to}
                budget_type={task?.budget_type}
                description={task?.description}
                show={showModal}
                handleClose={() => setShowModal(false)}
                images={[]}
            />
        </div>
    );
};
export default SimpleProfileCard;
