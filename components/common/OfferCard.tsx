import { faCheck, faCopy } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";

interface OfferCardProps {
    id: number;
    code: string;
    description: string;
    image: string;
    offer_type: string;
    title: string;
}
const OfferCard = ({ offer }: { offer: OfferCardProps }) => {
    const { image, code, description, title } = offer;
    return (
        <div className="offer-card">
            <Row className="d-flex offer-card__content justify-content-center">
                <Col md={3} className="d-flex align-items-center">
                    <figure className="thumbnail-img">
                        <Image
                            src={image}
                            layout="fill"
                            alt="advertisement-image"
                            objectFit="contain"
                        />
                    </figure>
                </Col>
                <Col md={9} className="d-flex">
                    <div className="info">
                        <h3>{title}</h3>
                        <span>{description}</span>
                        <div className="d-flex align-items-center gap-3">
                            <span>{code}</span>
                            <CopyButton value={code} timeout={2000}>
                                {({ copied, copy }) => (
                                    <Tooltip
                                        label={copied ? "Copied" : "Copy"}
                                        withArrow
                                        position="right"
                                    >
                                        <ActionIcon
                                            color={copied ? "teal" : "gray"}
                                            onClick={copy}
                                        >
                                            {copied ? (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faCopy}
                                                />
                                            )}
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default OfferCard;
