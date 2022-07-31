import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { TaskActionCardProps } from "types/taskAction";

const TaskActionCard = ({ title, image }: TaskActionCardProps) => {
    return (
        <div className="task-blocks">
            <figure className="thumbnail-img">
                <Image
                    src={image}
                    layout="fill"
                    height={300}
                    objectFit="cover"
                    alt="about-card-image"
                />
            </figure>
            <p className="task-name">{title}</p>
            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
        </div>
    );
};
export default TaskActionCard;
