import Image from 'next/image'
import { BusinessGoalProps } from 'types/businessGoal'
import { Carousel } from 'react-bootstrap'
const BusinessGoal = ({
  cardImage,
  cardDescription,
  cardTitle,
  cardAuthor,
}: BusinessGoalProps) => {
  return (
    <div className="community-page-main__goal">
      <div className="image">
        <figure className="thumbnail-img">
          <Image
            src={cardImage}
            layout="fill"
            objectFit="cover"
            alt="earth-image"
          />
        </figure>
      </div>
      <div className="description">
        <h2>{cardTitle}</h2>
        <p>{cardDescription}</p>
        <p className="author">{cardAuthor}</p>
      </div>
    </div>
  )
}
export default BusinessGoal