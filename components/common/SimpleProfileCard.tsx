import AppliedForm from "@components/AppliedTask/AppliedForm";
import { ProfileNotCompleteToast } from "@components/UpperHeader";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useAppliedTasks } from "hooks/task/use-applied-tasks";
import { useGetMyAppliedTasks } from "hooks/task/use-get-service-booking";
import { useLeaveTask } from "hooks/task/use-leave-task";
import { useForm } from "hooks/use-form";
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
    const { data: user } = useUser();
    const { data: appliedTasks } = useGetMyAppliedTasks();
    // console.log(
    //     "🚀 ~ file: SimpleProfileCard.tsx ~ line 25 ~ SimpleProfileCard ~ appliedTasks",
    //     appliedTasks
    // );

    const { data: profile } = useGetProfile();

    const appliedTask = appliedTasks?.result.find(
        (appliedTask: any) =>
            appliedTask?.task === task.id && appliedTask.is_active
    );
    // console.log(
    //     "🚀 ~ file: SimpleProfileCard.tsx ~ line 29 ~ SimpleProfileCard ~ appliedTask",
    //     appliedTask
    // );

    const cancelTaskUrl = `${urls.task.cancelApplication}/${appliedTask?.id}`;
    const { mutate } = useForm(cancelTaskUrl);

    const [showModal, setShowModal] = useState(false);
    const queryClient = useQueryClient();

    const handleLeaveTask = () => {
        if (!appliedTask) return;
        mutate(appliedTask?.id, {
            onSuccess: (message) => {
                queryClient.invalidateQueries(["get-my-bookings"]);
                toast.success("Booking successfully cancelled.");
                onApply?.();
            },
            onError: async (error: any) => {
                toast.error("Already cancellerd");
            },
        });
    };

    const isUserTask = task?.created_by?.id === user?.id;
    // console.log(
    //     "🚀 ~ file: SimpleProfileCard.tsx ~ line 51 ~ SimpleProfileCard ~ task",
    //     task
    // );
    // console.log(
    //     "🚀 ~ file: SimpleProfileCard.tsx ~ line 51 ~ SimpleProfileCard ~ isUserTask",
    //     isUserTask,
    //     task?.created_by?.id,
    //     user?.id
    // );

    const handleViewApplicants = () => {
        toast.success("You have no applicants yet.");
    };
    const handleShowApplyModal = () => {
        if (!profile) {
            toast.error(
                <ProfileNotCompleteToast text="Please complete your profile before applying a task." />,
                {
                    icon: false,
                    autoClose: false,
                }
            );
            return;
        }
        withLogin(() => setShowModal(true));
    };
    return (
        <div className="simple-card my-5 my-lg-0 ">
            <div className="d-flex align-items-center simple-card__profile">
                <figure className="thumbnail-img">
                    <Image
                        src={
                            task?.created_by?.profile_image
                                ? task?.created_by?.profile_image
                                : "/placeholder/profilePlaceholder.png"
                        }
                        layout="fill"
                        objectFit="cover"
                        alt="serviceprovider-image"
                    />
                </figure>
                {!task?.created_by?.profile_image ||
                    (task?.created_by?.profile_image.length <= 0 && (
                        <figure className="thumbnail-img">
                            <Image
                                src={"/placeholder/profilePlaceholder.png"}
                                layout="fill"
                                objectFit="cover"
                                alt="serviceprovider-image"
                            />
                        </figure>
                    ))}
                {/* <span>{task.created_by.bio}</span> */}
                <div className="intro">
                    <p className="name">{task?.created_by?.full_name}</p>
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
                {task?.budget_from && task?.budget_to ? (
                    <>
                        <span>Budget Range</span>
                        <span className="text-right price">
                            {task?.currency?.symbol}
                            {task?.budget_from} - {task?.budget_to}
                            {task?.budget_type === "Hourly"
                                ? "/hr"
                                : task?.budget_type === "Monthly"
                                ? "/mn"
                                : ""}
                        </span>
                    </>
                ) : (
                    <>
                        <span>Budget</span>
                        <span className="text-right price">
                            {`${task?.currency?.symbol ?? ""} ${
                                task?.budget_to
                            } / ${task?.budget_type}`}
                        </span>
                    </>
                )}
            </div>
            {!isUserTask ? (
                appliedTask?.status === "Cancelled" ? (
                    <BookNowButton
                        btnTitle="Apply Now"
                        backgroundColor="#38C675"
                        handleOnClick={withLogin(() => setShowModal(true))}
                    />
                ) : appliedTask?.status === "On Progress" ? (
                    <BookNowButton
                        btnTitle={"On Progress"}
                        backgroundColor={"#38C675"}
                        showModal={true}
                        //handleOnClick={withLogin(() => setShowModal(true))}
                    />
                ) : appliedTask?.status === "Completed" ? (
                    <BookNowButton
                        btnTitle={"Completed"}
                        backgroundColor={"#3776db"}
                        showModal={true}
                        //handleOnClick={withLogin(() => setShowModal(true))}
                    />
                ) : !appliedTask ? (
                    <BookNowButton
                        btnTitle="Rejected"
                        backgroundColor="#5e5d6b"
                    />
                ) : (
                    <BookNowButton
                        btnTitle="Leave Task"
                        backgroundColor="#FE5050"
                        handleOnClick={handleLeaveTask}
                    />
                )
            ) : (
                <BookNowButton
                    btnTitle="View Applicants"
                    backgroundColor="#FE5050"
                    handleOnClick={handleViewApplicants}
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
                setShow={setShowModal}
                handleClose={() => setShowModal(false)}
                currency={task.currency}
            />
        </div>
    );
};
export default SimpleProfileCard;
