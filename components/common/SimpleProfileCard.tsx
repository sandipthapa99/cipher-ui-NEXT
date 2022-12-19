import AppliedForm from "@components/AppliedTask/AppliedForm";
import { Spoiler } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import type { MyBookings } from "hooks/task/use-get-service-booking";
import { useGetTasks } from "hooks/task/use-get-service-booking";
import { useData } from "hooks/use-data";
import { useForm } from "hooks/use-form";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWithLogin } from "store/use-login-prompt-store";
import type { ApprovedTaskDetailProps } from "types/approvedTaskProps";
import type { ITask } from "types/task";
// import { userGet } from "utils/auth";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

import BookNowButton from "./BookNowButton";

interface SimpleProfileCardProps {
    task?: ITask;
    approvedTaskDetail?: ApprovedTaskDetailProps;
    handleScroll?: () => void;
    onApply?: () => void;
}

export enum TASK_STATUS {
    Open = "Open",
    On_Progress = "On Progress",
    Completed = "Completed",
    Closed = "Closed",
    Cancelled = "Cancelled",
}

const SimpleProfileCard = ({
    task,
    onApply,
    approvedTaskDetail,
    handleScroll,
}: SimpleProfileCardProps) => {
    const { first_name, middle_name, last_name, bio, profile_image } =
        approvedTaskDetail?.assignee ||
        ({} as ApprovedTaskDetailProps["assigner"]);
    const { charge, currency } =
        approvedTaskDetail || ({} as ApprovedTaskDetailProps);

    const withLogin = useWithLogin();
    const { data: user } = useUser();
    const { data: appliedTasks } = useGetTasks();

    const { data: myRequestedTask } = useData<MyBookings>(
        ["my-requested-task"],
        `${urls.task.requested_task}`
    );

    const requestedTask = myRequestedTask?.data.result.find(
        (requestedTask: any) => requestedTask?.entity_service.id === task?.id
    );

    const appliedTask = appliedTasks?.result.find(
        (appliedTask: any) => appliedTask?.id !== task?.id
    );

    const cancelTaskUrl = `${urls.task.cancelApplication}/${appliedTask?.id}/`;
    const { mutate } = useForm(cancelTaskUrl);

    const [showModal, setShowModal] = useState(false);
    const queryClient = useQueryClient();

    const handleLeaveTask = () => {
        if (!requestedTask) return;
        mutate(requestedTask?.id, {
            onSuccess: () => {
                queryClient.invalidateQueries(["my-requested-task"]);
                queryClient.invalidateQueries(["approved-task"]);
                toast.success("Booking successfully cancelled.");
                queryClient.invalidateQueries(["get-task-applicants"]);
                onApply?.();
            },
            onError: async () => {
                toast.error("Already cancelled");
            },
        });
    };

    const handleButtonRender = () => {
        if (!task) {
            return (
                <BookNowButton
                    btnTitle="In Progress"
                    disabled={true}
                    backgroundColor="#3776db"
                    handleOnClick={handleLeaveTask}
                />
            );
        } else {
            switch (approvedTaskDetail?.status) {
                case TASK_STATUS.Open:
                    return (
                        <BookNowButton
                            btnTitle="Leave Task"
                            backgroundColor="#FE5050"
                            handleOnClick={handleLeaveTask}
                        />
                    );
                case TASK_STATUS.Closed:
                    return (
                        <BookNowButton
                            btnTitle={"Closed"}
                            backgroundColor={"#3776db"}
                            showModal={true}
                        />
                    );
                case TASK_STATUS.Completed:
                    return (
                        <BookNowButton
                            btnTitle={"Completed"}
                            backgroundColor={"#3776db"}
                            showModal={true}
                        />
                    );
                case TASK_STATUS.On_Progress:
                    return (
                        <BookNowButton
                            btnTitle={"On Progress"}
                            backgroundColor={"#38C675"}
                            showModal={true}
                        />
                    );

                default:
                    return (
                        <BookNowButton
                            btnTitle="Apply Now"
                            backgroundColor="#38C675"
                            handleOnClick={withLogin(() => setShowModal(true))}
                        />
                    );
            }
        }
    };

    const isUserTask = task?.created_by?.id === user?.id;

    return (
        <div className="simple-card my-5 my-lg-0 ">
            <div className="d-flex align-items-cente simple-card__profile">
                <Link href={`/tasker/${task?.created_by?.id}/`}>
                    <a>
                        <figure className="thumbnail-img">
                            <Image
                                src={
                                    task?.created_by?.profile_image
                                        ? task?.created_by?.profile_image
                                        : task?.created_by?.avatar?.image
                                        ? task?.created_by?.avatar?.image
                                        : "/placeholder/profilePlaceholder.png"
                                }
                                layout="fill"
                                objectFit="cover"
                                alt="serviceprovider-image"
                            />

                            {profile_image && (
                                <Image
                                    src={
                                        profile_image
                                            ? profile_image
                                            : "/placeholder/profilePlaceholder.png"
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    alt="serviceprovider-image"
                                />
                            )}
                        </figure>
                    </a>
                </Link>
                {/* <span>{task.created_by.bio}</span> */}
                <div className="intro">
                    <p className="name">
                        {task?.created_by?.first_name}{" "}
                        {task?.created_by?.middle_name ?? ""}{" "}
                        {task?.created_by?.last_name}
                        {first_name} {middle_name} {last_name}
                    </p>
                    <Spoiler hideLabel="" showLabel="" maxHeight={50}>
                        {task?.created_by?.bio ?? ""}
                        {bio}
                    </Spoiler>
                    <p className="job">
                        {task?.status} {}
                    </p>
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

            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row simple-card__price">
                {task &&
                    (task?.budget_from && task?.budget_to ? (
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
                    ))}

                {charge && (
                    <>
                        <span>Budget</span>
                        <span>
                            {currency?.symbol}
                            {charge}
                        </span>
                    </>
                )}
            </div>

            {!isUserTask ? (
                handleButtonRender()
            ) : (
                <BookNowButton
                    btnTitle="View Applicants"
                    backgroundColor="#FE5050"
                    handleOnClick={handleScroll}
                />
            )}
            <AppliedForm
                service_id={task?.id}
                title={task?.title}
                budget_from={task?.budget_from}
                budget_to={task?.budget_to}
                budget_type={task?.budget_type}
                description={task?.description}
                show={showModal}
                setShow={setShowModal}
                handleClose={() => setShowModal(false)}
                currency={task?.currency}
                tasker_id={task?.created_by?.id ? task?.created_by?.id : ""}
                tasker_name={
                    task?.created_by?.first_name +
                        " " +
                        task?.created_by?.middle_name ??
                    "" + " " + task?.created_by?.last_name
                }
                tasker_img={task?.created_by?.profile_image}
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
