import Image from 'next/image'
import { ReviewsProps } from 'types/reviews'
import { date } from 'yup'

const Reviews = ({ name, ratings, image, description, time }: ReviewsProps) => {
  return (
    <div className="review-block">
      <figure className="thumbnail-img">
        <Image
          src={image}
          layout="fill"
          // height={300}
          //objectFit="cover"
          alt="referral-card-image"
        />
      </figure>

      <div className="review-block__content">
        <div className="reviewer">
          <h3 className="name">{name}</h3>
          <p className="ratings">{ratings}</p>
        </div>
        <p className="description">{description}</p>
        <p className="time">{time} ago</p>
      </div>
    </div>
  )
}
export default Reviews
