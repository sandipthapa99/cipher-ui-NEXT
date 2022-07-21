import Image from 'next/image'
import BigButton from './Button'

const DiscountCard = () => {
  return (
    <div className="discount-card-block">
      <figure className="thumbnail-img">
        <Image
          src="/exploreservices/offer1.png"
          layout="fill"
          objectFit="cover"
          alt="discount-image"
        />
      </figure>
      <div className="category-overlay">
        <h1>Additional</h1>
        <div className="discount">
          <p>20% OFF</p>
        </div>
        <p>For all Home Services</p>
        <p className="time">TODAY ONLY</p>
        <BigButton btnTitle="Book Now" backgroundColor="#fca500" />
        {/* <button className="book-btn card-btn">Book Now</button> */}
      </div>
    </div>
  )
}
export default DiscountCard
