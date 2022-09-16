import BigButton from "@components/common/Button";
import SaveIcon from "@components/common/SaveIcon";
import ShareIcon from "@components/common/ShareIcon";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { useIsBookmarked } from "hooks/use-bookmarks";
import Image from "next/image";
import type { Task, Tasker } from "types/tasks";

interface Props {
    isButton?: boolean;
    tasker: Tasker;
    onTaskClick: (task: Task) => void;
    handleButtonClick?: () => void;
    taskId?: number;
    isSaved?: boolean;
}
export const UserTaskCard = ({
    isButton,
    tasker,
    onTaskClick,
    handleButtonClick,
    taskId,
    isSaved,
}: Props) => {
    const isBookmarked = useIsBookmarked("user", tasker.user.id);
    const queryClient = useQueryClient();
    console.log("taskerdfasdfasd", tasker);
    console.log("tasker area", tasker);
    return (
        <div className="user-task-card">
            <div className="user-task-card__header">
                <figure className="profile-image">
                    <Image
                        src={
                            tasker.profile_image
                                ? tasker.profile_image
                                : "/userprofile/unknownPerson.jpg"
                        }
                        objectFit="cover"
                        height={150}
                        width={150}
                        priority={true}
                        alt={"profile picture"}
                    />
                </figure>

                <div className="user-info">
                    <p className="user-info__username">{tasker.full_name}</p>

                    <div className="work-address">
                        <span>Teacher</span> |{tasker.address_line1}
                    </div>
                    <span>{tasker.bio ? tasker.bio : "hsadfasdjkfashdf"}</span>
                </div>
            </div>
            <div className="user-rating-price">
                <div className="rating d-flex align-items-center">
                    <FontAwesomeIcon className="svg-icon" icon={faStar} />
                    <p>4.8(200)</p>
                </div>
                <div className="price">$50/hr</div>
            </div>

            <div className="d-flex justify-content-between user-task-card__footer">
                <div className="icons">
                    <SaveIcon
                        filled={isBookmarked}
                        object_id={tasker.user.id.toString()}
                        model={"user"}
                        onSuccess={() =>
                            queryClient.invalidateQueries(["bookmarks", "user"])
                        }
                    />
                    <ShareIcon
                        url={`http://localhost:3005/tasker?taskerId=${taskId}`}
                        quote={"Tasker from cipher project"}
                        hashtag={"cipher-tasker"}
                    />
                </div>

                <BigButton
                    btnTitle={"Hire Me"}
                    backgroundColor={"#211D4F"}
                    textColor={"white"}
                    handleClick={handleButtonClick}
                />
            </div>
        </div>
    );
};
