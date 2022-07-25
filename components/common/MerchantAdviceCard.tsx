import Image from 'next/image'
import { Button } from 'react-bootstrap'
import { MerchantAdviceProps } from 'types/merchantAdvice'

import CardBtn from './CardBtn'
const MerchantAdviceCard = ({
  title,
  subtitle,
  description,
  image,
}: MerchantAdviceProps) => {
  return (
    <div className="merchant-advice__card d-flex">
      <div className="description">
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{description}</p>
        <CardBtn btnTitle="See how" backgroundColor="#211D4F" />
      </div>
      <div className="image">
        <figure className="thumbnail-img">
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt="earth-image"
          />
        </figure>
      </div>
    </div>
  )
}
export default MerchantAdviceCard
