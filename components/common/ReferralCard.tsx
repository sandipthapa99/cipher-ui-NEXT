import Image from 'next/image'
import { ReferralCardProps } from 'types/referralCard'

const ReferralCard = ({
  CardImage,
  CardDescription,
  CardTitle,
}: ReferralCardProps) => {
  return (
    <div className="card-block">
      <figure className="thumbnail-img">
        <Image
          src={CardImage}
          layout="fill"
          // height={300}
          //objectFit="cover"
          alt="referral-card-image"
        />
      </figure>

      <div className="card-block__card-content">
        <h2 className="card-title">{CardTitle}</h2>

        <div className="card-block__card-description">{CardDescription}</div>
      </div>
    </div>
  )
}
export default ReferralCard
