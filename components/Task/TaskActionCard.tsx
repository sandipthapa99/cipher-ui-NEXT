import { ChevronRight } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

import type { TaskAction } from "../../types/tasksActions";

const TaskActionCard = ({ title, image, redirection }: TaskAction) => {
    return (
        <div className="task-blocks">
            <Link href={redirection}>
                <a>
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
                    <ChevronRight className="svg-icon" />
                </a>
            </Link>
        </div>
    );
};
export default TaskActionCard;
