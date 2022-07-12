import Image from 'next/image'
import { CommunityGuidelineCardProps } from 'types/community'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'
const CommunityBlogCard = ({
  CardImage,
  CardDescription,
  CardTitle,
}: CommunityGuidelineCardProps) => {
  return (
    <div className="find-hire-card-block">
      <figure className="thumbnail-img">
        <Image src={CardImage} layout="fill" objectFit="cover" alt="" />
      </figure>

      <div className="card-content">
        <h2>{CardTitle}</h2>

        <p className="card-description">
          {/* {`${aboutDescription.substring(0, 80)}...`} */}
          {CardDescription}
        </p>
        <Link href="">
          <a>
            See More
            <FontAwesomeIcon icon={faAngleRight} className="svg-icon" />
          </a>
        </Link>
      </div>
    </div>
  )
}
export default CommunityBlogCard
