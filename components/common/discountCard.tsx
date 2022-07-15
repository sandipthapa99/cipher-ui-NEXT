import Image from 'next/image'
import BigButton from './Button'

const DiscountCard = () => {
  return (
    <div className="discount-card-block">
      <div className="gradient"></div>
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
        <h2>TODAY ONLY</h2>
        <BigButton btnTitle="Book Now" backgroundColor="yellow" />
      </div>
    </div>
  )
}
export default DiscountCard
