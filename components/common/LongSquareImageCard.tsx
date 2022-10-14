import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import AnchorButton from "./AnchorButton";

export interface CardProps {
    title: string;
    subtitle?: string;
    description: any;
    image: string;
    imageOnRight?: boolean;
    buttonText?: string;

    homeImage?: boolean;
    descTitle?: string;
}
const LongSquareImageCard = ({
    title,
    subtitle,
    description,
    image,
    imageOnRight,
    buttonText,
    homeImage,
    descTitle,
}: CardProps) => {
    // const accessToken = Cookies.get("access");
    const { data: user } = useUser();
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
                                    {descTitle && <p>{descTitle}</p>}
                                    {Array.isArray(description) ? (
                                        <ul>
                                            {description.map(
                                                (info: any, index) => (
                                                    <div
                                                        className="d-flex with-icon align-items-center"
                                                        key={index}
                                                    >
                                                        {info.icon ? (
                                                            <figure className="thumbnail-img">
                                                                <Image
                                                                    src={
                                                                        info.icon
                                                                    }
                                                                    layout="fill"
                                                                    objectFit="contain"
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
                                    <div>
                                        {user ? (
                                            <AnchorButton
                                                className={"px-5"}
                                                href={"/service"}
                                                varient={"secondary"}
                                            >
                                                {"Explore Services"}
                                            </AnchorButton>
                                        ) : (
                                            <AnchorButton
                                                className={"px-5"}
                                                href={"/signup"}
                                                varient={"secondary"}
                                            >
                                                {"Join Us"}
                                            </AnchorButton>
                                        )}
                                    </div>
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
                                    {descTitle && <p>{descTitle}</p>}
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
                                    <div>
                                        {user ? (
                                            <AnchorButton
                                                className={"px-5"}
                                                href={"/service"}
                                                varient={"secondary"}
                                            >
                                                {"Explore Services"}
                                            </AnchorButton>
                                        ) : (
                                            <AnchorButton
                                                className={"px-5"}
                                                href={"/signup"}
                                                varient={"secondary"}
                                            >
                                                {"Join Us"}
                                            </AnchorButton>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col md={homeImage ? 6 : 5}>
                            <figure className="thumbnail-img">
                                {/* <Image
                                    src={image}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="man-image"
                                /> */}
                            </figure>
                        </Col>
                    </>
                )}
            </Row>
        </div>
    );
};
export default LongSquareImageCard;
