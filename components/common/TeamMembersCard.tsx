import SaveIcon from "@components/common/SaveIcon";
import {
    MilitaryTechOutlined,
    SentimentVerySatisfiedOutlined,
    StarOutlineRounded,
    StarRounded,
} from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
    awardPercentage?: string | number | any;
    location?: string;
    distance?: string;
    bio?: string;
    charge?: string | number;
    id?: number;
    isTasker?: boolean;
    taskId?: string;
    currency?: string;
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
    bio,
    charge,
    currency,
}: Props) => {
    const { data: user } = useUser();
    const userId = tasker;
    const isBookmarked = useIsBookmarked("user", userId);

    const queryClient = useQueryClient();

    const router = useRouter();
    const path = router.query.id;

    // const { data: taskDetail } = useData(["task-detail"], `${urls.task}/${id}`);
    //
    //     "🚀 ~ file: TeamMembersCard.tsx ~ line 71 ~ taskDetail",
    //     taskDetail
    // );

    // const approvedTask = approvedTasks?.data.result.find(
    //     (appliedTask: any) => appliedTask.assignee.id === userId
    // );

    //
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

    return (
        <div
            data-active={JSON.stringify(path === tasker)}
            className="team-members-card active"
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
                            </div>
                            <h6 className="text-dark">
                                <span>{speciality} </span>{" "}
                                {speciality && location ? " | " : ""}
                                {location ? `${location}` : ""}
                            </h6>
                            <div className="d-flex icon-wrapper-member gap-5 align-items-center emoji-section text-dark">
                                <span className="star d-flex align-items-center">
                                    {rating && rating > 0 ? (
                                        <StarRounded className="star" />
                                    ) : (
                                        <StarOutlineRounded className="star" />
                                    )}
                                    {rating &&
                                    rating > 0 &&
                                    Number.isSafeInteger(rating) ? (
                                        <span>{`${rating}`}</span>
                                    ) : rating === null || 0 ? (
                                        <span>0</span>
                                    ) : (
                                        <span>{`${rating?.toFixed(1)}`}</span>
                                    )}
                                </span>

                                <span className="emoji d-flex align-items-center">
                                    <SentimentVerySatisfiedOutlined className="emoji" />
                                    <span>{happyClients}</span>
                                </span>
                                <span className="award d-flex align-items-center">
                                    <MilitaryTechOutlined className="award" />
                                    <span>{awardPercentage}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {bio && (
                        <p className="bio-description">
                            {bio?.length > 50
                                ? bio?.substring(0, 50) + "..."
                                : bio}
                        </p>
                    )}
                </a>
            </Link>
            <div className="d-flex justify-content-between footer-section">
                <div className="share-and-like">
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
                    <ShareIcon
                        url={`https://homaale.com/tasker/${tasker}`}
                        quote={""}
                        hashtag={""}
                    />
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
                            <span className="task-price">
                                {currency} {charge}
                            </span>
                        )}
                    </a>
                </Link>
            </div>
            {/* {isTasker ? null : (
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
                                                //
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
                                        },
                                        onError: (error: any) => {
                                            //
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
                            textColor={"#fff"}
                        />
                    )}
                </div>
            )} */}
        </div>
    );
};
