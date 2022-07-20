import Image from 'next/image'
import { CommonCardProps } from 'types/commonCard'
import { TaskActionCardProps } from 'types/taskAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'

const TaskActionCard = ({ title, image }: TaskActionCardProps) => {
  return (
    <div className="task card-block">
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
  )
}
export default TaskActionCard
