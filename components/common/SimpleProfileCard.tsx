import AppliedForm from "@components/AppliedTask/AppliedForm";
import { ProfileNotCompleteToast } from "@components/UpperHeader";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useAppliedTasks } from "hooks/task/use-applied-tasks";
import type { MyBookings } from "hooks/task/use-get-service-booking";
import { useGetTasks } from "hooks/task/use-get-service-booking";
import { useLeaveTask } from "hooks/task/use-leave-task";
import { useData } from "hooks/use-data";
import { useForm } from "hooks/use-form";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";
import { useWithLogin } from "store/use-login-prompt-store";
import type { ITask, TaskApprovedList } from "types/task";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

import BookNowButton from "./BookNowButton";

interface SimpleProfileCardProps {
    task: ITask;
    handleScroll?: () => void;
    onApply?: () => void;
}
const SimpleProfileCard = ({
    task,
    onApply,
    handleScroll,
}: SimpleProfileCardProps) => {
    const { data: profile } = useGetProfile();
    // const created_by = task?.created_by.id === profile?.user.id;
    //
    //     "🚀 ~ file: SimpleProfileCard.tsx ~ line 34 ~ SimpleProfileCard ~ created_by",
    //     created_by
    // );

    const withLogin = useWithLogin();
    const { data: user } = useUser();
    const { data: appliedTasks } = useGetTasks();

    const { data: myRequestedTask } = useData<MyBookings>(
        ["my-requested-task"],
        `${urls.task.requested_task}`
    );

    const requestedTask = myRequestedTask?.data.result.find(
        (requestedTask: any) => requestedTask?.entity_service.id === task.id
    );

    const appliedTask = appliedTasks?.result.find(
        (appliedTask: any) => appliedTask?.id !== task.id
    );

    const { data: approvedTasks } = useData<TaskApprovedList>(
        ["approved-task"],
        `${urls.task.approvedTaskList}`
    );

    const approvedTask = approvedTasks?.data.result.find(
        (appliedTask: any) =>
            appliedTask.assignee.id === profile?.user.id &&
            appliedTask?.entity_service === task.id
    );

    const cancelTaskUrl = `${urls.task.cancelApplication}/${appliedTask?.id}`;
    const { mutate } = useForm(cancelTaskUrl);

    const [showModal, setShowModal] = useState(false);
    const queryClient = useQueryClient();

    const handleLeaveTask = () => {
        if (!requestedTask) return;
        mutate(requestedTask?.id, {
            onSuccess: (message) => {
                queryClient.invalidateQueries(["my-requested-task"]);
                queryClient.invalidateQueries(["approved-task"]);
                toast.success("Booking successfully cancelled.");
                queryClient.invalidateQueries(["get-task-applicants"]);
                onApply?.();
            },
            onError: async (error: any) => {
                toast.error("Already cancellerd");
            },
        });
    };

    const isUserTask = task?.created_by?.id === user?.id;

    const handleShowApplyModal = () => {
        if (!profile) {
            toast.showComponent(
                "Profile Incomplete",
                <ProfileNotCompleteToast text="Please complete your profile before applying a task." />
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
                    <p className="name">
                        {task?.created_by?.first_name}{" "}
                        {task?.created_by?.middle_name}{" "}
                        {task?.created_by?.last_name}
                    </p>
                    <p className="job">{task?.created_by?.bio}</p>
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
                        <span>
                            {task?.currency?.symbol} &nbsp;
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
                        <span>
                            {`${task?.currency?.symbol ?? ""} ${
                                task?.budget_to
                            } / ${task?.budget_type}`}
                        </span>
                    </>
                )}
            </div>
            {!isUserTask ? (
                requestedTask?.status === "Cancelled" ? (
                    <BookNowButton
                        btnTitle="Apply Now"
                        backgroundColor="#38C675"
                        handleOnClick={withLogin(() => setShowModal(true))}
                    />
                ) : requestedTask?.status === "On Progress" ? (
                    <BookNowButton
                        btnTitle={"On Progress"}
                        backgroundColor={"#38C675"}
                        showModal={true}
                        //handleOnClick={withLogin(() => setShowModal(true))}
                    />
                ) : requestedTask?.status === "Completed" ? (
                    <BookNowButton
                        btnTitle={"Completed"}
                        backgroundColor={"#3776db"}
                        showModal={true}
                        //handleOnClick={withLogin(() => setShowModal(true))}
                    />
                ) : !requestedTask ? (
                    <BookNowButton
                        btnTitle="Apply Now"
                        // backgroundColor="#5e5d6b"
                        backgroundColor="#38C675"
                        handleOnClick={withLogin(() => setShowModal(true))}
                    />
                ) : requestedTask.is_accepted ? (
                    <BookNowButton
                        btnTitle="Approved"
                        backgroundColor={"#30b32c"}
                        disabled={true}
                        //handleOnClick={handleLeaveTask}
                    />
                ) : !requestedTask.is_accepted && !requestedTask.is_active ? (
                    <BookNowButton
                        btnTitle="Declined"
                        backgroundColor="#FE5050"

                        //handleOnClick={handleLeaveTask}
                    />
                ) : appliedTask?.status === "Open" ? (
                    <BookNowButton
                        btnTitle="Leave Task"
                        backgroundColor="#FE5050"
                        handleOnClick={handleLeaveTask}
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
                    handleOnClick={handleScroll}
                />
            )}

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const { data: taskDetail } = await axiosClient.get<ITask>(
            `${urls.task.list}${params?.slug}/`
        );

        return {
            props: {
                taskDetail,
                //   taskApplicants,
            },
            revalidate: 10,
        };
    } catch (error: any) {
        return {
            props: {
                taskDetail: {},
            },
            revalidate: 10,
        };
    }
};

{
    /* {isApplied &&
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
                ))} */
}

{
    /* {isApplied && !isWorking && (
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
            )} */
}
