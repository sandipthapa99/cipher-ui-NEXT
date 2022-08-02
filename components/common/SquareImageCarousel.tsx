import BigButton from "@components/common/Button";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import type { squareImageCarousel } from "types/growBusiness";

const SquareImageCarousel = ({
    image,
    description,
    title,
    buttonText,
}: squareImageCarousel) => {
    return (
        <Row className="carousel-card">
            <Col md={6}>
                <div className="grow-business-content">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <BigButton
                        btnTitle={buttonText}
                        backgroundColor="#fff"
                        textColor="#111"
                    />
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
    );
};
export default SquareImageCarousel;
