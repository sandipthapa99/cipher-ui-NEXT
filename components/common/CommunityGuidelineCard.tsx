import Image from 'next/image'
import { CommunityGuidelineCardProps } from 'types/community'

const CommunityGuidelineCard = ({
  cardImage,
  cardDescription,
  cardTitle,
}: CommunityGuidelineCardProps) => {
  let mapKey = 0;
  return (
    <div className="card-block align-items-center">
      <figure className="thumbnail-img">
        <Image
          src={cardImage}
          layout="fill"
          // height={300}
          objectFit="cover"
          alt="guideline-card-image"
        />
      </figure>

      <div className="card-block__card-content">
        <h2
          className="card-title"
          style={{ borderBottom: '1px solid #dee2e6' }}
        >
          {cardTitle}
        </h2>

        <div className="card-block__card-description">
          {Array.isArray(cardDescription) ? (
            cardDescription.map((guide: any) => (
              <ul key={mapKey}>
                <li>{guide}</li>
              </ul>
            ))
          ) : (
            <p>{cardDescription}</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default CommunityGuidelineCard
