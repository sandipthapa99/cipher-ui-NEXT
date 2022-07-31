import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { HowItWorkProps } from "types/howitwork";

import CardBtn from "./CardBtn";
const LongSquareImageCard = ({
    title,
    subtitle,
    description,
    image,
    buttonText,
}: HowItWorkProps) => {
    return (
        <div className="long-square-image-card">
            <Row className="gx-5 card-content">
                <Col md={5}>
                    <figure className="thumbnail-img">
                        <Image
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            alt="man-image"
                            height={"100%"}
                            width={"100%"}
                        />
                    </figure>
                </Col>
                <Col md={7}>
                    <div className="description">
                        <h1>{title}</h1>
                        <h4>{subtitle}</h4>
                        <p>{description}</p>
                    </div>
                    {buttonText && (
                        <CardBtn
                            btnTitle={buttonText}
                            color="#fff"
                            backgroundColor="primary-color"
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};
export default LongSquareImageCard;
