import Image from 'next/image'
import { ReviewsProps } from 'types/reviews'

const Reviews = ({ name, ratings, image, description, time }: ReviewsProps) => {
  return (
    <div className="review-block">
      <figure className="thumbnail-img">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="referral-card-image"
        />
      </figure>

      <div className="review-block__content">
        <div className="reviewer">
          <h3 className="name">{name}</h3>

          <div className="ratings d-flex">
            {Array.from({ length: ratings }, (_, i) => (
              <span key={i}>
                {' '}
                <figure className="thumbnail-img">
                  <Image
                    src="/icons/rated.svg"
                    layout="fill"
                    objectFit="cover"
                  />
                </figure>
              </span>
            ))}
            {Array.from({ length: 5 - ratings }, (_, i) => (
              <span key={i}>
                {' '}
                <figure className="thumbnail-img">
                  <Image
                    src="/icons/unrated.svg"
                    layout="fill"
                    objectFit="cover"
                  />
                </figure>
              </span>
            ))}
          </div>
        </div>

        <p className="description">{description}</p>

        <p className="time">{time} ago</p>
      </div>
    </div>
  )
}
export default Reviews
