import Image from 'next/image'
import { ReviewsProps } from 'types/reviews'
import Link from 'next/link'

const Reviews = ({ name, ratings, image, description, time }: ReviewsProps) => {
  const myRatings = () => {
    for (let i = 0; (i = ratings); i++) {
      return (
        <div className="ratings">
          <figure className="thumbnail-img">
            <Image src="/icons/rated.svg" layout="fill" objectFit="cover" />
          </figure>
        </div>
      )
    }
  }
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
          {/* <p className="ratings">{ratings}</p> */}
          {/* <p>{myRatings()}</p> */}
        </div>

        <p className="description">{description}</p>

        <p className="time">{time} ago</p>
      </div>
    </div>
  )
}
export default Reviews
