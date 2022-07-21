import Image from 'next/image'
import { Row, Button, Col } from 'react-bootstrap'
import { GrowYourBusinessProps } from 'types/growBusiness'
import BigButton from '@components/common/Button'
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
