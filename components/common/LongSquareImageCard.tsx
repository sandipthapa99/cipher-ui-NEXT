import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { HowItWorkProps } from "types/howitwork";

import CardBtn from "./CardBtn";

export interface CardProps {
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    imageOnRight: boolean;
    buttonText: string;
    homeImage?: boolean;
}
const LongSquareImageCard = ({
    title,
    subtitle,
    description,
    image,
    imageOnRight,
    buttonText,
    homeImage,
}: CardProps) => {
    console.log(homeImage);

    return (
        <div className="long-square-image-card">
            <Row className="gx-5 card-content">
                {imageOnRight ? (
                    <>
                        <Col md={homeImage ? 6 : 5}>
                            <figure className="thumbnail-img">
                                <Image
                                    src={image}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="man-image"
                                />
                            </figure>
                        </Col>
                        <Col md={homeImage ? 6 : 7}>
                            <div className="description">
                                <h1>{title}</h1>
                                {subtitle && <h4>{subtitle}</h4>}
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
                    </>
                ) : (
                    <>
                        <Col md={homeImage ? 6 : 7}>
                            <div className="description">
                                <h1>{title}</h1>
                                {subtitle && <h4>{subtitle}</h4>}
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
                        <Col md={homeImage ? 6 : 5}>
                            <figure className="thumbnail-img">
                                <Image
                                    src={image}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="man-image"
                                />
                            </figure>
                        </Col>
                    </>
                )}
            </Row>
        </div>
    );
};
export default LongSquareImageCard;
