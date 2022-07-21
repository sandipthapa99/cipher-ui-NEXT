import Image from 'next/image';
import { CommonCardProps } from 'types/commonCard';
import { TaskAction } from '../../types/tasksActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons';

const TaskActionCard = ({ title, image }: TaskAction) => {
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
