import BigButton from '@components/common/Button'
import Image from 'next/image'
import { Button, Col,Row } from 'react-bootstrap'
import { GrowYourBusinessProps } from 'types/growBusiness'
const GrowBusinessCarousel = ({
  image,
  description,
  title,
  buttonText,
}: GrowYourBusinessProps) => {
  return (
    <Row className="carousel-card">
      <Col md={6}>
        <div className="grow-business-content">
          <h1>{title}</h1>
          <p>{description}</p>
          <BigButton btnTitle={buttonText} backgroundColor="#fff" />
        </div>
      </Col>
      <Col md={6}>
        <figure className="thumbnail-img">
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt="growyourbusiness-image"
          />
        </figure>
      </Col>
    </Row>
  )
}
export default GrowBusinessCarousel
