import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import type { TaskActionCardProps } from "types/taskAction";

const TaskActionCard = ({ title, image }: TaskActionCardProps) => {
    return (
        <Link href="/" className="task-blocks">
            <a>
                <div>
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
            </a>
        </Link>
    );
};
export default TaskActionCard;
