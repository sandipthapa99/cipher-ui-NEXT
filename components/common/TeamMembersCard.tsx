import SaveIcon from "@components/common/SaveIcon";
import {
    faAward,
    faFaceGrinBeam,
    faLocationArrow,
} from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { useUser } from "hooks/auth/useUser";
import { useIsBookmarked } from "hooks/use-bookmarks";
import { useData } from "hooks/use-data";
import { useForm } from "hooks/use-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import type { TaskApplicantsProps, TaskApprovedList } from "types/task";
import type { Tasker } from "types/tasks";

import BigButton from "./Button";
import ShareIcon from "./ShareIcon";

interface Props {
    taskers?: Tasker;
    tasker: string;
    collabButton?: boolean;
    onTaskClick?: (taskerId: string) => void;
    handleButtonClick?: () => void;
    image?: string;
    name?: string;
    speciality?: string;
    rating?: number;
    happyClients?: number;
    awardPercentage?: string | number;
    location?: string;
    distance?: string;
    bio?: string;
    charge?: string;
    id?: number;
    isTasker?: boolean;
    taskId?: string;
}

export const TeamMembersCard = ({
    collabButton,
    handleButtonClick,
    image,
    name,
    speciality,
    rating,
    happyClients,
    awardPercentage,
    location,
    tasker,
    distance,
    bio,
    charge,
    id,
    isTasker,
    taskId,
}: Props) => {
    const { data: user } = useUser();
    const userId = tasker;
    const isBookmarked = useIsBookmarked("user", userId);

    const queryClient = useQueryClient();

    const router = useRouter();
    const path = router.query.id;

    // const { data: taskDetail } = useData(["task-detail"], `${urls.task}/${id}`);
    // console.log(
    //     "🚀 ~ file: TeamMembersCard.tsx ~ line 71 ~ taskDetail",
    //     taskDetail
    // );

    const { data: approvedTasks } = useData<TaskApprovedList>(
        ["approved-task"],
        `${urls.task.approvedTaskList}`
    );
    // const approvedTask = approvedTasks?.data.result.find(
    //     (appliedTask: any) => appliedTask.assignee.id === userId
    // );

    const { data: taskApplicants } = useData<TaskApplicantsProps>(
        ["get-my-applicants"],
        `${urls.task.my_applicants}?entity_service=${taskId}&is_requested=true`
    );

    const approvedTasker = taskApplicants?.data.result.find(
        (applicants: any) => applicants.id === id
    );

    // console.log(
    //     "🚀 ~ file: TeamMembersCard.tsx ~ line 74 ~ userId",
    //     userId,
    //     approvedTask?.assignee.id
    // );

    // const sendBookApproval = useMutation(
    //     (data: { booking: number | undefined }) =>
    //         axiosClient.post(`${urls.task}`, data)
    // );

    // const sendBookReject = useMutation(
    //     (data: { booking: number | undefined }) =>
    //         axiosClient.post("/task/entity/service-booking/reject/", data)
    // );
    const { mutate: bookingApproval } = useForm(`${urls.task.approval}`);
    const { mutate: bookingDecline } = useForm(`${urls.task.decline}`);

    return (
        <div
            data-active={JSON.stringify(path === tasker)}
            className="team-members-card mb-5 active"
        >
            <Link href={`/tasker/${tasker}/`}>
                <a>
                    <div className="d-flex w-100 image-and-title">
                        {image ? (
                            <figure className="team-member-card-image">
                                <Image
                                    src={image}
                                    alt="team-member-card-image"
                                    height={80}
                                    width={80}
                                />
                            </figure>
                        ) : (
                            <figure className="team-member-card-image">
                                <Image
                                    src={"/userprofile/unknownPerson.jpg"}
                                    alt="team-member-card-image"
                                    height={80}
                                    width={80}
                                />
                            </figure>
                        )}

                        <div className="w-100 name-post-count">
                            <div className="d-flex justify-content-between title-and-dots text-dark">
                                <h5>{name}</h5>
                                {/* <FontAwesomeIcon
                            className="ellipsis-vertical"
                            icon={faEllipsisVertical}
                        /> */}
                            </div>
                            <h6 className="text-dark">
                                <span>{speciality} </span>| {location}
                            </h6>
                            <div className="d-flex icon-wrapper-member gap-5 align-items-center emoji-section text-dark">
                                <span className="star">
                                    <FontAwesomeIcon
                                        className="star"
                                        icon={faStar}
                                    />
                                    {rating &&
                                    rating > 0 &&
                                    Number.isSafeInteger(rating) ? (
                                        <span>{`${rating}.0`}</span>
                                    ) : rating === null || 0 ? (
                                        <span>0</span>
                                    ) : (
                                        <span>{`${rating?.toFixed(1)}`}</span>
                                    )}
                                </span>

                                <span className="emoji">
                                    <FontAwesomeIcon
                                        className="emoji"
                                        icon={faFaceGrinBeam}
                                    />
                                    <span>{happyClients}</span>
                                </span>
                                <span className="award">
                                    <FontAwesomeIcon
                                        className="award"
                                        icon={faAward}
                                    />
                                    <span> {awardPercentage}</span>
                                </span>
                                <span className="location">
                                    <FontAwesomeIcon
                                        className="location"
                                        icon={faLocationArrow}
                                    />
                                    <span> {distance}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <p>{bio}</p>
                </a>
            </Link>
            <div className="d-flex justify-content-between footer-section">
                <div className="d-flex share-and-like">
                    {user && user.id !== tasker ? (
                        <SaveIcon
                            model="user"
                            object_id={userId}
                            filled={isBookmarked}
                            onSuccess={() =>
                                queryClient.invalidateQueries([
                                    "bookmarks",
                                    "user",
                                ])
                            }
                            className={"me-3"}
                        />
                    ) : null}
                    <ShareIcon url={""} quote={""} hashtag={""} />
                </div>
                <Link href={`/tasker/${tasker}/`}>
                    <a>
                        {collabButton == true ? (
                            <div className="collab-button">
                                <BigButton
                                    btnTitle={"Collab"}
                                    backgroundColor={"#211D4F"}
                                    handleClick={handleButtonClick}
                                />
                            </div>
                        ) : (
                            <span className="task-price">{charge}</span>
                        )}
                    </a>
                </Link>
            </div>
            {isTasker ? null : (
                <div className="d-flex align-items-center gap-3 pt-3">
                    {approvedTasker && !approvedTasker.is_accepted ? (
                        <>
                            <BigButton
                                btnTitle={"Decline"}
                                textColor={"#211D4F"}
                                handleClick={() => {
                                    bookingDecline(
                                        { booking: id },
                                        {
                                            onSuccess: () => {
                                                toast.success(
                                                    "Booking Rejected"
                                                );
                                                queryClient.invalidateQueries([
                                                    "get-my-applicants",
                                                ]);
                                                queryClient.invalidateQueries([
                                                    "get-task-applicants",
                                                ]);
                                                queryClient.invalidateQueries([
                                                    "my-requested-task",
                                                ]);
                                                queryClient.invalidateQueries([
                                                    "approved-task",
                                                ]);
                                            },
                                            onError: (error: any) => {
                                                console.log(error);
                                                toast.error(
                                                    error.response.data.booking
                                                        .message
                                                );
                                            },
                                        }
                                    );
                                }}
                                backgroundColor={"#fff"}
                                border={"1px solid #211D4F"}
                            />{" "}
                            <BigButton
                                btnTitle={"Approve"}
                                textColor={"#fff"}
                                handleClick={() => {
                                    bookingApproval(
                                        { booking: id },
                                        {
                                            onSuccess: () => {
                                                toast.success(
                                                    "Booking Approved and Task Created"
                                                );
                                                queryClient.invalidateQueries([
                                                    "get-my-applicants",
                                                ]);
                                                queryClient.invalidateQueries([
                                                    "get-task-applicants",
                                                ]);
                                                queryClient.invalidateQueries([
                                                    "my-requested-task",
                                                ]);
                                                queryClient.invalidateQueries([
                                                    "approved-task",
                                                ]);
                                            },
                                            onError: (error: any) => {
                                                // console.log(
                                                //     "Booking is approved",
                                                //     error.booking.message
                                                // );
                                                toast.error(
                                                    "This booking is already approved."
                                                );
                                            },
                                        }
                                    );
                                }}
                                backgroundColor={"#211D4F"}
                                // border="1px solid #211D4F"
                            />
                        </>
                    ) : (
                        <BigButton
                            btnTitle={"Approved"}
                            backgroundColor={"#30b32c"}
                            // handleClick={() => {
                            //     bookingApproval(
                            //         { booking: id },
                            //         {
                            //             onSuccess: () => {
                            //                 toast.success(
                            //                     "Booking Approved and Task Created"
                            //                 );
                            //                 queryClient.invalidateQueries([
                            //                     "get-my-applicants",
                            //                 ]);
                            //             },
                            //             onError: (error: any) => {
                            //                 // console.log(
                            //                 //     "Booking is approved",
                            //                 //     error.booking.message
                            //                 // );
                            //                 toast.error(
                            //                     "This booking is already approved."
                            //                 );
                            //             },
                            //         }
                            //     );
                            //}}
                            textColor={"#fff"}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
