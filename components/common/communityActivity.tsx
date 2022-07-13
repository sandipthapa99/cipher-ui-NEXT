import Image from 'next/image'
import { CommunityActivityCardProps } from 'types/community'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/pro-regular-svg-icons'

const CommunityActivityCard = ({
  cardImage,
  cardDescription,
  cardTitle,
  react,
  comments,
  name,
  position,
}: CommunityActivityCardProps) => {
  return (
    <div className="activitycard-block">
      <div className="activitycard-block__card-content">
        <h2 className="activitycard-title">{cardTitle}</h2>

        <p className="activitycard-block__card-description">
          {cardDescription}
        </p>
        <div className="activitycard-block__card-status">
          <div className="personal-information">
            <figure className="thumbnail-img">
              <Image
                src={cardImage}
                layout="fill"
                // height={300}
                objectFit="cover"
                alt="guideline-card-image"
              />
            </figure>
            <div className="name-position">
              <p className="name">{name}</p>
              <p className="position">{position}</p>
            </div>
          </div>

          <div className="reacts-status">
            <div className="heart-status">
              <FontAwesomeIcon icon={faHeart} className="svg-icon heart" />
              <span>{react}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faComment} className="svg-icon share" />
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CommunityActivityCard
