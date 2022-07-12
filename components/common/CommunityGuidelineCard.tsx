import Image from 'next/image'
import { CommunityGuidelineCardProps } from 'types/community'

const CommunityGuidelineCard = ({
  CardImage,
  CardDescription,
  CardTitle,
}: CommunityGuidelineCardProps) => {
  return (
    <div className="card-block">
      <figure className="thumbnail-img">
        <Image
          src={CardImage}
          layout="fill"
          // height={300}
          objectFit="cover"
          alt="guideline-card-image"
        />
      </figure>

      <div className="card-block__card-content">
        <h2 className="card-title">{CardTitle}</h2>

        <div className="card-block__card-description">
          {CardDescription.map((guide: any) => (
            <ul>
              <li>{guide}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CommunityGuidelineCard
