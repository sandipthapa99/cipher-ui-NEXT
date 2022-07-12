import Image from 'next/image'
import { CommunityActivityCardProps } from 'types/community'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShare } from '@fortawesome/pro-regular-svg-icons'

const CommunityActivityCard = ({
  CardImage,
  CardDescription,
  CardTitle,
  React,
  Comments,
  Name,
  Position,
}: CommunityActivityCardProps) => {
  return (
    <div className="activitycard-block">
      {/* <figure className="thumbnail-img">
        <Image
          src={CardImage}
          layout="fill"
          // height={300}
          objectFit="cover"
          alt="guideline-card-image"
        />
      </figure> */}

      <div className="activitycard-block__card-content">
        <h2 className="activitycard-title">{CardTitle}</h2>

        <p className="activitycard-block__card-description">
          {CardDescription}
        </p>
        <div className="activitycard-block__card-status">
          <div className="personal-information">
            <figure className="thumbnail-img">
              <Image
                src={CardImage}
                layout="fill"
                // height={300}
                objectFit="cover"
                alt="guideline-card-image"
              />
            </figure>
            <div className="name-position">
              <p className="name">{Name}</p>
              <p className="position">{Position}</p>
            </div>
          </div>

          <div className="reacts-status">
            <div className="heart-status">
              <FontAwesomeIcon icon={faHeart} className="svg-icon heart" />
              <span>{React}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faShare} className="svg-icon share" />
              <span>{Comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CommunityActivityCard
