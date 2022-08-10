import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import CardBtn from "./CardBtn";

export interface CardProps {
    title: string;
    subtitle?: string;
    description: any;
    image: string;
    imageOnRight?: boolean;
    buttonText?: string;
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
                            <div className="content">
                                <div className="description">
                                    <h1>{title}</h1>
                                    {subtitle && <h4>{subtitle}</h4>}
                                    {Array.isArray(description) ? (
                                        <ul>
                                            {description.map(
                                                (info: any, index) => (
                                                    <div
                                                        className="d-flex"
                                                        key={index}
                                                    >
                                                        {info.icon ? (
                                                            <figure className="thumbnail-img">
                                                                <Image
                                                                    src={
                                                                        info.icon
                                                                    }
                                                                    layout="fill"
                                                                    objectFit="cover"
                                                                    alt="icon-image"
                                                                />
                                                            </figure>
                                                        ) : (
                                                            ""
                                                        )}

                                                        <div
                                                            className="list"
                                                            key={info.id}
                                                        >
                                                            <p>{info.title}</p>
                                                            <li>{info.desc}</li>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p>{description}</p>
                                    )}
                                </div>
                                {buttonText && (
                                    <CardBtn
                                        btnTitle={buttonText}
                                        backgroundColor="#fff"
                                    />
                                )}
                            </div>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col md={homeImage ? 6 : 7}>
                            <div className="content">
                                <div className="description">
                                    <h1>{title}</h1>
                                    {subtitle && <h4>{subtitle}</h4>}
                                    {Array.isArray(description) ? (
                                        <ul>
                                            {description.map(
                                                (info: any, index) => (
                                                    <div
                                                        className="d-flex"
                                                        key={index}
                                                    >
                                                        {info.icon ? (
                                                            <figure className="thumbnail-img">
                                                                <Image
                                                                    src={
                                                                        info.icon
                                                                    }
                                                                    layout="fill"
                                                                    objectFit="cover"
                                                                    alt="icon-image"
                                                                />
                                                            </figure>
                                                        ) : (
                                                            ""
                                                        )}
                                                        <div
                                                            className="list"
                                                            key={info.id}
                                                        >
                                                            <p>{info.title}</p>
                                                            <li>{info.desc}</li>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p>{description}</p>
                                    )}
                                </div>
                                {buttonText && (
                                    <CardBtn
                                        btnTitle={buttonText}
                                        color="#fff"
                                        backgroundColor="primary-color"
                                    />
                                )}
                            </div>
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
