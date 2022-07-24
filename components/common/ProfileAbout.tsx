import Image from 'next/image'
import { CommonCardProps } from 'types/commonCard'

const AboutProfile = ({
  cardImage,
  cardDescription,
  cardTitle,
}: CommonCardProps) => {
  return (
    <div className="card-block align-items-center">
      <figure className="thumbnail-img">
        <Image
          src={cardImage}
          layout="fill"
          // height={300}
          //objectFit="cover"
          alt="referral-card-image"
        />
      </figure>

      <div className="card-block__card-content">
        <h2 className="card-title">{cardTitle}</h2>
        <div className="card-description">{cardDescription}</div>
      </div>
    </div>
  )
}
export default AboutProfile
